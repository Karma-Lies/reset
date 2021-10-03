<script>
	// Component imports
	import ArrowLink from '../01. atoms/ArrowLink.svelte';
	import EventCard from '../02. molecules/EventCard.svelte';

	// Props
	export let id = null;
	export let href;
	export let events;
</script>

<section {id} class="m-6">
	<h2 class="text-2xl uppercase font-medium py-2 text-gray-900 dark:text-gray-200">
		<ArrowLink {href}><slot /></ArrowLink>
	</h2>
	<ul class="flex flex-row space-x-8">
		{#each events as event}
			<li class="relative max-w-max">
				<EventCard {event} />
			</li>
		{/each}
	</ul>
</section>
