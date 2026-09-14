# amriteshdasari.github.io

Personal portfolio of Mohan Amritesh Dasari — live at [amriteshdasari.github.io](https://amriteshdasari.github.io).

Built with Next.js (static export), Tailwind CSS v4, and Motion. Every push to `master` is built and deployed to GitHub Pages by [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml).

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static site in ./out
```

## Where things live

- `src/app/lib/content.js` — all copy: projects, experience, skills, and contact links
- `src/app/Components/` — the home page sections
- `src/app/projects/page.jsx` — the full project archive
- `public/og.jpg`, `src/app/icon.png` — link-preview card and favicon
