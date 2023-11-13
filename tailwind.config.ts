import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                	'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
			colors: {
				"bg": "var(--bg)",
				"header-bg": "var(--header-bg)",
				"primary": "var(--primary)",
				"secondary": "var(--secondary)",
				"board": "var(--board)",

				"primary-btn-text": "var(--primary-btn-text)",
				"primary-btn-text-hover": "var(--primary-btn-text-hover)",
				"primary-btn-bg": "var(--primary-btn-bg)",
				"primary-btn-bg-hover": "var(--primary-btn-bg-hover)",
				"primary-btn-border": "var(--primary-btn-border)",
				"primary-btn-border-hover": "var(--primary-btn-border-hover)",

				"secondary-btn-text": "var(--secondary-btn-text)",
				"secondary-btn-text-hover": "var(--secondary-btn-text-hover)",
				"secondary-btn-bg": "var(--secondary-btn-bg)",
				"secondary-btn-bg-hover": "var(--secondary-btn-bg-hover)",
				"secondary-btn-border": "var(--secondary-btn-border)",
				"secondary-btn-border-hover": "var(--secondary-btn-border-hover)",
			},
			fontFamily: {
				inter: ["var(--font-inter)"],
				poppins: ["var(--font-poppins)"]
			},
			screens: {
				"xs": "425px",
				"sm": "640px",
				"md": "768px",
				"lg": "1024px",
				"xl": "1280px",
				"2xl": "1536px"
			},
        },
    },
    plugins: [],
}
export default config
