/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#F7931E',
                secondary: '#1A5F7A',
                bg: {
                    dark: '#121212', // Mais escuro que o original #1A1A1A para mais contraste
                    card: '#1E1E1E',
                },
                status: {
                    risk: '#DC2626',
                    dev: '#F59E0B',
                    ready: '#10B981',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #1A5F7A 0deg, #F7931E 180deg, #1A5F7A 360deg)',
            }
        },
    },
    plugins: [],
}
