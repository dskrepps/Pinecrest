


module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  theme: {
    container : {
      'xl' : 1024,
    },
    extend: {
      screens: {
        // Adding one pixel so this only applies to *extra* wide monitors like my ultrawide
        'xl': '1281px',
      },
      boxShadow: {
        'shaded': 'inset 0px -80px 70px -30px white',
        'soft-border': 'inset 0 0 8px 1px rgba(0, 0, 0, 0.3)',
        'inner-and-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      fontFamily: {
        'cursive': ['Dancing Script', 'sans-serif'],
        'sans': ['Raleway', 'Trebuchet MS', 'Avenir', 'Segoe UI', 'sans‑serif'],
        'copy': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      width: {
        '120': '30rem',
        '80': '20rem',
      },
      maxWidth: {
        'leave40rem': 'calc(100% - 40rem)',
        '480': '120rem',
        'content': 'max-content',
      },
      height: {
        '140': '35rem',
        '5-em': '1.25em',
      },
      maxHeight: {
        '160': '40rem',
        '256': '64rem',
      },
      minHeight: {
        '64': '16rem',
        '80': '20rem',
      },
      zIndex: {
        '-10': '-10',
        '-20': '-20',
      },
    },
  },
  variants: {
    'container': ['responsive'],
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function ({
      addUtilities,
    }) {
      addUtilities({
        '.transform-center': {
          marginLeft: '50%',
          transform: 'translateX(-50%)',
        },
      });
    },
    function ({
      addComponents
    }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1024px',
          },
        }
      }, ['responsive']);
    },
    function ({
      addBase,
      config
    }) {

      addBase({
        'h1': {
          fontSize: config('theme.fontSize.5xl'),
          fontWeight: config('theme.fontWeight.bold'),
          fontFamily: config('theme.fontFamily.sans').join(', '),
          marginBottom: config('theme.margin.4')
        },
        'h2': {
          fontSize: config('theme.fontSize.4xl'),
          fontWeight: config('theme.fontWeight.bold'),
          fontFamily: config('theme.fontFamily.sans').join(', '),
          marginBottom: config('theme.margin.4')
        },
        'h3': {
          fontSize: config('theme.fontSize.3xl'),
          fontWeight: config('theme.fontWeight.bold'),
          fontFamily: config('theme.fontFamily.sans').join(', '),
          marginBottom: config('theme.margin.4')
        },
        'h4': {
          fontSize: config('theme.fontSize.2xl'),
          fontWeight: config('theme.fontWeight.bold'),
          fontFamily: config('theme.fontFamily.sans').join(', '),
          marginBottom: config('theme.margin.4')
        },
        'h5': {
          fontSize: config('theme.fontSize.xl'),
          fontWeight: config('theme.fontWeight.bold'),
          fontFamily: config('theme.fontFamily.sans').join(', '),
          marginBottom: config('theme.margin.4')
        },
        'h6': {
          fontSize: config('theme.fontSize.lg'),
          fontWeight: config('theme.fontWeight.bold'),
          fontFamily: config('theme.fontFamily.sans').join(', '),
          marginBottom: config('theme.margin.4')
        },
      })
    }
  ],
  
  future: { removeDeprecatedGapUtilities: true, purgeLayersByDefault: true },
}
