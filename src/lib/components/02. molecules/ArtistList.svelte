<script>
	// Component imports
	import SocialLinks from './SocialLinks.svelte';

	// Props
	export let artists = [
		{ name: 'JKuch', spotify: 'https://google.com', socialLinks: [] },
		{ name: 'Xavi', spotify: 'https://google.com' },
		{ name: 'ell!psis', spotify: 'https://google.com' },
		{ name: 'Sweater Disco', spotify: 'https://google.com' },
		{ name: 'Waxcraft', spotify: 'https://google.com' }
	];
</script>

<ul name="artists" class="space-y-2 w-prose">
	{#each artists as artist (artist.name)}
		<li class="flex space-x-4">
			<a
				class="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-100 via-purple-200 to-purple-500 hover:bg-gradient-to-tl hover:to-yellow-600"
				href={artist.socialLinks.find((link) => link.type === 'Spotify')?.href}
			>
				{artist.name}
			</a>
			<SocialLinks size="tiny" links={artist.socialLinks} />
		</li>
	{/each}
</ul>
