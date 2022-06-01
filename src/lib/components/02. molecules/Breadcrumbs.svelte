<script>
	import ArrowContainer from '$lib/components/01. atoms/ArrowContainer.svelte';

	export let accentColor = 'gray';
	export let path = '/events';
	// Clear the leading slash then split the path by slashes
	const directory = path.substring(1).split('/');
	// Current page that this component is showing up on
	const currentPage = directory.slice(-1);
	const crumbs = directory.slice(0, -1);
</script>

<nav
	class="px-6 m-auto text-sm font-medium tracking-wide text-gray-400 uppercase max-w-max"
	aria-label="Secondary"
>
	<ArrowContainer isBack={true} isLink={false}>
		<ol class="flex flex-row">
			{#each crumbs as crumb, index}
				<li class="opacity-75">
					<a
						href="/{directory.slice(0, index + 1).join('/')}"
						sveltekit:prefetch
						class="hover:text-gray-300"
					>
						{crumb}</a
					>
				</li>
			{/each}
			<li
				class={accentColor === 'indigo'
					? 'text-indigo-400'
					: accentColor === 'purple'
					? 'text-purple-400'
					: 'text-gray-400 opacity-75'}
			>
				{currentPage}
			</li>
		</ol>
	</ArrowContainer>
</nav>

<style lang="postcss">
	ol,
	li {
		@apply inline;
		@apply whitespace-pre-line;
	}
	li:not(:first-child)::before {
		content: '/';
		@apply m-1.5 text-gray-400 opacity-50;
	}
	/* Hack to compensate for Svelte adding unneccessary whitespace chars after {each} blocks */
	li:last-child {
		@apply -ml-1;
	}
</style>
