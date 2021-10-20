<script>
	// Component imports
	import CardGrid from '$lib/components/03. modules/CardGrid.svelte';

	// Library imports
	import { getUpcomingEvents, sortEventsByDate } from '$lib/utils/events.js';

	// Props
	export let events;

	// Logic
	const upcomingEvents = sortEventsByDate(getUpcomingEvents(events), false);
</script>

{#if upcomingEvents.length > 0}
	<section id="upcoming-events" class="max-w-screen-lg mx-auto">
		<CardGrid events={upcomingEvents}>
			{#if upcomingEvents.length > 1}
				Upcoming Events
			{:else}
				Upcoming Event
			{/if}
		</CardGrid>
	</section>
{/if}
