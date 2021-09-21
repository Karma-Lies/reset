<script>
	// Component imports
	import Header from '$lib/components/03. modules/Header.svelte';
	import Footer from '$lib/components/03. modules/Footer.svelte';

	// Tailwind and that jazz
	import '../app.postcss';
</script>

<div class="flex flex-col min-h-screen font-mono relative max-w-screen-2xl mx-auto">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>

<style global lang="postcss">
	html {
		@apply bg-black text-white;
	}
	.standard-link {
		@apply border-b-2 border-transparent;
	}
	.standard-link:hover {
		@apply border-purple-100;
	}
</style>
