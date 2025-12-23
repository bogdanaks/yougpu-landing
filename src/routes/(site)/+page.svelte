<script lang="ts">
	import IndexPage from '$pages/index/index.page.svelte';
	import Seo from '$widgets/ui/seo.svelte';

	let props = $props();
</script>

<Seo />
<IndexPage {...props} />
