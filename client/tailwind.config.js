/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            animation: {
                fadeIn: 'fadeIn 0.4s',
                fadeOut: 'fadeOut 0.4s',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', top: '40%' },
                    '100%': { opacity: '1', top: '50%' },
                },
                fadeOut: {
                    '0%': { opacity: '1', top: '50%' },
                    '100%': { opacity: '0', top: '40%' },
                },
            },
        },
    },
    plugins: [],
};
