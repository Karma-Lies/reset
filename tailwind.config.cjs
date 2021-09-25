const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	darkMode: 'media',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			indigo: colors.indigo,
			purple: colors.purple,
			red: colors.rose,
			pink: colors.pink,
			yellow: colors.amber
		},
		extend: {
			dropShadow: {
				'bonk-light': '0rem 0.25rem 0.25rem #eee',
				'bonk-dark': '0rem 0.25rem 0.25rem #222'
			}
		}
	},
	plugins: []
};

module.exports = config;
