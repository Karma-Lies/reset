import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import svg from '@poppanator/sveltekit-svg';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		prerender: {
			default: true
		},
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
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
