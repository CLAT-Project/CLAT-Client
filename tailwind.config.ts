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
        inner: '0 4px 4px 0 rgba(0, 0,0, 0.25)',
      },
      colors: {
        primary: '#2C75FF',
        lightBlack: '#243048',
        verify: '#D3E2FF',
        errorRed: `#E94B2C`,
      },
      sidebar: {
        active: '#2C75FF',
      },
      borderRadius: {
        18: '18px',
        49: '49px',
      },
    },
  },
  plugins: [],
}
export default config
