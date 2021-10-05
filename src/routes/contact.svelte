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
	import axios from 'axios';

	// Props
	export let path;

	// CTA button state management
	let buttonState = 'default';
	const buttonStates = {
		error: '🚭 uh oh!',
		success: '🧑‍🌾 Success!',
		default: '🧙‍♀️ Send it'
	};
	const setButtonState = (state) => (buttonState = state);
	// Reactive button text based on current button state
	$: buttonInnerText = buttonStates[buttonState];

	// Schema for serverless function POST response
	let sendMailResponse = {
		status: 200,
		message: undefined
	};

	/**
	 * POST request to email data via serverless function
	 * @param event
	 */
	async function sendMail(event) {
		// Destructure form fields
		const { name, email, details } = event.target;

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
				message: error.response.data.message
			};

			// Flip the submit button to an error state
			setButtonState('error');
			// Reset the button after 3 seconds so the user can try again
			setTimeout(() => setButtonState('default'), 3000);
		}
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
		<form class="flex flex-col py-4 space-y-2" on:submit|preventDefault={sendMail}>
			<div>
				<label for="name">Your name</label>
				<input
					name="name"
					id="name"
					type="name"
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
				<button
					type="submit"
					class="float-right w-full px-6 py-2 -mt-1.5 font-semibold text-black transition-all bg-gray-100 rounded-sm max-w-max hover:bg-gray-700 text-lg hover:text-white drop-shadow-sm disabled:hover:bg-indigo-500 disabled:hover:text-black disabled:cursor-not-allowed"
					class:bg-indigo-500={buttonState === 'success'}
					class:bg-red-100={buttonState === 'error'}
					disabled={buttonState === 'success'}
				>
					{buttonInnerText}
				</button>
				{#if sendMailResponse.message && sendMailResponse.status === 200}
					<pre>
						<code class="text-indigo-500">
							{sendMailResponse.message}
						</code>
					</pre>
				{:else if sendMailResponse.message}
					<pre>
						<code class="text-red-500">
							{sendMailResponse.message}
						</code>
					</pre>
				{/if}
			</div>
		</form>
	</section>
</section>

<style lang="postcss">
	#visual::after {
		content: '';
		background: repeating-linear-gradient(-45deg, transparent 0 24px, rgba(79, 70, 229) 24px 32px);
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
