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
					slug: page.params.slug
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
	import ArtistList from '$lib/components/02. molecules/ArtistList.svelte';

	// Props
	export let event;
	export let year;
	export let slug;

	const startTime = new Date(event.startTime).toLocaleString('en-US', {
		weekday: 'short',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<SEO title="{event.title} {year}" url="events/{year}/{slug}" />
<article class="grid lg:grid-cols-2 justify-center content-start p-4 text-lg lg:gap-4">
	<section class="p-2 lg:w-5/6 xl:w-3/4 justify-self-end rounded-sm">
		<a href={event.ticketPurchaseUrl}>
			<img src={event.flyer.url} alt="{event.title} flyer" />
		</a>
	</section>
	<section class="p-2 space-y-4 grout">
		<div class="flex flex-wrap items-center">
			<h1 name="title" class="text-6xl font-archivo mr-4">{event.title}</h1>
			<a
				target="_blank"
				name="tickets"
				class="self-center transition-colors max-w-max text-xl bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-purple-700 dark:to-purple-600 border-2 rounded-sm border-black p-2 dark:border-purple-600 dark:hover:border-b-purple-100 dark:text-white"
				href={event.ticketPurchaseUrl}>Get Tickets</a
			>
		</div>
		<h2 class="sr-only">Details</h2>
		<ul>
			<li>
				<h3>Start Time</h3>
				<p id="start-time">{startTime}</p>
			</li>
			<li>
				<h3>Address</h3>
				<p id="address">{event.address}</p>
			</li>
			<li class="space-y-2">
				<h3>Artists</h3>
				<ArtistList />
			</li>
			<li class="space-y-2">
				<h3>Description</h3>
				<div id="description" class="space-y-3 text-sm max-w-prose">
					{@html event.description.html}
				</div>
			</li>
		</ul>
	</section>
</article>

<style lang="postcss">
	h3 {
		@apply text-yellow-400 max-w-max tracking-wide font-semibold text-sm;
	}
	.grout > ul {
		@apply divide-y-2 divide-gray-800 divide-opacity-20 border-2 border-gray-800 border-opacity-20 text-gray-300;
	}
	li {
		@apply p-2;
	}
	:global(#description > p > a) {
		@apply text-black dark:text-purple-300 font-semibold hover:text-purple-600 border-b-2 border-transparent hover:border-purple-600 transition-colors;
	}
	:global(#description > p > a::after) {
		content: '🔗';
		@apply text-xs -top-0.5 left-0.5 relative;
	}
</style>
