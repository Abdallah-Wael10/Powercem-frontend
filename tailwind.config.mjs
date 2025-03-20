/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'world': "url('/home/world.jpg')",
        'bgp': "url('/home/bgp.jpg')",
        'contact': "url('/home/contact.jpg')",
        'AboutUS': "url('/home/bbb.jpeg')",
      },
      screens: {
        'max-2561':{ max: '2561' }, 
        'max-2000':{ max: '2000' }, 
        'max-1440':{ max: '1440px' }, 
        'max-1439':{ max: '1439px' }, 
        'max-1025':{ max: '1025px' }, 
        'max-900': { max: '900px' }, 
        'max-600': { max: '600px' }, 
        'max-417': { max: '417px' }, 
        'max-376': { max: '376px' }, 
        'max-330': { max: '330px' }, 
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' }, // From left to right
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideIn2: {
          '0%': { transform: 'translateX(100%)', opacity: '0' }, // From right to left
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'slide-in': 'slideIn 1.5s ease-in-out',
        'slide-in2': 'slideIn2 1.5s ease-in-out', 
        'fade-in': 'fadeIn 1s ease-in forwards',

      },
    },
  },
  plugins: [],
};
