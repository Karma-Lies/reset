<script>
	export let state = 'default';
	export let potentialStates = {
		error: '🚭 uh oh!',
		success: '🧑‍🌾 Success!',
		default: '🧙‍♀️ Click it'
	};
	export let type = undefined;
	export let size = 'md';

	// Reactive button text based on current button state
	$: buttonInnerText = potentialStates[state];
</script>

<button
	{type}
	on:click
	class="float-right w-full text-black transition-all bg-gray-100 rounded-sm max-w-max hover:bg-gray-700 hover:text-white drop-shadow-sm disabled:hover:bg-indigo-500 disabled:hover:text-black disabled:cursor-not-allowed"
	class:large={size === 'lg'}
	class:medium={size === 'md'}
	class:small={size === 'sm'}
	class:bg-indigo-500={state === 'success'}
	class:bg-red-100={state === 'error'}
	disabled={state === 'success'}
>
	{buttonInnerText}
</button>

<style lang="postcss">
	.large {
		@apply font-semibold text-lg;
		@apply px-6 py-2;
	}

	.medium {
		@apply font-semibold text-base;
		@apply px-3;
	}
	.small {
		@apply font-medium text-sm;
		@apply px-6 py-2;
	}
</style>
