<script>
	// Component imports
	import Close from '$lib/assets/svg/Close.svelte';

	// Library imports
	import { createEventDispatcher } from 'svelte';

	// Props
	export let ariaLabel;

	const dispatch = createEventDispatcher();
	const closeModal = () => dispatch('close');
</script>

<svelte:window on:keyup={(e) => e.key === 'Escape' && closeModal()} />

<div
	class="fixed inset-0 w-full flex flex-col h-screen overscroll-none overflow-hidden z-40 p-4 group"
>
	<div
		on:click={closeModal}
		class="absolute inset-0 bg-crisp-dark bg-opacity-30 h-full z-40 duration-500 backdrop-hue-rotate-0 group-hover:-backdrop-hue-rotate-90 cursor-pointer transition-all"
		aria-hidden="true"
		role="presentation"
	/>
	<div
		class="absolute m-auto inset-4 max-w-md max-h-[32rem] overflow-scroll bg-gray-800 border-2 border-gray-400 border-opacity-20 rounded z-50 drop-shadow-2xl"
		style="height: max-content;"
		role="dialog"
		aria-modal="true"
		aria-label={ariaLabel}
	>
		<button
			class="absolute right-2 top-2 w-4 h-4 text-gray-400 hover:text-gray-200 select-none transition-colors cursor-pointer"
			on:click={closeModal}
			type="button"
			aria-label="close dialog"
		>
			<Close />
		</button>
		<slot
			><div class="w-full h-full flex">
				<p class="m-auto font-semibold">Place content here</p>
			</div></slot
		>
	</div>
</div>
