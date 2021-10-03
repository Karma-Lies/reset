<script>
	// Component imports
	import Header from '$lib/components/03. modules/Header.svelte';
	import Newsletter from '$lib/components/03. modules/Newsletter.svelte';
	import Footer from '$lib/components/03. modules/Footer.svelte';

	// Tailwind and that jazz
	import '../app.postcss';
</script>

<div class="relative flex flex-col min-h-screen mx-auto font-general max-w-screen-2xl">
	<Header />
	<main class="flex-1 relative">
		<slot />
	</main>
	<Newsletter />
	<Footer />
</div>

<style global lang="postcss">
	body {
		@apply selection:bg-indigo-600;
	}
	.standard-link {
		@apply border-b-2 border-transparent;
	}
	.standard-link:hover {
		@apply border-purple-700 dark:border-purple-100;
	}
</style>
