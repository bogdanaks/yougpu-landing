<script>
	import ContactHero from './ui/contact-hero.svelte';
	import ContactMethods from './ui/contact-methods.svelte';
	import FaqSection from './ui/faq-section.svelte';
</script>

<div aria-hidden="true" class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
	<div
		class="absolute left-1/2 top-0 h-160 w-160 -translate-x-1/2 -translate-y-1/2 bg-brand-600/10 blur-[120px] opacity-40"
	></div>
</div>
<section class="relative z-10 py-20">
	<div class="container mx-auto px-4 md:px-6">
		<ContactHero />
		<ContactMethods />
		<FaqSection />
	</div>
</section>
