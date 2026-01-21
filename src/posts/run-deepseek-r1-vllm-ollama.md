---
slug: deepseek-r1-server-guide
title: "Запуск DeepSeek-R1: Гайд по Ollama, vLLM и железу"
description: "Как поднять DeepSeek-R1 на арендованном сервере. Считаем VRAM, сравниваем Ollama с vLLM и решаем ошибки CUDA OOM."
date: "2026-01-21"
tags: ["DeepSeek", "LLM", "DevOps", "vLLM", "Ollama", "Tutorial"]
tldr:
  - "Для комфортной работы версии 32B нужна карта с 24 ГБ VRAM (RTX 3090/4090)."
  - "Ollama подходит для локальных тестов, а vLLM обеспечивает скорость для продакшена."
  - "Готовые Docker-конфиги для запуска API и веб-интерфейса Open WebUI."
published: true
---

<script>
  import PostCTA from '$entities/blog/ui/post-cta.svelte';
</script>

Китайская лаборатория DeepSeek снова перевернула стол. Пока OpenAI прячет свои "мыслительные цепочки" (Chain-of-Thought) за API модели o1, DeepSeek выложила R1 с открытыми весами. Она умеет рассуждать, проверять себя и выдавать пугающе качественный код.

Но есть нюанс.

Чтобы запустить "полновесную" модель на 671 миллиард параметров, вам понадобится кластер, сравнимый с бюджетом небольшой страны. К счастью, они выпустили дистиллированные версии (Distilled) на базе Llama и Qwen, которые вполне реально завести на одной-двух видеокартах.

В этой инструкции мы поднимем DeepSeek-R1 на арендованном сервере с Ubuntu 22.04. Разберем два пути: простой (Ollama) и профессиональный (vLLM).

> **Disclaimer:** Я не буду рассказывать, "как космические корабли бороздят просторы". Только практика. Команды проверены на серверах [yougpu.ru](https://console.yougpu.ru) с картами RTX 4090 и A6000.

---

## Часть 1. Математика железа: сколько VRAM вам нужно?

Первое правило клуба LLM: **Все упирается в видеопамять.**

Если вы попытаетесь загрузить модель, которая на 1 ГБ больше вашей VRAM, вы получите либо `CUDA Out of Memory`, либо падение скорости до 1 токена в секунду (потому что начнется offloading в медленную RAM).

Вот реальные цифры для дистиллированных версий DeepSeek-R1. Я привожу данные для квантования 4-bit (GGUF/AWQ), так как FP16 для моделей 32B+ на одной карте — это утопия.

| Модель (Distill)                  | Параметры | VRAM (4-bit / Q4) | Рекомендуемый GPU                               |
| :-------------------------------- | :-------- | :---------------- | :---------------------------------------------- |
| **DeepSeek-R1-Distill-Llama-8B**  | 8B        | ~5.5 GB           | Любая карта от 8GB (даже RTX 3060)              |
| **DeepSeek-R1-Distill-Qwen-32B**  | 32B       | ~20-22 GB         | **RTX 3090 / 4090 (24GB)**                      |
| **DeepSeek-R1-Distill-Llama-70B** | 70B       | ~40-42 GB         | **RTX A6000 / A40 (48GB)** или 2x RTX 3090/4090 |

**Вывод:**

- **8B** запустится даже на чайнике.
- **32B** — это "золотая середина". Она чертовски умная, но требует ровно 24 ГБ. На домашней игровой карте вы, скорее всего, упретесь в потолок, если у вас запущен рабочий стол и браузер. На [сервере без GUI](https://console.yougpu.ru) вся память отдается модели.
- **70B** — уже требует профессионального железа или NVLink.

---

## Часть 2. Подготовка сервера (Base Setup)

Предполагаем, что вы только что получили доступ к чистому серверу Ubuntu 22.04. Сразу ставим базу.

### 1. Драйверы и Docker

Не тратьте время на ручную установку драйверов через `.run` файлы. Используйте репозитории.

```bash
# Обновляемся
sudo apt update && sudo apt upgrade -y

# Ставим полезные утилиты (если нет)
sudo apt install -y curl git htop nvtop

# Если драйверы еще не стоят (проверьте через nvidia-smi)
# sudo apt install -y ubuntu-drivers-common
# sudo ubuntu-drivers autoinstall
```

### 2. NVIDIA Container Toolkit

Это критически важно. Без этого Docker не увидит вашу видеокарту.

```bash
# Добавляем репозиторий
curl -fsSL [https://nvidia.github.io/libnvidia-container/gpgkey](https://nvidia.github.io/libnvidia-container/gpgkey) | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L [https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list](https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list) | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# Устанавливаем и настраиваем
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

> **Проверка:** Запустите `docker run --rm --gpus all ubuntu nvidia-smi`. Если увидели таблицу с видеокартой — вы готовы.

---

## Часть 3. Способ №1: Путь Самурая (Ollama)

Если вам нужно "просто запустить и пообщаться" за 5 минут — это ваш выбор. Ollama сама скачает GGUF-квантованную версию и поднимет API.

### Установка

```bash
curl -fsSL [https://ollama.com/install.sh](https://ollama.com/install.sh) | sh
```

### Запуск DeepSeek-R1

Ollama автоматически подбирает квантование под вашу память. Для 32B модели на карте 24GB (например, на нашем [RTX 4090 тарифе](https://console.yougpu.ru)) она скачает 4-битный вариант.

```bash
# Запуск сервера в фоне
ollama serve &

# Запуск модели (скачивание произойдет автоматически при первом запуске)
# Варианты тегов: deepseek-r1:8b, deepseek-r1:32b, deepseek-r1:70b
ollama run deepseek-r1:32b
```

В консоли откроется чат. Попробуйте задать сложную логическую задачу. Вы увидите, как модель сначала выводит блок `<think>`, где расписывает свои рассуждения, а потом дает ответ.

**Как использовать в коде:**
Ollama поднимает локальный API на порту 11434.

```python
import requests
import json

response = requests.post('http://localhost:11434/api/generate', json={
  "model": "deepseek-r1:32b",
  "prompt": "Напиши скрипт на Python для парсинга цен с сайта.",
  "stream": False
})

print(response.json()['response'])
```

---

## Часть 4. Способ №2: Путь Инженера (vLLM)

Ollama — это удобно, но vLLM — это **быстро**. vLLM (Virtual Large Language Model) — это стандарт де-факто для высоконагруженного продакшена. Она использует PagedAttention для эффективного управления памятью и выдает гораздо больше токенов в секунду (TPS).

Если вы планируете строить сервис на базе DeepSeek, забудьте про Ollama. Используйте vLLM.

### Запуск через Docker

Мы будем использовать официальный образ. Важно указать аргументы для квантования, если вы не влезаете в FP16.

> **Note:** Для модели Qwen-32B лучше всего работает квантование AWQ или GPTQ. Но мы пойдем хардкорным путем и попробуем загрузить веса, используя `bitsandbytes` для 4-битной загрузки на лету, если нативная поддержка модели позволяет, либо возьмем готовую AWQ версию с HuggingFace.

Лучший вариант для RTX 4090 — использовать готовую AWQ модель. Она быстрее и стабильнее.

```bash
# Создаем папку для кэша моделей, чтобы не качать каждый раз заново
mkdir -p $HOME/.cache/huggingface

# Запускаем контейнер
docker run --runtime nvidia --gpus all \
    -v $HOME/.cache/huggingface:/root/.cache/huggingface \
    -p 8000:8000 \
    --ipc=host \
    vllm/vllm-openai:latest \
    --model solidrust/DeepSeek-R1-Distill-Qwen-32B-AWQ \
    --quantization awq \
    --dtype float16 \
    --max-model-len 8192 \
    --gpu-memory-utilization 0.95
```

**Разбор флагов:**

- `--model solidrust/DeepSeek-R1-Distill-Qwen-32B-AWQ`: Мы берем AWQ версию (оптимизированную), так как оригинал в FP16 весит ~64 ГБ.
- `--ipc=host`: Обязательно для коммуникации GPU.
- `--gpu-memory-utilization 0.95`: Разрешаем занять 95% памяти видеокарты.

Теперь у вас есть **полностью совместимый с OpenAI API** на порту 8000. Вы можете подключить к нему любой клиент, просто поменяв `base_url`.

---

## Часть 5. Делаем красиво: Open WebUI

Сидеть в `curl` — удовольствие для избранных. Давайте поднимем интерфейс, как в ChatGPT, который будет смотреть на наш локальный API.

Создайте файл `docker-compose.yml`:

```yaml
version: "3.8"

services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "3000:8080"
    environment:
      # Если используете vLLM:
      - OPENAI_API_BASE_URL=[http://host.docker.internal:8000/v1](http://host.docker.internal:8000/v1)
      - OPENAI_API_KEY=sk-dummy-key
      # Если используете Ollama (раскомментировать):
      # - OLLAMA_BASE_URL=[http://host.docker.internal:11434](http://host.docker.internal:11434)
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - open-webui:/app/backend/data
    restart: always

volumes:
  open-webui:
```

Запускаем:

```bash
docker compose up -d
```

Переходим в браузере по адресу `http://<IP-вашего-сервера>:3000`, создаем аккаунт (он сохраняется локально) и выбираем модель.

---

## Troubleshooting: Когда всё пошло не так

Даже на надежных серверах бывает всякое. Вот топ проблем, с которыми вы столкнетесь.

### 1. `CUDA error: out of memory`

Классика.

- **Решение А:** Уменьшите контекст. Если вы запускали vLLM с дефолтным контекстом (32k или больше), обрежьте его флагом `--max-model-len 4096` или `8192`.
- **Решение Б:** Проверьте, не висит ли другой процесс. `nvtop` вам в помощь. Если `ollama serve` заняла память, vLLM не запустится. Убейте лишнее.
- **Решение В:** Если вы на 32B модели и 24GB карте — убедитесь, что используете квантование (AWQ/GPTQ/GGUF). FP16 не влезет физически.

### 2. Ошибка драйвера (Error 803 / System has fallen off the bus)

Если `nvidia-smi` выдает ошибку, скорее всего, драйвер "отвалился" после обновления ядра или перегрева.

- **Решение:** `sudo reboot`. Серьезно. На арендованных серверах это самый быстрый фикс. Если не помогло — переустановка драйверов (см. Часть 2).

### 3. Модель "тупит" и думает бесконечно

DeepSeek-R1 отличается тем, что генерирует токены "мышления" (`<think>`). Иногда этот процесс затягивается.

- **Решение:** В параметрах генерации (в WebUI или API) поставьте лимит токенов (max_tokens) побольше. Если модели оборвать "мысль" на полуслове, полезного ответа вы не получите.

---

## Итог

Запуск DeepSeek-R1 локально — это мощный опыт. Вы получаете приватную, нецензурируемую модель уровня GPT-4o (в задачах кодинга и логики), которая работает только на вас.

- Для быстрых тестов и пет-проектов: **Ollama**.
- Для продакшена и интеграций: **vLLM + AWQ модели**.

Главное препятствие — это VRAM. Покупать RTX 4090 ради тестов — дорого. Проще [арендовать сервер на yougpu.ru](https://console.yougpu.ru), поиграться пару часов, настроить все конфиги и выключить, заплатив копейки.

<PostCTA
  title="Не хватает VRAM для DeepSeek-R1?"
  description="Запустите 70B модель без лагов на серверах с RTX A6000 (48 GB)"
  btnText="Запустить DeepSeek-R1"
/>
