<script context="module">
	import { fetchEvents } from '$lib/utils/events.js';
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		return fetchEvents(fetch);
	}
</script>

<script>
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';
	import UpcomingEvents from '$lib/components/03. modules/UpcomingEvents.svelte';
	import CardGrid from '../lib/components/03. modules/CardGrid.svelte';

	// Library imports
	import { getPastEvents } from '$lib/utils/events.js';

	// Props
	export let events;
	const pastEvents = getPastEvents(events);
</script>

<SEO prefixSiteName />

<div id="main-content" />

<UpcomingEvents {events} />
<section id="past-events" class="max-w-screen-lg pt-4 pb-8 mx-auto">
	<CardGrid href="/events" events={pastEvents}>Past Events</CardGrid>
</section>
