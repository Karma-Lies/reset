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
			class="absolute inset-0 w-full h-full bg-crisp-dark bg-opacity-90 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 overflow-hidden text-center shadow-inner"
		>
			<section class="w-full h-full space-y-3 grid place-content-center">
				<span class="font-semibold text-gray-300 text-sm rotate-1">Reset Presents:</span>
				<h3
					class="text-4xl font-heading transition-transform translate-y-52 -rotate-4 group-hover:translate-y-0 group-hover:-rotate-2 group-focus:translate-y-0 group-focus:-rotate-2"
				>
					{event.title}
				</h3>
				<time
					class="transition-transform translate-y-96 -rotate-8 group-hover:translate-y-0 group-hover:rotate-0 group-focus:translate-y-0 group-focus:rotate-0 delay-200"
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
				class="absolute right-3 top-3 w-12 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 rotate-90 translate-x-24 -translate-y-24 group-hover:translate-x-0 group-hover:translate-y-0"
			>
				<path d="M18 18L6 6" />
				<path d="M8 18h10V8" />
			</svg>
		</div>
	</a>
</div>

<style lang="postcss">
	.card {
		@apply w-full h-full relative;
		@apply border-white border-2 translate-y-0 transition-transform;
		@apply hover:-translate-y-2 hover:rotate-1;
	}

	img {
		@apply h-full object-cover z-10 w-full;
	}
</style>
