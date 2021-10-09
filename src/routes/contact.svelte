<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page }) {
		return {
			props: {
				path: page.path
			}
		};
	}
</script>

<script>
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';
	import Breadcrumbs from '$lib/components/02. molecules/Breadcrumbs.svelte';
	import Button from '$lib/components/01. atoms/Button.svelte';
	import Captcha from '$lib/components/01. atoms/Captcha.svelte';
	import Modal from '$lib/components/02. molecules/Modal.svelte';

	// Library imports
	import axios from 'axios';

	// Props
	export let path;

	// Form input values
	let name, email, details;

	// CTA button state management
	let buttonState = 'default';
	const buttonStates = {
		error: '🚭 uh oh!',
		success: '🧑‍🌾 Success!',
		default: '🧙‍♀️ Send it'
	};
	const setButtonState = (state) => (buttonState = state);

	// Schema for serverless function POST response
	let sendMailResponse = {
		status: 200,
		message: undefined
	};

	/**
	 * POST request to email data via serverless function
	 * @param event
	 */
	async function sendMail(name, email, details) {
		try {
			// Call serverless function to submit contact form via email
			const response = await axios.post(`/.netlify/functions/send-mail`, {
				name: name.value,
				email: email.value,
				details: details.value
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
		({ name, email, details } = event.target);
		verifyUser();
	}

	// Bot repellent
	let showCaptcha,
		userVerified = false;
	const startChallenge = () => (showCaptcha = true);
	const endChallenge = (value) => {
		console.log(value);
		userVerified = value.detail;

		if (userVerified) {
			showCaptcha = false;
			sendMail(name, email, details);
		}
	};

	function verifyUser() {
		userVerified ? sendMail(name, email, details) : startChallenge();
	}
</script>

<SEO title="Contact" url="contact" />

<div class="mt-4">
	<Breadcrumbs {path} />
</div>

<section
	id="contact"
	class="grid grid-flow-row p-8 pt-4 space-y-4 lg:space-y-0 lg:space-x-4 lg:grid-cols-2"
>
	<section class="relative flex" id="visual">
		<div>
			<img
				src="/photos/Deej-n-Jake.jpg"
				alt="Deej n Jake at one of our afterparties"
				class="object-cover rounded-sm lg:h-full"
				width="1368"
				height="912"
			/>
		</div>
	</section>
	<section>
		<h1 class="text-4xl md:text-6xl place-self-end font-heading">
			<ul class="uppercase">
				<li class="text-indigo-500">Show ideas.</li>
				<li class="text-indigo-600">Venue space.</li>
				<li class="text-indigo-700">Cool projects.</li>
				<li class="text-white">Get in touch.</li>
			</ul>
		</h1>
		<form class="flex flex-col py-4 space-y-2" on:submit|preventDefault={submitForm}>
			<div>
				<label for="name">Your name</label>
				<input
					name="name"
					id="name"
					type="name"
					autocomplete="name"
					placeholder="Name"
					maxlength="320"
					spellcheck="off"
					required
				/>
			</div>

			<div>
				<label for="email">Your email</label>
				<input
					name="email"
					id="email"
					type="email"
					autocomplete="email"
					placeholder="Email address"
					maxlength="320"
					spellcheck="off"
					required
				/>
			</div>
			<div>
				<label for="details">Details</label>
				<textarea
					name="details"
					id="details"
					cols="65"
					rows="5"
					minlength="1"
					maxlength="1000"
					placeholder="Details"
					required
				/>
			</div>
			<div>
				<div class="-mt-1.5">
					<Button state={buttonState} potentialStates={buttonStates} type="submit" size="lg" />
				</div>
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
		</form>
	</section>
</section>
{#if showCaptcha}
	<Modal on:close={() => (showCaptcha = false)}>
		<Captcha on:verified={endChallenge} />
	</Modal>
{/if}

<style lang="postcss">
	#visual::after {
		content: '';
		background: repeating-linear-gradient(
			-45deg,
			#4f46e5,
			#4f46e5 12px,
			transparent 12px,
			transparent 24px
		);
		@apply absolute -top-4 lg:top-auto -right-4 lg:right-auto lg:-bottom-4 lg:-left-4 w-28 h-28 md:w-48 md:h-48;
	}

	li {
		@apply max-w-max;
	}
	label {
		@apply sr-only;
	}
	input,
	textarea {
		@apply bg-gray-800;
		@apply focus:border-white border-2 border-transparent rounded focus:border-opacity-20 drop-shadow-sm w-full placeholder-gray-500 p-2 focus:outline-none transition-colors text-gray-300 font-medium placeholder-shown:font-normal;
	}
</style>
