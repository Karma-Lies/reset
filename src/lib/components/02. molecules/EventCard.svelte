<script>
	export let event;
</script>

<a sveltekit:prefetch href="/events/{event.year}/{event.slug}" class="group">
	<div
		class="absolute transition-transform transform translate-y-0 translate-x-0 top-0 left-0 group-hover:translate-x-1 group-hover:translate-y-1 rotate-0 group-hover:rotate-2 bg-gradient-to-t from-purple-400 to-pink-500 w-full h-full pointer-events-none z-0"
	/>
	<img
		src={event.flyer.url}
		alt="{event.title} flyer"
		class="max-h-[50vh] min-h-[33vh] object-fit relative w-full z-10 border-2 border-white"
	/>
	<h3 class="sr-only">{event.title}</h3></a
>
