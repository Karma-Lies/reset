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
					events: await res.json(),
					year: page.params.year,
					path: page.path
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
	// Component imports
	import Breadcrumbs from '$lib/components/02. molecules/Breadcrumbs.svelte';
	import GridCard from '$lib/components/03. modules/CardGrid.svelte';

	// Props
	export let events;
	export let year;
	export let path;

	// Logic
	const currentDate = new Date();
	const upcomingEvents = events.filter((event) => new Date(event.startTime) >= currentDate);
</script>

<Breadcrumbs {path} />
{#if upcomingEvents.length > 0}
	<section id="upcoming-events" class="max-w-screen-lg mx-auto p-4">
		<GridCard {events}>Upcoming Events</GridCard>
	</section>
{/if}
<section id="events" class="max-w-screen-lg mx-auto p-4">
	<GridCard {events}>{year} Events</GridCard>
</section>
