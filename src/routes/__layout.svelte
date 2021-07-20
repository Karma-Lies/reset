<script>
	// Component imports
	import Header from '$lib/components/general/Header.svelte';

	// Tailwind and that jazz
	import '../app.postcss';
</script>

<div class="bg-black text-white min-h-screen font-mono">
	<Header />
	<slot />
</div>
<section class="bg-black min-h-screen flex align-middle">
	<!-- <iframe
		title="Join the Reset Discord"
		src="https://e.widgetbot.io/channels/614710925714391040/614847723920818176"
		loading="lazy"
		class="w-[80vw] md:w-[90vw] h-[80vh] m-auto transition-all ease-in-out duration-300 ring-2 ring-offset-0 hover:ring-offset-4 ring-offset-black ring-transparent hover:ring-purple-400 hover:ring-opacity-40 rounded-md bg-[#36393F]"
	/> -->
</section>
