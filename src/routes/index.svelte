<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const url = '/api/events.json?stats=true';
		const res = await fetch(url);

		if (res.ok) {
			const { events } = await res.json();
			return {
				props: {
					events
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	import TriangleRight from '$svg/TriangleRight.svelte';

	export let events;
</script>

<section id="upcoming-events" class="m-6">
	<h2 class="text-2xl py-2 text-gray-200">
		<a sveltekit:prefetch href="/events"> Upcoming Events <TriangleRight /></a>
	</h2>

	<ul class="flex flex-row space-x-8">
		{#each events as event}
			<li class="relative max-w-max">
				<a sveltekit:prefetch href="/events/{event.year}/{event.slug}">
					<div
						class="absolute transform top-2 left-2 bg-gradient-to-br from-purple-800 to-pink-700 w-full h-full pointer-events-none z-0"
					/>
					<img
						src={event.flyer.url}
						alt="{event.title} flyer"
						class="max-h-[50vh] object-fit relative w-full z-10"
					/>
					<h3 class="sr-only">{event.title}</h3></a
				>
			</li>
		{/each}
	</ul>
</section>
