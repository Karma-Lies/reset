<script>
	import Logo from '$svg/Reset.svelte';
</script>

<header class="w-full px-8 py-4">
	<nav class="max-w-max mx-auto">
		<ul class="flex justify-evenly place-items-center space-x-4 font-mono">
			<li class="w-16">
				<a sveltekit:prefetch href="/events"> events </a>
			</li>
			<li class="">
				<h1 class="w-40 md:w-80">
					<a sveltekit:prefetch href="/">
						<Logo />
					</a>
				</h1>
			</li>
			<li class="w-16">
				<a sveltekit:prefetch href="/about"> about </a>
			</li>
		</ul>
	</nav>
</header>
