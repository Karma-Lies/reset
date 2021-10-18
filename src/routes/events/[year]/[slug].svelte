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
	import TicketPurchase from '$lib/components/02. molecules/TicketPurchase.svelte';
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
	pageType="article"
/>

<div class="my-2">
	<Breadcrumbs {path} accentColor="purple" />
</div>
<article
	id="main-content"
	class="grid content-start justify-center p-4 mb-4 text-lg lg:grid-cols-2 lg:gap-4"
>
	<section class="p-2 lg:w-5/6 xl:w-3/4 justify-self-end">
		<div id="flyer">
			<a href={event.ticketPurchaseUrl}>
				<img
					width="1000"
					height="1250"
					src={event.flyer.url}
					alt="{event.title} flyer"
					class="rounded-sm"
				/>
			</a>
		</div>
	</section>
	<section class="p-2 space-y-4 md:space-y-2 grout">
		<div class="flex flex-col flex-wrap items-center space-y-2 md:space-y-0 md:flex-row">
			<h1
				name="title"
				class="text-6xl text-center font-heading md:mr-6 lg:text-left"
				style="margin-top: calc((1 - 1.25) * 0.5em);"
			>
				{event.title}
			</h1>
			<TicketPurchase eventID={event.eventbriteID} url={event.ticketPurchaseUrl}>
				{ticketButtonCTA}
			</TicketPurchase>
		</div>
		<h2 class="sr-only">Details</h2>
		<ul>
			<li>
				<h3>Start Time</h3>
				<time id="start-time">{startTimeString}</time>
			</li>
			<li>
				<h3>Address</h3>
				<address id="address" class="not-italic cursor-help">{event.address}</address>
			</li>
			{#if event.artists}
				<li aria-label="Check out the performers at this show">
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
		@apply text-gray-400 opacity-75 max-w-max tracking-wide font-semibold text-sm border-b-2 border-opacity-20 border-gray-800 -ml-3 pl-1 bg-crisp-dark;
	}
	.grout > ul {
		@apply divide-y-2 divide-gray-800 divide-opacity-20 border-2 border-gray-800 border-opacity-20 text-gray-300;
	}
	li {
		@apply p-2;
	}
	:global(#notes > p > a) {
		@apply text-gray-200 font-semibold hover:text-purple-500 border-b-2 border-transparent hover:border-purple-600 transition-colors;
	}
	:global(#notes > p > a::after) {
		content: '🔗';
		@apply text-xs -top-0.5 left-0.5 relative;
	}
</style>
