/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // light-border-gray
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // deep-forest-green
        background: "var(--color-background)", // clean-white
        foreground: "var(--color-foreground)", // dark-charcoal
        primary: {
          DEFAULT: "var(--color-primary)", // deep-forest-green
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // saddle-brown
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // error-red
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // light-gray
          foreground: "var(--color-muted-foreground)", // medium-gray
        },
        accent: {
          DEFAULT: "var(--color-accent)", // vivid-orange
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // dark-charcoal
        },
        card: {
          DEFAULT: "var(--color-card)", // light-gray
          foreground: "var(--color-card-foreground)", // dark-charcoal
        },
        success: {
          DEFAULT: "var(--color-success)", // success-green
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // warning-yellow
          foreground: "var(--color-warning-foreground)", // dark-charcoal
        },
        error: {
          DEFAULT: "var(--color-error)", // error-red
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand specific colors
        'literary-brown': "var(--color-literary-brown)", // saddle-brown
        'forest-green': "var(--color-forest-green)", // deep-forest-green
        'warm-canvas': "var(--color-warm-canvas)", // warm-white
        'deal-orange': "var(--color-deal-orange)", // vivid-orange
        'trust-green': "var(--color-trust-green)", // forest-green
        'crimson-cta': "var(--color-crimson-cta)", // crimson-red
        'text-primary': "var(--color-text-primary)", // dark-charcoal
        'text-secondary': "var(--color-text-secondary)", // medium-gray
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        headline: ['Crimson Text', 'serif'], // literary-gravitas
        body: ['Inter', 'sans-serif'], // screen-readability
        accent: ['Playfair Display', 'serif'], // special-moments
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'book': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'book-hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'literary': '0 2px 8px rgba(139, 69, 19, 0.1)',
        'literary-elevated': '0 4px 16px rgba(139, 69, 19, 0.15)',
        'soft': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'book-reveal': 'book-reveal 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'book-reveal': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px) rotateX(15deg)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) rotateX(0)' 
          },
        },
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slideUp': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scaleIn': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      backdropBlur: {
        'literary': '8px',
      },
      gridTemplateColumns: {
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      aspectRatio: {
        'book': '2/3',
        'card': '4/3',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}