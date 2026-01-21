---
slug: "llama-3-ollama-docker-guide"
title: "Llama 3 на своем сервере: Гайд по Ollama + Docker"
description: "Забудьте про платные API. Пошаговый гайд: поднимаем Llama 3 в связке Ollama + Open WebUI на своем железе за 10 минут."
date: "2026-01-21"
tags: ["Llama 3", "Docker", "Ollama", "Self-hosted", "Guide", "GPU"]
tldr:
  - "Честная математика VRAM: сколько памяти реально нужно для 8B и 70B моделей."
  - "Готовый docker-compose: поднимаем бэкенд и красивый WebUI одной командой."
  - "Решение главной проблемы: как правильно пробросить GPU через NVIDIA Container Toolkit."
published: true
---

<script>
  import PostCTA from '$entities/blog/ui/post-cta.svelte';
</script>

# Llama 3 на своем сервере: Инструкция по запуску через Ollama и Docker

Хватит кормить облачные API своими данными и платить за каждый токен. Если вы хотите реальной приватности и полного контроля над LLM, единственный путь — **Self-hosted**.

Сегодня мы поднимем **Llama 3** (Meta) в связке с **Ollama** (бэкенд) и **Open WebUI** (фронтенд) внутри Docker. Это "золотой стандарт" локального инференса: быстро, изолированно и воспроизводимо.

Никакой магии, только терминал, конфиги и GPU.

---

## 1. Математика железа: Хватит ли VRAM?

Прежде чем пушить контейнеры, давайте посчитаем. Llama 3 — модель прожорливая, но гибкая благодаря квантованию (Quantization). Если вы попытаетесь загрузить 70B модель в fp16 на игровой карте — получите OOM (Out of Memory) быстрее, чем успеете моргнуть.

Вот реальные требования для комфортного инференса (с небольшим запасом на контекст):

| Модель          | Квантование  | Размер весов | Мин. VRAM | Рекомендуемое GPU          |
| :-------------- | :----------- | :----------- | :-------- | :------------------------- |
| **Llama 3 8B**  | q4_0 (4-bit) | ~4.7 GB      | 6 GB      | RTX 3060 / 4060            |
| **Llama 3 8B**  | fp16 (Half)  | ~16 GB       | 20 GB     | RTX 3090 / 4090            |
| **Llama 3 70B** | q4_0 (4-bit) | ~40 GB       | 48 GB     | 2x RTX 3090 / 1x RTX A6000 |
| **Llama 3 70B** | fp16 (Half)  | ~140 GB      | 160 GB+   | Кластер A100 / H100        |

> **Note:** Для домашнего использования стандарта де-факто является **4-битное квантование (q4_0)**. Потери "ума" минимальны, а требования к железу падают в 3-4 раза.

Если ваш локальный ноутбук начинает шуметь как вертолет при попытке запустить даже 8B модель, или вам нужна мощь 70B для сложных RAG-систем — просто возьмите выделенный сервер.
На [yougpu.ru](https://console.yougpu.ru) можно арендовать машину с RTX 4090 или A6000 по цене чашки кофе, развернуть там этот стек и использовать как свой личный API.

---

## 2. Подготовка хоста: NVIDIA Container Toolkit

Самая частая ошибка новичков: поставить Docker и думать, что он сам увидит видеокарту. **Спойлер: не увидит.** Контейнеры изолированы, и им нужно явно пробросить драйверы.

Предполагаем, что у вас Ubuntu/Debian и драйверы Nvidia уже стоят (`nvidia-smi` показывает таблицу).

### Шаг 2.1. Установка Docker (если нет)

```bash
curl -fsSL [https://get.docker.com](https://get.docker.com) -o get-docker.sh
sudo sh get-docker.sh
```

### Шаг 2.2. Установка NVIDIA Container Toolkit (ОБЯЗАТЕЛЬНО)

Без этого шага Ollama будет работать на CPU. Это больно и медленно.

```bash
# Добавляем репозиторий
curl -fsSL [https://nvidia.github.io/libnvidia-container/gpgkey](https://nvidia.github.io/libnvidia-container/gpgkey) | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L [https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list](https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list) | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# Ставим тулкит
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit

# Настраиваем Docker демона
sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl restart docker
```

---

## 3. Деплой стека (Docker Compose)

Мы не будем запускать сервисы руками. Мы напишем **docker-compose.yml**, который поднимет всё сразу: и бэкенд (Ollama), и красивый интерфейс (Open WebUI).

Создайте папку `llm-stack` и файл внутри:

```yaml
version: "3.8"

services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    # КРИТИЧНО: Проброс GPU внутрь контейнера
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    volumes:
      - ./ollama_data:/root/.ollama
    ports:
      - "11434:11434"
    restart: always

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    volumes:
      - ./webui_data:/app/backend/data
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama
    restart: always
```

Запускаем демона:

```bash
docker compose up -d
```

---

## 4. Загрузка модели и Тесты

Контейнеры запущены, но "мозгов" (весов модели) внутри еще нет. Ollama по умолчанию пустая.

### Шаг 4.1. Тянем Llama 3

Выполняем команду **внутри** контейнера ollama:

```bash
docker exec -it ollama ollama pull llama3
```

_Скачается версия 8B (около 4.7 ГБ)._

### Шаг 4.2. Проверка через CLI

Попробуем поговорить с ней прямо из консоли, чтобы убедиться, что инференс идет на GPU:

```bash
docker exec -it ollama ollama run llama3 "Write a hello world python code"
```

В этот момент откройте соседнее окно терминала и запустите `watch -n 0.5 nvidia-smi`. Если вы видите скачок потребления памяти и нагрузки на GPU — поздравляю, вы всё сделали правильно.

### Шаг 4.3. Проверка API (curl)

Ollama поднимает API совместимый с OpenAI. Это значит, вы можете использовать этот адрес в своих Python-скриптах.

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3",
  "prompt": "Why sky is blue?",
  "stream": false
}'
```

---

## 5. Web-интерфейс: Ваш личный ChatGPT

Теперь переходим в браузер: `http://localhost:3000`.

Вас встретит **Open WebUI**.

1. При первом входе вас попросят создать аккаунт (все данные хранятся локально в папке `webui_data`, которую мы создали в docker-compose).
2. Сверху выберите модель `llama3:latest`.
3. Наслаждайтесь.

В интерфейсе можно загружать документы (RAG), настраивать системные промпты и даже подключать генерацию картинок (Stable Diffusion), если у вас есть свободная VRAM.

> **Совет:** Если вы планируете работать с тяжелыми документами или длинным контекстом, 8B модели может не хватить "интеллекта". Для серьезных задач лучше взять сервер с 24GB+ VRAM. Посмотрите конфигурации на [yougpu.ru](https://console.yougpu.ru) — там есть готовые образы для ML.

---

## 6. Troubleshooting (Если всё сломалось)

**Проблема 1: `could not select device driver` при запуске docker compose.**

- **Причина:** Не установлен или криво встал NVIDIA Container Toolkit.
- **Решение:** Вернитесь к пункту 2.2. Убедитесь, что сделали `sudo nvidia-ctk runtime configure --runtime=docker` и перезагрузили докер.

**Проблема 2: Ollama работает, но медленно (токены ползут как улитки).**

- **Причина:** Docker не использует GPU, инференс идет на CPU.
- **Диагностика:** Посмотрите логи контейнера: `docker logs ollama`. Если там нет строк про Nvidia GPU detected — вы на CPU.
- **Решение:** Проверьте секцию `deploy` в `docker-compose.yml`.

**Проблема 3: Ошибка OOM (Out of memory).**

- **Решение:** Либо вы взяли слишком "жирную" модель (70B на карте 8GB), либо у вас запущен Chrome с 500 вкладками. Убейте лишние процессы или [арендуйте сервер](https://console.yougpu.ru) с большим объемом памяти.

---

## Итог

У вас теперь есть полностью автономный AI-ассистент. Он не "стучит" на серверы корпораций, работает без интернета (после скачивания весов) и не стоит ни копейки за генерацию текста.

**Что дальше?**

1. Попробуйте **Llama 3 70B** — разница в качестве колоссальная, но нужно железо уровня 2x3090 или A6000.
2. Настройте доступ из интернета через Nginx Proxy Manager + Basic Auth, чтобы пользоваться своей LLM с телефона.

_Happy deploying!_

<PostCTA
  title="Не хватает VRAM для Llama 3 70B?"
  description="Локальная карта выдает OOM? Арендуйте сервер с RTX A6000 (48GB) или 2x3090. Идеально для запуска Docker-контейнеров с тяжелыми LLM."
  btnText="Выбрать сервер под LLM"
/>
