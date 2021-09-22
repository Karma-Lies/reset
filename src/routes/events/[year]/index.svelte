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
	// Component imports
	import LabeledSlider from '$lib/components/03. modules/LabeledSlider.svelte';

	// Props
	export let events;

	// Logic
	const currentDate = new Date();
	const upcomingEvents = events.filter((event) => new Date(event.startTime) >= currentDate);
</script>

{#if upcomingEvents.length > 0}
	<LabeledSlider id="upcoming-events" href="/events" {events}>Upcoming Events</LabeledSlider>
{/if}
