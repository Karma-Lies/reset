<script>
	// Component imports
	import Discord from '$svg/Discord.svelte';
	import Facebook from '$svg/Facebook.svelte';
	import Github from '$svg/Github.svelte';
	import Instagram from '$svg/Instagram.svelte';
	import Twitter from '$svg/Twitter.svelte';
	import Soundcloud from '$lib/assets/svg/Soundcloud.svelte';
	import Bandcamp from '$lib/assets/svg/Bandcamp.svelte';
	import Spotify from '$lib/assets/svg/Spotify.svelte';
	import Website from '$lib/assets/svg/Website.svelte';

	// Props
	export let size = 'regular';
	export let links = [
		{ type: 'Discord', href: 'https://discord.gg/p662j55GXr' },
		{ type: 'Instagram', href: 'https://instagram.com/reset_presents/' },
		{ type: 'Twitter', href: 'https://twitter.com/reset_presents' },
		{ type: 'Facebook', href: 'https://www.facebook.com/resetpresents' },
		{ type: 'Github', href: 'https://github.com/karma-lies/reset' }
	];

	const iconMap = {
		Discord: Discord,
		Facebook: Facebook,
		Github: Github,
		Instagram: Instagram,
		Twitter: Twitter,
		Soundcloud: Soundcloud,
		Bandcamp: Bandcamp,
		Spotify: Spotify,
		Website: Website
	};
</script>

<ul class="flex flex-row space-x-3 place-items-center" class:space-x-1={size === 'tiny'}>
	{#each links as link}
		<li class={size === 'tiny' ? 'w-4 h-4' : 'w-5 h-5'}>
			<a href={link.href} aria-label={link.type}><svelte:component this={iconMap[link.type]} /></a>
		</li>
	{/each}
</ul>

<style lang="postcss">
	li {
		@apply opacity-50;
		@apply motion-safe:transition-all translate-y-0 scale-100 origin-bottom;
	}
	li:hover,
	li:focus-within {
		@apply opacity-100 text-purple-400;
		@apply motion-safe:translate-x-0.5 motion-safe:scale-105;
	}
</style>
