# DG Rating Converter

A minimal, installable webapp for converting disc golf ratings between UDisc and PDGA, using the
regression formula from [u/HucknPluck's analysis on r/discgolf](https://redd.it/1vt0svx) instead
of the old (and systematically inaccurate) `PDGA = 2 × UDisc + 500` rule of thumb.

Stack: Vite + React + TypeScript + Tailwind v4, PWA-installable via `vite-plugin-pwa`, deployed to
Cloudflare via Wrangler.

## Develop

```bash
npm install
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

## Deploy to Cloudflare

Requires a Cloudflare account logged in via `wrangler login` (or `CLOUDFLARE_API_TOKEN` set).

```bash
npm run deploy
```

This builds the app and runs `wrangler deploy`, which serves the static `dist/` output directly
from a Worker (see `wrangler.toml`). `npm run cf:dev` runs the built output through Wrangler's
local dev server instead of Vite's.

## Regenerating icons

`scripts/icon-source.svg` and `scripts/icon-maskable-source.svg` are the source-of-truth for the
app icons. Rasterize with [`rsvg-convert`](https://formulae.brew.sh/formula/librsvg) (not
ImageMagick — its built-in SVG renderer mishandles `fill="none"` + opacity and silently produces
broken output):

```bash
rsvg-convert -w 192 -h 192 scripts/icon-source.svg -o public/icons/icon-192.png
rsvg-convert -w 512 -h 512 scripts/icon-source.svg -o public/icons/icon-512.png
rsvg-convert -w 180 -h 180 scripts/icon-source.svg -o public/apple-touch-icon.png
rsvg-convert -w 512 -h 512 scripts/icon-maskable-source.svg -o public/icons/icon-maskable-512.png
cp scripts/icon-source.svg public/favicon.svg
```
