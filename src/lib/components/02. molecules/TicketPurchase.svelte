<script>
	import { browser } from '$app/env';
	import { createEventDispatcher } from 'svelte';

	// Props
	export let eventID;
	export let url;

	// Data
	const dispatch = createEventDispatcher();
	const scriptSrc = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
	let noErrors = true;

	function handleLoad() {
		init();
	}

	function handleError(event) {
		console.error('something went wrong', event);
		noErrors = false;
	}

	// Initialize eventbrite widget
	function init() {
		window.EBWidgets.createWidget({
			widgetType: 'checkout',
			eventId: eventID,
			modal: true,
			modalTriggerElementId: `eventbrite-trigger-${eventID}`,
			onOrderComplete: onPurchase
		});
	}

	function onPurchase() {
		console.log('Order complete!');
		dispatch('purchasedTicket');
	}
</script>

<svelte:head>
	{#if eventID && browser}
		<script
			id="eventbrite-checkout"
			src={scriptSrc}
			on:load={handleLoad}
			on:error={handleError}
			async></script>
	{/if}
</svelte:head>

{#if eventID && noErrors}
	<button
		aria-haspopup="dialog"
		name="tickets"
		class="ticket-purchase"
		id="eventbrite-trigger-{eventID}"
	>
		<span class="align-middle"><slot /></span>
		<svg
			role="presentation"
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="inline w-4 py-1 align-middle opacity-30"
			><path
				d="M13.544 10.456a4.368 4.368 0 0 0-6.176 0l-3.089 3.088a4.367 4.367 0 1 0 6.177 6.177L12 18.177"
			/><path
				d="M10.456 13.544a4.368 4.368 0 0 0 6.176 0l3.089-3.088a4.367 4.367 0 1 0-6.177-6.177L12 5.823"
			/></svg
		></button
	>
	<noscript>
		<a target="_blank" href={url}>Click here if the above button doesn't work</a>
	</noscript>
{:else}
	<a target="_blank" name="tickets" class="ticket-purchase" href={url}>
		<span class="align-middle"><slot /></span>
		<svg
			role="presentation"
			aria-hidden="true"
			focusable="false"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="inline w-4 py-1 align-middle opacity-30"
			><path
				d="M13.544 10.456a4.368 4.368 0 0 0-6.176 0l-3.089 3.088a4.367 4.367 0 1 0 6.177 6.177L12 18.177"
			/><path
				d="M10.456 13.544a4.368 4.368 0 0 0 6.176 0l3.089-3.088a4.367 4.367 0 1 0-6.177-6.177L12 5.823"
			/></svg
		></a
	>
{/if}

<style lang="postcss">
	.ticket-purchase {
		@apply max-w-max px-3 py-2 font-semibold motion-safe:transition-all rounded-sm bg-gray-100 hover:bg-gray-700 hover:text-white w-full text-black drop-shadow-sm;
	}
</style>
