<script>
	import SkipToContent from './../01. atoms/SkipToContent.svelte';
	// Component imports
	import Logo from '$svg/Reset.svelte';
</script>

<header>
	<SkipToContent />
	<nav
		class="mx-auto text-lg text-black pointer-events-auto max-w-max dark:text-gray-100 drop-shadow-bonk-light dark:drop-shadow-bonk-dark"
		aria-label="Primary"
	>
		<ul class="flex space-x-4 text-sm justify-evenly place-items-center md:text-base font-heading">
			<li class="w-16 text-right">
				<a class="text-gray-200 standard-link" sveltekit:prefetch href="/events"> events </a>
			</li>
			<li>
				<a
					aria-label="Reset Presents Logo. Click to visit the home page."
					sveltekit:prefetch
					href="/"
					class="inline-block w-40 md:w-64"
				>
					<Logo />
				</a>
			</li>
			<li class="w-16 text-left">
				<a class="text-gray-200 standard-link" sveltekit:prefetch href="/about"> about </a>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	header {
		@apply w-full px-8 relative py-4 pointer-events-none;
		@apply before:absolute before:top-0 before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-b before:from-crisp-dark;
	}
</style>
