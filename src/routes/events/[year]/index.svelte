<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const url = `/api/events/${page.params.year}.json?order=DESC`;
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
	import SEO from '$lib/components/01. atoms/SEO.svelte';
	import Breadcrumbs from '$lib/components/02. molecules/Breadcrumbs.svelte';
	import GridCard from '$lib/components/03. modules/CardGrid.svelte';
	import UpcomingEvents from '$lib/components/03. modules/UpcomingEvents.svelte';

	// Library imports
	import { getPastEvents, sortEventsByDate } from '$lib/utils/events';

	// Props
	export let events;
	export let year;
	export let path;
	const pastEvents = sortEventsByDate(getPastEvents(events));
</script>

<SEO
	title="{year} Events"
	description="Underground shows in Chicago dedicated to putting on under-appreciated talent."
	url="events/{year}"
/>

<div class="my-2">
	<Breadcrumbs {path} />
</div>

<div id="main-content" />

<UpcomingEvents {events} />
<section id="events" class="max-w-screen-lg py-4 mx-auto mb-4">
	<GridCard events={pastEvents}>{year} Events</GridCard>
</section>
