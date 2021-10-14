<script>
	// Component imports
	import GridCard from '$lib/components/03. modules/CardGrid.svelte';

	// Library imports
	import { getUpcomingEvents } from '$lib/utils/events.js';

	// Props
	export let events;

	// Logic
	const upcomingEvents = getUpcomingEvents(events);
</script>

{#if upcomingEvents.length > 0}
	<section id="upcoming-events" class="max-w-screen-lg mx-auto">
		<GridCard events={upcomingEvents}>
			{#if upcomingEvents.length > 1}
				Upcoming Events
			{:else}
				Upcoming Event
			{/if}
		</GridCard>
	</section>
{/if}
