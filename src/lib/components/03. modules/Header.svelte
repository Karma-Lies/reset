<script>
	// Component imports
	import Logo from '$svg/Reset.svelte';
</script>

<header
	class="w-full px-8 py-4 sticky z-30 top-0 bg-gradient-to-b from-white dark:from-black to-transparent"
>
	<nav
		class="max-w-max mx-auto text-black dark:text-white font-semibold text-lg drop-shadow-bonk-light dark:drop-shadow-bonk-dark"
	>
		<ul class="flex justify-evenly place-items-center space-x-4 font-mono">
			<li class="w-16">
				<a class="standard-link" sveltekit:prefetch href="/events"> events </a>
			</li>
			<li class="">
				<h1 class="w-40 md:w-80">
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
