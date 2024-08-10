import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        login: '0 8px 13.8px 9px rgba(50, 74, 255, 0.3)',
      },
      colors: {
        primary: '#2C75FF',
        lightBlack: '#243048',
      },
    },
  },
  plugins: [],
}
export default config
