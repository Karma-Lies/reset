<script>
	// Component imports
	import Logo from '$svg/Reset.svelte';
	import SocialLinks from '../02. molecules/SocialLinks.svelte';
</script>

<footer class="relative w-full p-8 space-y-6 lg:space-y-4">
	<nav aria-label="site index">
		<ul class="flex space-y-6 lg:space-y-0 lg:justify-between flex-col lg:flex-row">
			<li class="mx-auto lg:mx-0 lg:w-72">
				<a
					aria-label="Reset Presents Logo. Click to visit the home page."
					aria-describedby="moto"
					sveltekit:prefetch
					href="/"
					class="inline-block w-24"
				>
					<Logo />
				</a>
				<small id="moto" class="opacity-50">music for the rest of us</small>
			</li>
			<li class="w-max-w flex-1">
				<ul class="flex justify-center space-x-6">
					<li class="dim standard-link">
						<a sveltekit:prefetch href="/events">events</a>
					</li>
					<li class="dim standard-link">
						<a sveltekit:prefetch href="/about">about</a>
					</li>
					<li class="dim standard-link">
						<a sveltekit:prefetch href="/contact">contact</a>
					</li>
				</ul>
			</li>
			<li class="flex lg:justify-end lg:w-72 place-self-center">
				<SocialLinks />
			</li>
		</ul>
	</nav>
	<div class="w-full text-center lg:text-right text-gray-400">
		<span class="opacity-75">made with</span>
		<span
			class="relative inline-block transform rotate-0 hover:rotate-[30deg] cursor-default transition-transform"
		>
			🍵
		</span>
		<span class="opacity-75">by</span>
		<a
			href="https://karmalies.studio"
			class="text-indigo-400 hover:text-indigo-200 standard-link transition-colors font-semibold"
			>Karma Lies</a
		>
	</div>
</footer>

<style lang="postcss">
	.dim {
		@apply opacity-50 transition-opacity;
	}
	.dim:hover {
		@apply opacity-100;
	}

	footer::before {
		content: '';
		@apply h-2 w-full bg-gradient-to-r from-purple-400 via-red-500 to-yellow-400 drop-shadow-xl max-w-full 2xl:rounded-sm absolute top-0 left-0;
	}
</style>
