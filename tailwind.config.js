/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#4e60ff',
				black: '#2b2b43',
			},
			transitionTimingFunction: {
				DEFAULT: 'ease',
			},
			transitionDuration: {
				DEFAULT: '250ms',
			},
		},
	},
	plugins: [],
};
