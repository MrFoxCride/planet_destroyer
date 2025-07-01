export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile360: '360px',
        mobile414: '414px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        flyout: {
          '0%': { opacity: '0', transform: 'translateY(0px) scale(0.8)' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        flyout: 'flyout 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}
