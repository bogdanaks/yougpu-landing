<script>
	import Footer from '$widgets/ui/footer.svelte';
	import Header from '$widgets/ui/header.svelte';
</script>

<div class="min-h-screen bg-slate-950 flex flex-col">
	<Header />
	<main class="flex-1"><slot /></main>
	<Footer />
</div>
