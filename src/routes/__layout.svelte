<script>
	// Component imports
	import Header from '$lib/components/general/Header.svelte';
	import Footer from '$lib/components/general/Footer.svelte';

	// Tailwind and that jazz
	import '../app.postcss';
</script>

<div class="bg-black flex flex-col text-white min-h-screen font-mono">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
