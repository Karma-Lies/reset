<script>
	// Props
	export let href;
	export let isBack = false;
	export let vertical = false;
</script>

<a sveltekit:prefetch {href} class="group">
	{#if isBack}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="transparent"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class={vertical ? 'upwards' : 'backwards'}><path d="M6 18L18 6" /><path d="M6 8v10h10" /></svg
		>
		<slot />
	{:else}
		<slot />
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="transparent"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class={vertical ? 'downwards' : 'forwards'}
			><path d="M18 18L6 6" /><path d="M8 18h10V8" /></svg
		>
	{/if}
</a>

<style lang="postcss">
	a {
		@apply opacity-100 hover:opacity-90 transition-opacity duration-200;
	}
	svg {
		@apply inline w-6 h-6 -ml-1 transition-all duration-200 group-hover:fill-current translate-x-0;
	}
	.forwards {
		@apply group-hover:translate-x-1;
	}
	.backwards {
		@apply group-hover:-translate-x-1;
	}
	.upwards {
		@apply group-hover:-translate-y-1;
	}
	.downwards {
		@apply group-hover:translate-y-1;
	}
</style>
