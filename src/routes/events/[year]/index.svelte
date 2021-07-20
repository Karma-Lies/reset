<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const url = `/api/events/${page.params.year}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					events: await res.json()
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
	<h2 class="text-2xl">Upcoming Events -></h2>

	<ul>
		{#each events as event}
			<li>
				<a href="/events/{event.year}/{event.slug}">
					<img src={event.flyer.url} alt="{event.title} flyer" class="max-h-[80vh] object-fit" />
					<h3 class="sr-only">{event.title}</h3></a
				>
			</li>
		{/each}
	</ul>
</section>
