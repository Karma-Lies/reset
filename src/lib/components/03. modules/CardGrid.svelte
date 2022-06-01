<script>
	// Component imports
	import ArrowContainer from '../01. atoms/ArrowContainer.svelte';
	import EventCard from '../02. molecules/EventCard.svelte';

	// Props
	export let href;
	export let events;
	export let compactHeading = false;
	export let strictlyLazy = false;
</script>

{#if compactHeading}
	<h2
		class="mx-10 text-3xl font-medium text-gray-900 uppercase md:mx-16 dark:text-gray-200 max-w-max"
	>
		{#if href}
			<ArrowContainer {href}><slot /></ArrowContainer>
		{:else}
			<slot />
		{/if}
	</h2>
{/if}
<div class="flex flex-row justify-center mx-1 md:mx-6">
	<h2
		class="text-3xl uppercase font-medium py-0.5 text-gray-900 dark:text-gray-200 max-w-max"
		style="writing-mode: vertical-lr;"
	>
		{#if href}
			<ArrowContainer vertical {href}><slot /></ArrowContainer>
		{:else}
			<slot />
		{/if}
	</h2>
	<ul class="rounded-sm">
		{#each events as event, index (event.id)}
			<li>
				<EventCard {event} {index} {strictlyLazy} />
			</li>
		{/each}
	</ul>
	<h2
		class="text-3xl uppercase font-medium py-0.5 text-gray-900 dark:text-gray-200 max-w-max -rotate-180 self-start md:self-end"
		class:invisible={compactHeading}
		style="writing-mode: vertical-lr;"
	>
		{#if href}
			<ArrowContainer vertical {href}><slot /></ArrowContainer>
		{:else}
			<slot />
		{/if}
	</h2>
</div>

<style lang="postcss">
	:root {
		--gridElementSize: 1fr;
	}

	@media screen(md) {
		:root {
			--gridElementSize: 310px;
		}
	}
	ul {
		/* display: grid; */
		grid-template-columns: repeat(auto-fit, minmax(var(--gridElementSize), 1fr));
		@apply grid gap-2;
	}
	li {
		@apply m-1;
	}
</style>
