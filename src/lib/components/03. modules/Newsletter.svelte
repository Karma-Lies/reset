<script>
	import PopupLabel from './../01. atoms/PopupLabel.svelte';
	// Component imports
	import Button from '$lib/components/01. atoms/Button.svelte';
	import Modal from '$lib/components/02. molecules/Modal.svelte';
	import Captcha from '$lib/components/03. modules/Captcha.svelte';

	// Library imports
	import axios from 'axios';

	// Form input values
	let email;

	// CTA button state management
	let buttonState = 'default';
	const buttonStates = {
		error: '🚭 uh oh!',
		success: '🚸 Signed up!',
		default: 'Notify me'
	};
	const setButtonState = (state) => (buttonState = state);

	// Schema for serverless function POST response
	let sendMailResponse = {
		status: 200,
		message: undefined
	};

	/**
	 * POST request to subscribe to newsletters via serverless function
	 * @param {string} email
	 */
	async function signup(email) {
		try {
			// Call serverless function to submit contact form via email
			const response = await axios.post(`/.netlify/functions/newsletter-signup`, {
				email: email.value
			});

			// Get the status code and message from the response
			sendMailResponse = {
				status: response.status,
				message: response.data.message
			};

			// Flip the submit button to a success state
			setButtonState('success');
		} catch (error) {
			// Get the error status code and message from the response
			sendMailResponse = {
				status: error.response.status,
				message: error.response.data.message || error.toJSON().message
			};

			// Flip the submit button to an error state
			setButtonState('error');
			// Reset the button after 3 seconds so the user can try again
			setTimeout(() => setButtonState('default'), 3000);
		}
	}

	function submitForm(event) {
		// Destructure form fields
		({ email } = event.target);
		verifyUser();
	}

	// Bot repellent
	let showCaptcha,
		userVerified = false;
	const startChallenge = () => (showCaptcha = true);
	const endChallenge = (value) => {
		userVerified = value.detail;

		if (userVerified) {
			showCaptcha = false;
			signup(email);
		}
	};

	function verifyUser() {
		userVerified ? signup(email) : startChallenge();
	}
</script>

<section
	id="newsletter-signup"
	class="relative grid py-16 bg-gray-900 lg:grid-cols-2 xl:py-24 bg-opacity-20"
>
	<div class="p-6 m-auto transform-gpu">
		<h2 class="text-5xl text-gray-100 md:text-7xl font-heading">
			Be the first to know about our shows
		</h2>
	</div>
	<div class="w-full p-6 m-auto space-y-4 font-sans lg:px-8 md:w-4/6 lg:w-full xl:w-3/4">
		<form
			class="relative group"
			on:submit|preventDefault={submitForm}
			aria-haspopup="dialog"
			aria-label="Sign up for our newsletter"
		>
			<PopupLabel target="newsletter-email">Email address</PopupLabel>
			<div
				class="flex flex-row justify-between m-auto bg-gray-800 p-1.5 group focus-within:border-white border-2 border-transparent rounded transition-colors focus-within:border-opacity-20 drop-shadow-sm"
			>
				<input
					name="email"
					id="newsletter-email"
					type="email"
					required
					placeholder="Please enter your email address"
					class="inline-block w-full px-3 py-2 text-lg font-medium text-gray-300 placeholder-gray-500 transition-colors bg-transparent focus:outline-none placeholder-shown:font-normal"
				/>

				<Button state={buttonState} potentialStates={buttonStates} type="submit" size="md" />
			</div>
		</form>
		<div>
			{#if sendMailResponse.message && sendMailResponse.status === 200}
				<span class="font-mono text-indigo-500">
					{sendMailResponse.message}
				</span>
			{:else if sendMailResponse.message}
				<span class="font-mono text-red-500">
					{sendMailResponse.message}
				</span>
			{/if}
		</div>
	</div>
</section>
{#if showCaptcha}
	<Modal on:close={() => (showCaptcha = false)}>
		<Captcha on:verified={endChallenge} />
	</Modal>
{/if}

<style lang="postcss">
	section::before {
		content: '';
		@apply h-2 w-full bg-gradient-to-r from-purple-400 via-red-500 to-yellow-400 drop-shadow-xl max-w-full 2xl:rounded-sm absolute z-10;
	}
</style>
