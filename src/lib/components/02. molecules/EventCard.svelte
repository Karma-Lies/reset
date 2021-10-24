<script>
	// Props
	export let event;
	export let index;
	export let strictlyLazy = false;

	const startTimeString = new Date(event.startTime).toLocaleString('en-US', {
		weekday: 'short',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<div class="card">
	<a class="group" sveltekit:prefetch href="/events/{event.year}/{event.slug}">
		<img
			width="1000"
			height="1250"
			src={event.flyer.url}
			alt="{event.title} flyer"
			class="bg-black"
			loading={index !== 0 || strictlyLazy ? 'lazy' : 'eager'}
		/>

		<div
			class="absolute inset-0 w-full h-full overflow-hidden text-center duration-300 shadow-inner opacity-0 motion-safe:transition-opacity bg-crisp-dark bg-opacity-90 group-hover:opacity-100 group-focus:opacity-100"
		>
			<section class="grid w-full h-full space-y-3 place-content-center">
				<span class="text-sm font-semibold text-gray-300 rotate-1">Reset Presents:</span>
				<h3
					class="text-4xl motion-safe:transition-transform font-heading translate-y-52 -rotate-4 group-hover:translate-y-0 group-hover:-rotate-2 group-focus:translate-y-0 group-focus:-rotate-2"
				>
					{event.title}
					{#if event.isSoldOut}
						<span class="italic text-purple-300">[SOLD OUT]</span>
					{/if}
				</h3>
				<time
					class="motion-safe:transition-transform motion-safe:delay-200 translate-y-96 -rotate-8 group-hover:translate-y-0 group-hover:rotate-0 group-focus:translate-y-0 group-focus:rotate-0"
					>{startTimeString}</time
				>
			</section>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="transparent"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				role="presentation"
				class="absolute w-12 duration-300 rotate-90 translate-x-24 -translate-y-24 opacity-0 motion-safe:transition-all right-3 top-3 group-hover:opacity-100 group-focus:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
			>
				<path d="M18 18L6 6" />
				<path d="M8 18h10V8" />
			</svg>
		</div>
	</a>
</div>

<style lang="postcss">
	.card {
		@apply w-full h-full relative z-10;
		@apply border-white border-2 translate-y-0 motion-safe:transition-transform;
		@apply hover:-translate-y-2 hover:rotate-1;
	}

	img {
		@apply h-full object-cover z-10 w-full;
	}
</style>
