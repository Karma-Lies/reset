<script>
	// Props
	export let href;
</script>

<a sveltekit:prefetch {href} class="group">
	<slot />
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="transparent"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="inline w-6 h-6 -ml-1 transition-all group-hover:fill-current translate-x-0 group-hover:translate-x-1"
		><path d="M17 12L9 6v12l8-6z" /></svg
	>
</a>
