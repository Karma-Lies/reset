<script context="module">
	export const hydrate = false;

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const url = '/api/events.json?stats=true';
		const res = await fetch(url);

		if (res.ok) {
			const { stats, events } = await res.json();
			return {
				props: {
					stats,
					events,
					path: page.path
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	// Component imports
	import SEO from '$lib/components/01. atoms/SEO.svelte';
	import Breadcrumbs from '$lib/components/02. molecules/Breadcrumbs.svelte';

	// Props
	export let stats;
	export let path;
</script>

<SEO
	title="Explore Our Events"
	description="Underground shows in Chicago dedicated to putting on under-appreciated talent."
	url="events"
/>

<div class="my-2">
	<Breadcrumbs {path} />
</div>

<section id="main-content">
	<div
		id="dope-gradient"
		class="before:right-0 before:left-0 before:top-0 before:h-full relative before:absolute before:from-crisp-dark before:via-transparent before:bg-gradient-to-b z-0"
	>
		<img
			src="/photos/Fraxiom.jpeg"
			alt="Fraxiom in 2020"
			width="1095"
			height="1095"
			lazyload
			class="w-5/6 lg:w-1/2 h-full min-h-[16rem] object-cover object-bottom pr-2"
		/>
		<p id="cta" class="z-10 opacity-80">select a year</p>
	</div>

	<header>
		<h2>Events<br /> by<br /> year</h2>
	</header>

	<ul>
		{#each stats as metadata}
			<li class="group">
				<a href="/events/{metadata.year}">
					<h3>
						{metadata.year}<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="w-16 inline fill-current"
							><path fill="none" d="M0 0h24v24H0z" /><path
								d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
							/></svg
						>
					</h3>
					<span
						class="opacity-0 group-hover:opacity-100 text-sm absolute tracking-widest right-4 bottom-4 md:bottom-8 px-1 rounded-sm shadow-lg bg-indigo-700"
						>explore {metadata.eventCount} {metadata.eventCount > 1 ? 'shows' : 'show'}</span
					></a
				>
			</li>
		{/each}
	</ul>
	<div id="radials" />
</section>

<style lang="postcss">
	section {
		@apply grid grid-cols-2 pt-4;
	}
	#dope-gradient {
		@apply flex justify-between col-start-1 col-end-3 w-full max-h-80 md:max-h-full pointer-events-none;
		@apply bg-gradient-to-t from-indigo-700;
	}
	#cta {
		@apply text-lg tracking-wider my-2 md:my-4 border-l-2 text-gray-300;
		writing-mode: vertical-rl;
	}
	#radials {
		@apply col-start-3 col-end-7 w-full h-full pointer-events-none;
		background: repeating-radial-gradient(
			circle,
			rgb(67, 56, 202),
			rgb(67, 56, 202) 4px,
			transparent 4px,
			transparent 32px
		);
	}
	header {
		@apply col-start-1 col-end-3;
	}
	h2 {
		@apply text-7xl md:text-9xl uppercase relative line-through font-heading my-2;
		line-height: 0.8;
	}
	ul {
		@apply col-start-3 col-end-7 row-start-1 row-span-full place-self-start;
		@apply text-7xl md:text-9xl font-heading  rounded-sm;
	}
	li {
		@apply relative mx-auto;
		@apply hover:text-yellow-400 transition-colors bg-transparent rounded-sm px-2;
		@apply even:text-indigo-600 hover:even:text-yellow-400;
	}
</style>
