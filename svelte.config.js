import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import svg from '@poppanator/sveltekit-svg';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// prerender: {
		// 	crawl: true,
		// 	enabled: true,
		// 	force: true,
		// 	pages: ['/events', '/events/2021/']
		// },
		vite: {
			// Options are optional
			plugins: [svg()],
			resolve: {
				alias: {
					$svg: path.resolve('src/lib/assets/svg')
				}
			}
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
