import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505',
                foreground: '#ededed',
                primary: {
                    DEFAULT: '#ff3333',
                    hover: '#cc0000',
                },
                secondary: '#1a1a1a',
                border: '#333333',
                muted: '#888888',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                DEFAULT: '16px',
            },
        },
    },
    plugins: [],
}

export default config
