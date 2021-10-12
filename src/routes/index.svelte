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
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';
	import CardGrid from '../lib/components/03. modules/CardGrid.svelte';

	// Props
	export let events;
</script>

<SEO prefixSiteName />

<div id="main-content" />

<section id="upcoming-events" class="max-w-screen-lg mx-auto pt-4 pb-8">
	<CardGrid href="/events?upcoming" {events}>Upcoming Events</CardGrid>
</section>
