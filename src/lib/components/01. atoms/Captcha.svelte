<script>
	import axios from 'axios';
	import { createEventDispatcher } from 'svelte';

	// Props
	export let numOptions = 4;
	// Animal taxonomy
	const animalOptions = [
		{
			type: 'cat',
			plural: 'cats',
			obscurification: 'certified_mowmow'
		},
		{
			type: 'fox',
			plural: 'foxes',
			obscurification: 'cat_dog'
		}
	];
	let animalToPick = animalOptions[Math.round(Math.random())];
	$: pluralAnimalToPick = animalToPick.plural;

	// API fetching
	const challengeFetch = Promise.all(randomizePromises(numOptions));

	function randomAPICall() {
		return Math.random() < 0.5 ? fetchKitty() : fetchFox();
	}

	function randomizePromises(numOptions) {
		let promises = [];

		for (let i = 0; i < numOptions; i++) {
			promises.push(randomAPICall());
		}

		return promises;
	}

	async function fetchKitty() {
		const endpoint = 'https://aws.random.cat/meow';
		const type = 'certified_mowmow';
		try {
			const catPic = await axios.get(endpoint);
			return {
				status: catPic.status,
				type: type,
				src: catPic.data.file
			};
		} catch (err) {
			console.error('Oh no the Kitty API for bot-filtering is inaccessible!');
			return {
				status: 500,
				type: type,
				src: undefined
			};
		}
	}

	async function fetchFox() {
		const endpoint = 'https://randomfox.ca/floof/';
		const type = 'cat_dog';
		try {
			const catPic = await axios.get(endpoint);
			return {
				status: catPic.status,
				type: type,
				src: catPic.data.image
			};
		} catch (err) {
			console.error('Oh no the Fox API for bot-filtering is inaccessible!');
			return {
				status: 500,
				type: type,
				src: undefined
			};
		}
	}

	// User selection verification
	let userSelection = [];
	const dispatch = createEventDispatcher();

	/**
	 * Checks if every element in one array forms a strict identity set of another array, order doesn't matter
	 * @param {Array} firstArray
	 * @param {Array} secondArray
	 * @returns {boolean} contents match
	 * */
	function matchArrayContents(firstArray, secondArray) {
		return (
			secondArray.every((item) => firstArray.includes(item)) &&
			firstArray.every((item) => secondArray.includes(item))
		);
	}

	async function verifyAnswer() {
		const challengeSet = await challengeFetch;
		const correctChoices = challengeSet.filter(
			(animal) => animal.type === animalToPick.obscurification
		);

		const isUserCorrect = matchArrayContents(correctChoices, userSelection);
		dispatch('verified', isUserCorrect);
		return isUserCorrect;
	}
</script>

<form
	on:submit|preventDefault|stopPropagation={verifyAnswer}
	class="flex flex-col p-1 bg-gray-900 rounded place-items-center max-w-max"
>
	<h3 class="text-lg font-medium text-center">Pick all of the {pluralAnimalToPick}</h3>
	<small class="mb-1 opacity-70">(this is to prevent bots)</small>
	<div class="flex flex-wrap justify-center">
		{#await challengeFetch}
			{#each new Array(numOptions) as _}
				<div class="bg-gray-800 card animate-pulse" />
			{/each}
		{:then challengeSet}
			{#each challengeSet as animal, index ((index, animal.src))}
				<label style="background-image: url({animal.src});" class="text-transparent bg-cover card">
					<input
						type="checkbox"
						name={animal.type}
						value={animal}
						bind:group={userSelection}
						class="w-5 h-5 m-1 border-gray-900 checked:bg-indigo-600 checked:border-transparent"
					/>
					{animal.type}
				</label>
			{/each}
		{/await}
	</div>
	<button
		type="submit"
		class="px-6 py-1.5 my-1 text-sm font-medium rounded-sm text-black bg-white hover:bg-gray-700 hover:text-white transition-colors"
		>Done</button
	>
</form>

<style lang="postcss">
	.card {
		@apply w-32 h-32 m-1 rounded-sm select-none lg:w-40 lg:h-40;
	}
</style>
