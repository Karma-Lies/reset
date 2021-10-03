<script>
	import ArrowLink from '$lib/components/01. atoms/ArrowLink.svelte';

	export let path = '/events/2021';
	// Clear the leading slash then split the path by slashes
	const directory = path.substring(1).split('/');
	// Current
	const currentPage = directory.slice(-1);
	const crumbs = directory.slice(0, -1);
</script>

<aside class="px-6 font-medium tracking-wide text-sm uppercase max-w-max m-auto text-gray-500">
	<ArrowLink isBack={true}>
		<div class="space-x-1.5 inline">
			{#each crumbs as page, index}
				<a
					href="/{directory.slice(0, index + 1).join('/')}"
					sveltekit:prefetch
					class="hover:text-gray-400">{page}</a
				><span class="select-none">/</span>{/each}<span class="text-gray-700 select-none"
				>{currentPage}</span
			>
		</div>
	</ArrowLink>
</aside>
