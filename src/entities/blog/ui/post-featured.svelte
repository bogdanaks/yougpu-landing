<script lang="ts">
	import Tags from '$shared/ui/tags.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import type { BlogPost } from '../model/types';
	import PostCoverImage from './post-cover-image.svelte';
	import PostMeta from './post-meta.svelte';

	export let post: BlogPost;
</script>

{#if post}
	<div class="mb-16">
		<h3
			class="text-sm font-bold text-brand-400 uppercase tracking-wider mb-4 flex items-center gap-2"
		>
			<span class="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
			Самое свежее
		</h3>

		<a
			href="/blog/{post.slug}"
			class="group relative block rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40 hover:border-brand-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/10"
		>
			<div class="grid md:grid-cols-2 gap-8 items-stretch">
				<PostCoverImage
					src={post.image}
					alt={post.title}
					className="h-64 md:h-full w-full md:min-h-100"
				/>

				<div class="p-8 md:p-12 flex flex-col justify-center">
					<div class="flex gap-2 mb-4">
						<Tags tags={post.tags} />
					</div>
					<PostMeta {post} showAuthor={true} />
					<h2
						class="text-3xl md:text-4xl font-bold mt-4 mb-4 group-hover:text-brand-400 transition"
					>
						{post.title}
					</h2>

					<p class="text-slate-400 text-lg mb-8 line-clamp-3">
						{post.description}
					</p>

					<div
						class="flex items-center text-brand-400 font-semibold group-hover:translate-x-2 transition-transform"
					>
						Читать <ArrowRight class="ml-2 w-5 h-5" />
					</div>
				</div>
			</div>
		</a>
	</div>
{/if}
