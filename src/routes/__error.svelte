<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script>
	// Props
	export let error, status;
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<section id="main-content" class="grid place-content-center h-[32rem]">
	<h1 class="text-9xl font-heading text-gray-100 text-center">{status}</h1>
	<p class="text-center border-2 p-2 border-white rounded-sm font-mono text-gray-100 text-lg">
		{error.message}
	</p>
</section>
