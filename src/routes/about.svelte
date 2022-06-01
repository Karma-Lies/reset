<script context="module">
	import { gql, GraphQLClient } from 'graphql-request';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
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
	import Breadcrumbs from '$lib/components/02. molecules/Breadcrumbs.svelte';
</script>

<SEO title="About" url="about" />

<div class="mt-4">
	<Breadcrumbs path="/What is this?" />
</div>

<section
	id="main-content"
	class="grid grid-flow-row p-4 text-gray-100 lg:p-8 lg:pt-4 lg:grid-cols-2 min-h-[40rem]"
>
	<section class="relative flex" id="visual">
		<div>
			<img
				src="/photos/Willy Crooks.jpg"
				alt="William Crooks goin hard at our HXRY aftershow back in 2020"
				class="object-cover h-full rounded-sm lg:rounded-r-none"
				width="1368"
				height="912"
			/>
		</div>
		<div id="radials" class="w-full h-full m-2" />
	</section>
	<section
		class="relative flex flex-col justify-center py-8 border-0 border-gray-800 rounded-sm lg:px-8 lg:border-2 border-opacity-40 "
	>
		<a href="https://soundcloud.com/reset_presents/foret" target="_blank">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="absolute w-16 p-2 border-2 border-indigo-400 rounded-sm bg-gradient-to-br from-indigo-600 to-indigo-800 via-indigo-600 border-opacity-40 bg-blend-difference -top-8 lg:-top-4 right-2 lg:right-2 backdrop-blur-sm hover:text-indigo-900 motion-safe:transition-all rotate-2 hover:rotate-0 hover:scale-90"
				><path fill="none" d="M0 0h24v24H0z" /><path
					d="M12 13.535V3h8v2h-6v12a4 4 0 1 1-2-3.465zM10 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
				/></svg
			>
		</a>
		<div role="doc-subtitle" class="font-semibold text-indigo-400">Plain and simple</div>
		<h1 class="text-5xl md:text-6xl xl:text-7xl font-heading">
			No gimmicks,<br /> just music.
		</h1>
		<span class="ml-auto w-5/6 h-0.5 rounded-sm bg-gradient-to-r from-indigo-500 my-2 md:my-4" />
		<p>
			Reset Presents is a fresh music event project in Chicago aiming to debut rising musical
			artists across genres in the Windy City and put on under-appreciated local talent.
		</p>
	</section>
</section>

<style lang="postcss">
	p {
		@apply max-w-prose text-gray-300;
	}

	#radials {
		@apply pointer-events-none;
		background: repeating-radial-gradient(
			circle,
			rgb(67, 56, 202),
			rgb(67, 56, 202) 4px,
			transparent 4px,
			transparent 28px
		);
	}
</style>
