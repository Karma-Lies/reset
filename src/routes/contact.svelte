<script>
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';
	import axios from 'axios';

	let response = null;

	async function sendShit() {
		try {
			const res = await axios.post(`/.netlify/functions/send-mail`, {
				name: 'Test User',
				email: 'no-reply@gmail.com',
				details:
					'Testing out sending emails from the contact page via client side Axios request to SendGrid netlify function'
			});

			response = res;
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<SEO title="Contact" url="contact" />
<section id="contact" class="m-12 p-4">
	<h1 class="text-4xl">
		Show idea?<br />Lookin' for venue space?<br />Got cool shit to share? <br />Get in touch.
	</h1>
	<main>
		<p>
			sauce it on over to <a
				href="mailto:{import.meta.env.VITE_CONTACT_EMAIL}"
				class="standard-link text-indigo-400">{import.meta.env.VITE_CONTACT_EMAIL}</a
			>
		</p>
		<button on:click={sendShit}>Send!</button>
	</main>
</section>
