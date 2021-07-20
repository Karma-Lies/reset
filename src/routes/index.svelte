<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const url = `/api/events.json?stats=true`;
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
	export let events;
</script>

<section id="upcoming-events" class="m-6">
	<h2 class="text-2xl py-2 text-gray-200">Upcoming Events -></h2>

	<ul>
		{#each events as event}
			<li>
				<a href="/events/{event.year}/{event.slug}">
					<img src={event.flyer.url} alt="{event.title} flyer" class="max-h-[70vh] object-fit" />
					<h3 class="sr-only">{event.title}</h3></a
				>
			</li>
		{/each}
	</ul>
</section>
