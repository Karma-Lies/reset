<script>
	// Props
	export let src = 'https://vimeo.com/556675018';
	export let color = '#ffffff';

	// Library imports
	import { onMount } from 'svelte';
	import Player from '@vimeo/player';

	let video;
	const tokenizedURL = src.split('/');

	onMount(() => {
		// https://github.com/vimeo/player.js#embed-options
		const player = new Player(video, {
			id: tokenizedURL.pop(),
			color: color,
			responsive: true
		});
	});
</script>

<div bind:this={video} class="w-full h-full" />
