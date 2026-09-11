import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { vyral: '#ff2d55' }, boxShadow: { glow: '0 0 45px rgba(255,45,85,.18)' } } }, plugins: [] };
export default config;