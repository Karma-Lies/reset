<script>
	// Component imports
	import Button from '$lib/components/01. atoms/Button.svelte';
	// Library imports
	import axios from 'axios';
	import { createEventDispatcher } from 'svelte';

	// Props
	export let numOptions = 4;

	// --- Animal taxonomy --- //
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

	// --- API fetching --- //
	const challengeFetch = () => Promise.all(randomizePromises(numOptions));
	let challenge = challengeFetch();

	/**
	 * Pseudo-randomly calls an API and returns a promise
	 */
	function randomAPICall() {
		return Math.random() < 0.5 ? fetchKitty() : fetchFox();
	}

	/**
	 * Returns an array of specific length containing random API fetch promises
	 * @param numElements length of array
	 */
	function randomizePromises(numElements) {
		let promises = [];

		for (let i = 0; i < numElements; i++) {
			promises.push(randomAPICall());
		}

		return promises;
	}

	/**
	 * Return current time in milliseconds
	 */
	function timestamp() {
		return new Date().getTime();
	}

	/**
	 * Fetch a random cat image
	 */
	async function fetchKitty() {
		const endpoint = 'https://aws.random.cat/meow?cachebuster=' + timestamp();
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

	/**
	 * Fetch a random fox image
	 */
	async function fetchFox() {
		const endpoint = 'https://randomfox.ca/floof/?cachebuster=' + timestamp();
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

	// --- State --- //
	let state = 'default';
	let feedbackStates = {
		error: 'Incorrect answer, try again!',
		success: "Correct, you're verified!",
		default: '(this is to prevent bots)'
	};
	$: feedbackMessage = feedbackStates[state];
	let buttonStates = {
		error: 'Try again',
		success: 'Verified!',
		default: 'Done'
	};

	// --- User selection verification --- //
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

	/**
	 * Compares user selection to the set of correct choices, verifies response if the two contain the same elements
	 * @returns {boolean} isUserCorrect
	 */
	async function verifyAnswer() {
		const challengeSet = await challenge;

		const correctChoices = challengeSet.filter(
			(animal) => animal.type === animalToPick.obscurification
		);

		const isUserCorrect = matchArrayContents(correctChoices, userSelection);

		if (isUserCorrect) {
			state = 'success';
		} else {
			state = 'error';
			refreshChallenge();
		}

		return setTimeout(() => dispatch('verified', isUserCorrect), 500);
	}

	/**
	 * Present a new challenge and clear user input
	 */
	function refreshChallenge() {
		userSelection = [];
		challenge = challengeFetch();
		// Reset the state after 3 seconds so the user knows they can submit another response
		setTimeout(() => (state = 'default'), 3000);
	}
</script>

<form
	on:submit|preventDefault|stopPropagation={verifyAnswer}
	class="flex flex-col p-1 bg-gray-900 rounded place-items-center max-w-max"
>
	<h3 class="text-lg font-medium text-center">Pick all of the {pluralAnimalToPick}</h3>
	<small
		class="mb-1 opacity-70"
		class:text-red-500={state === 'error'}
		class:text-indigo-400={state === 'success'}>{feedbackMessage}</small
	>
	<div class="flex flex-wrap justify-center">
		{#await challenge}
			{#each new Array(numOptions) as _, index (index)}
				<div class="bg-gray-800 card animate-pulse" />
			{/each}
		{:then challengeSet}
			{#each challengeSet as animal, index (`${animal.src}-${index}`)}
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
	<div class="my-1">
		<Button {state} potentialStates={buttonStates} type="submit" size="sm" />
	</div>
</form>

<style lang="postcss">
	.card {
		@apply w-28 h-28 m-1 rounded-sm select-none lg:w-40 lg:h-40;
	}
</style>
