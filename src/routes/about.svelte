<script context="module">
	import { gql, GraphQLClient } from 'graphql-request';

	export async function load() {
		const graphcms = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL, {
			headers: {}
		});

		const query = gql`
			query About {
				page(where: { slug: "about" }) {
					title
					body {
						html
					}
				}
			}
		`;

		let { page } = await graphcms.request(query);

		return {
			props: {
				page
			}
		};
	}
</script>

<script>
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';

	// Props
	export let page;
</script>

<SEO title="About" url="about" />
<section id="about" class="m-12 p-4">
	<h1 class="text-4xl">{page.title}</h1>
	<main class="max-w-prose">
		{@html page.body.html}
	</main>
</section>
