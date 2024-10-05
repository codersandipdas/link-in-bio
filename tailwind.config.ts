import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B3323',
        'primary-light': '#88B96C',
        light: '#F5F5F5',
        accent: '#F4A35E',
        'dark-accent': '#F2542D',
      },
    },
  },
  plugins: [],
};
export default config;
