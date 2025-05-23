/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sirin: [
					'Sirin Stencil',
					'serif'
				],
				raleway: [
					'Raleway',
					'serif'
				],
				merriway: [
					'Merriweather',
					'serif'
				],
				lexend: [
					'Lexend Giga',
					'serif'
				],
				alkatra: [
					'Alkatra',
					'system-ui'
				],
				galada: [
					'Galada',
					'cursive'
				],
				mina: [
					'Mina',
					'sans-serif'
				],
				anek: [
					'Anek Bangla',
					'sans-serif'
				],
				balo: [
					'Baloo Da 2',
					'sans-serif'
				],
				vibes: [
					'Great Vibes',
					'cursive'
				],
				marck: [
					'Marck Script',
					'cursive'
				],
				loves: [
					'Lovers Quarrel',
					'cursive'
				]
			}
		}
	}
};
