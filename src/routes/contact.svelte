<script>
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';

	const email = 'resetpresents@gmail.com';
</script>

<SEO title="Contact" url="contact" />
<section id="contact" class="m-12 p-4">
	<h1 class="text-4xl">Contact</h1>
	<main>
		<p>
			sauce it on over to <a href="mailto:{email}" class="standard-link text-indigo-400">{email}</a>
		</p>
	</main>
</section>
