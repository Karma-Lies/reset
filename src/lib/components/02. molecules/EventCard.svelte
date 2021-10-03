<script>
	// Props
	export let event;
</script>

<div class="card">
	<a sveltekit:prefetch href="/events/{event.year}/{event.slug}">
		<img width={1500} height={1875} src={event.flyer.url} alt="{event.title} flyer" />
		<h3 class="sr-only">{event.title}</h3></a
	>
</div>

<style lang="postcss">
	.card {
		@apply w-full h-full;
		@apply border-white border-2 translate-y-0 transition-transform;
		@apply hover:-translate-y-2 hover:rotate-1;
	}

	img {
		@apply h-full object-cover z-10 w-full;
	}
</style>
