<script>
	import SocialLinks from './SocialLinks.svelte';

	export let artists = [
		{ name: 'JKuch', slug: 'cam-stacey', spotify: 'https://google.com' },
		{ name: 'Xavi', slug: 'cam-stacey', spotify: 'https://google.com' },
		{ name: 'ell!psis', slug: 'cam-stacey', spotify: 'https://google.com' },
		{ name: 'Sweater Disco', slug: 'cam-stacey', spotify: 'https://google.com' },
		{ name: 'Waxcraft', slug: 'cam-stacey', spotify: 'https://google.com' }
	];
</script>

<ul name="artists" class="space-y-2 w-prose">
	{#each artists as artist (artist.slug)}
		<li class="flex space-x-4">
			<a
				class="test font-medium bg-clip-text text-transparent bg-gradient-to-br from-purple-100 via-purple-200 to-purple-500"
				href={artist.spotify}
			>
				{artist.name}
			</a>
			<SocialLinks size="tiny" />
		</li>
	{/each}
</ul>
