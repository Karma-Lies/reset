const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
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
		}
	},
	plugins: []
};

module.exports = config;
