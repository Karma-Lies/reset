<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const url = '/api/events.json?stats=true&order=DESC';
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
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';
	import UpcomingEvents from '$lib/components/03. modules/UpcomingEvents.svelte';
	import CardGrid from '../lib/components/03. modules/CardGrid.svelte';

	// Props
	export let events;
</script>

<SEO prefixSiteName />

<div id="main-content" />

<UpcomingEvents {events} />
<section id="upcoming-events" class="max-w-screen-lg pt-4 pb-8 mx-auto">
	<CardGrid href="/events" {events}>All Events</CardGrid>
</section>
