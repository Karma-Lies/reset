<script>
	import Close from '$lib/assets/svg/Close.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const closeModal = () => dispatch('close');
</script>

<div
	class="fixed inset-0 w-full flex flex-col h-screen overscroll-none overflow-hidden z-40 p-4 group"
>
	<div
		on:click={closeModal}
		class="absolute inset-0 bg-crisp-dark bg-opacity-30 h-full z-40 duration-500 backdrop-hue-rotate-0 group-hover:-backdrop-hue-rotate-90 cursor-pointer transition-all"
	/>
	<div
		class="absolute m-auto inset-4 max-w-md max-h-[32rem] overflow-scroll bg-gray-800 border-2 border-gray-400 border-opacity-20 rounded z-50 drop-shadow-2xl"
		style="height: fit-content;"
	>
		<slot
			><div class="w-full h-full flex">
				<p class="m-auto font-semibold">Place content here</p>
			</div></slot
		>
		<div
			class="absolute right-2 top-2 w-4 h-4 text-gray-400 hover:text-gray-200 select-none transition-colors cursor-pointer"
			on:click={closeModal}
		>
			<Close />
		</div>
	</div>
</div>
