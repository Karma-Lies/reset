<script>
	// Component imports
	import ArrowLink from '../01. atoms/ArrowLink.svelte';
	import EventCard from '../02. molecules/EventCard.svelte';

	// Props
	export let href;
	export let events;
	export let compactHeading = false;
</script>

{#if compactHeading}
	<h2
		class="mx-10 md:mx-16 text-3xl uppercase font-medium text-gray-900 dark:text-gray-200 max-w-max"
	>
		{#if href}
			<ArrowLink {href}><slot /></ArrowLink>
		{:else}
			<slot />
		{/if}
	</h2>
{/if}
<div class="mx-1 md:mx-6 flex flex-row justify-center">
	<h2
		class="text-3xl uppercase font-medium py-0.5 text-gray-900 dark:text-gray-200 max-w-max"
		style="writing-mode: vertical-lr;"
	>
		{#if href}
			<ArrowLink vertical {href}><slot /></ArrowLink>
		{:else}
			<slot />
		{/if}
	</h2>
	<ul class="bg-gray-900 rounded-sm">
		{#each events as event}
			<li>
				<EventCard {event} />
			</li>
		{/each}
	</ul>
	<h2
		class="text-3xl uppercase font-medium py-0.5 text-gray-900 dark:text-gray-200 max-w-max -rotate-180 self-start md:self-end"
		class:invisible={compactHeading}
		style="writing-mode: vertical-lr;"
	>
		{#if href}
			<ArrowLink vertical {href}><slot /></ArrowLink>
		{:else}
			<slot />
		{/if}
	</h2>
</div>

<style lang="postcss">
	ul {
		/* display: grid; */
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		@apply md:grid flex flex-col gap-2;
	}
	li {
		@apply m-1;
	}
</style>
