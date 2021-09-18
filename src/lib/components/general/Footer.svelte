<script>
	import Logo from '$svg/Reset.svelte';
	import SocialLinks from '../02. molecules/SocialLinks.svelte';
</script>

<hr
	class="h-2 w-full bg-gradient-to-r from-purple-400 to-pink-600 border-0 border-transparent drop-shadow-xl"
/>
<footer class="w-full p-8">
	<nav>
		<ul class="flex justify-between">
			<li class="w-72">
				<h1 class="w-24 inline-block">
					<a sveltekit:prefetch href="/">
						<Logo />
					</a>
				</h1>
				<small class="opacity-40">music for the rest of us</small>
			</li>
			<li class="w-max-w">
				<ul class="flex justify-center space-x-6 font-mono">
					<li class="footer-element">
						<a sveltekit:prefetch href="/events">events</a>
					</li>
					<li class="footer-element">
						<a sveltekit:prefetch href="/about">about</a>
					</li>
					<li class="footer-element">
						<a sveltekit:prefetch href="/contact">contact</a>
					</li>
				</ul>
			</li>
			<li class="flex justify-end w-72 place-self-center">
				<SocialLinks />
			</li>
		</ul>
	</nav>
</footer>

<style lang="postcss">
	.footer-element {
		@apply opacity-40 transition-opacity;
	}
	.footer-element:hover {
		@apply opacity-100;
	}
</style>
