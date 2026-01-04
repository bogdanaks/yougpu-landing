<script lang="ts">
	import Tags from '$shared/ui/tags.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import PostCoverImage from './post-cover-image.svelte';
	import type { BlogPost } from '../model/types';

	export let post: BlogPost;
</script>

<a
	href="/blog/{post.slug}"
	class="group flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-brand-500/40 hover:bg-slate-900 transition-all hover:shadow-lg"
>
	<div class="aspect-video w-full">
		<PostCoverImage src={post.image} alt={post.title} className="h-full w-full" />
	</div>

	<div class="p-6 flex flex-col grow">
		<div class="flex justify-between items-center text-xs mb-4">
			<span class="text-slate-500">{post.lastUpdated || post.date}</span>
			<Tags tags={post.tags} limit={2} />
		</div>

		<h3 class="text-xl font-bold mb-3 group-hover:text-brand-400 transition line-clamp-2">
			{post.title}
		</h3>

		<p class="text-slate-400 text-sm mb-6 grow line-clamp-3">{post.description}</p>

		<div
			class="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500"
		>
			<span>{post.readTime} мин чтения</span>
			<ArrowRight class="w-4 h-4 group-hover:text-brand-400 group-hover:translate-x-1 transition" />
		</div>
	</div>
</a>
