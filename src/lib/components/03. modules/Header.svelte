<script>
	// Component imports
	import Logo from '$svg/Reset.svelte';
</script>

<header>
	<nav
		class="max-w-max mx-auto text-black dark:text-gray-100 text-lg drop-shadow-bonk-light dark:drop-shadow-bonk-dark pointer-events-auto"
	>
		<ul class="flex justify-evenly place-items-center space-x-4 font-archivo">
			<li class="w-16">
				<a class="standard-link" sveltekit:prefetch href="/events"> events </a>
			</li>
			<li class="">
				<h1 class="w-40 md:w-64">
					<a sveltekit:prefetch href="/">
						<Logo />
					</a>
				</h1>
			</li>
			<li class="w-16">
				<a class="standard-link" sveltekit:prefetch href="/about"> about </a>
			</li>
		</ul>
	</nav>
</header>

<style lang="postcss">
	header {
		@apply w-full px-8 relative py-4 pointer-events-none;
		@apply before:absolute before:top-0 before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-b dark:before:from-crisp-dark before:from-gray-100;
	}
</style>
