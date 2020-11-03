# Pinecrest

An interface to view a collection of Reddit posts of tabletop RPG encounter maps, designed for personal use. I wanted a nice way to show this collection to friends and it made for nice experience working with Vue.js and Gridsome. Netlify CMS enabled.


## Understanding the Code

- The content consists of Reddit post URLs, tags, and artist credit. This data lives in `content/battlemaps/`. Image previews and artist's descriptions are pulled directly from the Reddit API by the user's browser.

- Most styling uses TailwindCSS, a framework which encourages extensive use of inline utility classes to streamline component development. (Media queries are especially easy!) Modification/additions to those utilities are found in `tailwind.config.js`, and a few more global styles are in `src/assets/scss/main.scss`.

- The three pages with static paths are in `src/pages/`, while the pages with dynamic paths (maps and tags) are in `src/templates/`.

- Gridsome compiles all this into a static site in `dist/` when you run `gridsome build`.


## Improvements I might make

- Searching multiple tags at once might be implementable by parsing a large object client-side.
- A tag search might also have a second section listing some maps which have variants containing that tag.
- Each map's page might have another section showcasing a couple more maps by an artist.
- Some of the more complex files should be split into smaller components.
  - Sometimes things just grow and you don't have time to refactor, you know?

&nbsp;
&nbsp;
&nbsp;

Built by dskrepps &mdash; <a href="https://webdevio.us/">webdevio.us</a>