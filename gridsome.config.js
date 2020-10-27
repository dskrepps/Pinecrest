const path = require('path');

module.exports = {
  siteName: 'Pinecrest',
  siteDescription: 'Curated gallery of Reddit posts featuring tabletop battle maps',
  siteUrl: 'http://localhost:8080',

  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {},
        presetEnvConfig: {},
        shouldPurge: true,
        shouldImport: true,
        shouldTimeTravel: true,
        shouldPurgeUnusedKeyframes: true,
      }
    },
    {
      use: 'gridsome-source-static-meta',
      options: {
        path: 'content/site/*.json'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Item',
        baseDir: './content',
        path: 'battlemap/*.md',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          },
        }
      }
    },
    {
      use: 'gridsome-plugin-manifest',
      options: {
        background_color: "#1a202c",
        icon_path: "./src/assets/img/compass-rose.png",
        name: "Pinecrest Battlemap Gallery",
        short_name: "Pinecrest",
        theme_color: "#1a202c",
        lang: "en",
      },
    },
  ],

  templates: {
    Tag: [{
      path: '/tags/:title',
    }],
  }
}
