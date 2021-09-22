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
	import LabeledSlider from './../lib/components/03. modules/LabeledSlider.svelte';

	// Props
	export let events;
</script>

<LabeledSlider id="upcoming-events" href="/events" {events}>Upcoming Events</LabeledSlider>
