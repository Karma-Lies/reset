<script>
	import { SEO } from '$lib/components/01. atoms/SEO.svelte';
</script>

<SEO
	title="uh oh! 404"
	image={{
		src: '/photos/404.jpg',
		alt: 'this shit not found'
	}}
	authorTwitter="karma_lies"
>
	<meta name="robots" content="noindex" />
</SEO>

<section id="main-content" class="grid place-content-center h-[32rem]">
	<h1 class="text-9xl font-heading text-gray-100 text-center">404</h1>
	<p class="text-center border-2 p-2 border-white rounded-sm font-mono text-gray-100 text-lg">
		1 cat 2 cat 3 cat 4
	</p>
	<p class="text-center text-gray-200 mt-2 text-sm">we live in a simulation</p>
	<span class="text-gray-200">weee!</span>
</section>
