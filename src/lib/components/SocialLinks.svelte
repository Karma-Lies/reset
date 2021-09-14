<script>
	import Discord from '$icons/Discord.svelte';
	import Instagram from '$icons/Instagram.svelte';
	import Twitter from '$icons/Twitter.svelte';
	import Facebook from '$icons/Facebook.svelte';
</script>

<ul class="flex flex-row space-x-3">
	<li>
		<a href="https://discord.gg/p662j55GXr"><Discord /></a>
	</li>
	<li>
		<a href="https://instagram.com/reset_presents/"><Instagram /></a>
	</li>
	<li>
		<a href="https://twitter.com/reset_presents"><Twitter /></a>
	</li>
	<li><a href="https://www.facebook.com/resetpresents"><Facebook /></a></li>
</ul>

<style lang="postcss">
	li {
		@apply opacity-30 transition-opacity;
	}
	li:hover {
		@apply opacity-100;
	}
</style>
