<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	export async function load({ params, url, fetch }: LoadEvent) {
		const apiURL = `/api/events/${params.year}.json?order=DESC`;
		const res = await fetch(apiURL);

		if (res.ok) {
			return {
				props: {
					events: await res.json(),
					year: params.year,
					path: url.pathname
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';
	import Breadcrumbs from '$lib/components/02. molecules/Breadcrumbs.svelte';
	import GridCard from '$lib/components/03. modules/CardGrid.svelte';
	import UpcomingEvents from '$lib/components/03. modules/UpcomingEvents.svelte';

	// Library imports
	import { getPastEvents, sortEventsByDate } from '$lib/utils/events';

	// Props
	export let events;
	export let year: string;
	export let path: string;

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
