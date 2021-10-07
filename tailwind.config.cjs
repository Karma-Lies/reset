const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	darkMode: 'class',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.warmGray,
			indigo: colors.indigo,
			purple: colors.purple,
			red: colors.rose,
			pink: colors.pink,
			yellow: colors.amber,
			'crisp-dark': '#161616'
		},
		extend: {
			dropShadow: {
				'bonk-light': '0rem 0.25rem 0.25rem #eee',
				'bonk-dark': '0rem 0.25rem 0.25rem #222'
			},
			fontFamily: {
				heading: 'Archivo Black',
				general: 'Inter'
			}
		}
	},
	plugins: []
};

module.exports = config;
