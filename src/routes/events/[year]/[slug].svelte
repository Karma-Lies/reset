<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const url = `/api/events/${page.params.year}/${page.params.slug}.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					event: await res.json(),
					year: page.params.year,
					slug: page.params.slug,
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
	import ArtistList from '$lib/components/02. molecules/ArtistList.svelte';
	import VimeoVideo from '$lib/components/01. atoms/VimeoVideo.svelte';

	// Props
	export let event;
	export let year;
	export let slug;
	export let path;

	const currentTime = new Date();
	const eventStartTime = new Date(event.startTime);
	const eventEndTime = new Date(event.endTime ?? 0);
	const eventTimeAnchor = Math.max(eventStartTime, eventEndTime);
	const startTimeString = eventStartTime.toLocaleString('en-US', {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
	const ticketButtonCTA = eventTimeAnchor >= currentTime ? 'Get Tickets' : 'Sold Out';
</script>

<SEO
	title="{event.title} {year}"
	description={event.description.text}
	url="events/{year}/{slug}"
	image={{ src: event.flyer.url, alt: `${event.title} flyer` }}
/>

<div class="mt-4">
	<Breadcrumbs {path} />
</div>
<article class="grid content-start justify-center p-4 mb-4 text-lg lg:grid-cols-2 lg:gap-4">
	<section class="p-2 lg:w-5/6 xl:w-3/4 justify-self-end">
		<div id="flyer">
			<a href={event.ticketPurchaseUrl}>
				<img src={event.flyer.url} alt="{event.title} flyer" class="rounded-sm" />
			</a>
		</div>
	</section>
	<section class="p-2 space-y-4 md:space-y-2 grout">
		<div
			class="flex flex-col flex-wrap items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2"
		>
			<h1
				name="title"
				class="text-6xl text-center font-heading md:mr-4 lg:text-left"
				style="margin-top: calc((1 - 1.25) * 0.5em);"
			>
				{event.title}
			</h1>
			<a target="_blank" name="tickets" class="ticket-purchase" href={event.ticketPurchaseUrl}
				><span class="align-middle ">{ticketButtonCTA}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="inline w-4 py-1 align-middle opacity-30"
					><path
						d="M13.544 10.456a4.368 4.368 0 0 0-6.176 0l-3.089 3.088a4.367 4.367 0 1 0 6.177 6.177L12 18.177"
					/><path
						d="M10.456 13.544a4.368 4.368 0 0 0 6.176 0l3.089-3.088a4.367 4.367 0 1 0-6.177-6.177L12 5.823"
					/></svg
				></a
			>
		</div>
		<h2 class="sr-only">Details</h2>
		<ul>
			<li>
				<h3>Start Time</h3>
				<p id="start-time">{startTimeString}</p>
			</li>
			<li>
				<h3>Address</h3>
				<p id="address">{event.address}</p>
			</li>
			{#if event.artists}
				<li>
					<h3>Artists</h3>
					<ArtistList artists={event.artists} />
				</li>
			{/if}
			{#if event.description}
				<li class="space-y-1.5">
					<h3>Notes</h3>
					<div id="notes" class="space-y-3 text-sm max-w-prose">
						{@html event.description.html}
					</div>
				</li>
			{/if}
			{#if event.recap?.videoURL}
				<li class="space-y-2">
					<h3>Recap</h3>
					<div id="recap" class="max-w-prose">
						<VimeoVideo src={event.recap.videoURL} color={event.accentColor.hex} />
					</div>
				</li>
			{/if}
		</ul>
	</section>
</article>

<style lang="postcss">
	h3 {
		@apply text-gray-700 max-w-max tracking-wide font-semibold text-sm;
	}
	.ticket-purchase {
		@apply max-w-max px-3 py-2 font-semibold transition-all rounded-sm bg-gray-100 hover:bg-gray-700 hover:text-white w-full text-black drop-shadow-sm;
	}
	.grout > ul {
		@apply divide-y-2 divide-gray-800 divide-opacity-20 border-2 border-gray-800 border-opacity-20 text-gray-300;
	}
	li {
		@apply p-2;
	}
	:global(#notes > p > a) {
		@apply text-black dark:text-gray-200 font-semibold hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 transition-colors;
	}
	:global(#notes > p > a::after) {
		content: '🔗';
		@apply text-xs -top-0.5 left-0.5 relative;
	}
</style>
