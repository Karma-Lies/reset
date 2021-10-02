<script>
	// Component imports
	import Discord from '$svg/Discord.svelte';
	import Facebook from '$svg/Facebook.svelte';
	import Github from '$svg/Github.svelte';
	import Instagram from '$svg/Instagram.svelte';
	import Twitter from '$svg/Twitter.svelte';

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
		Twitter: Twitter
	};
</script>

<ul class="flex flex-row space-x-3 place-items-center" class:space-x-1={size === 'tiny'}>
	{#each links as link}
		<li class={size === 'tiny' ? 'w-4 h-4' : 'w-5 h-5'}>
			<a href={link.href}><svelte:component this={iconMap[link.type]} /></a>
		</li>
	{/each}
</ul>

<style lang="postcss">
	li {
		@apply opacity-30 transition-opacity;
	}
	li:hover {
		@apply opacity-100;
	}
</style>
