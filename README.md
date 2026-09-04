# Raindrop.io Public Pages

Public pages for collections and user profiles, served at `https://<username>.raindrop.page`.

## Stack

- [Vike](https://vike.dev) + `vike-react` (React 19, SSR)
- `vike-photon` + [Hono](https://hono.dev), Node target (`photon.target: 'node'`)
- Vite 7, Sass, `vite-plugin-svgr`
- Data comes from `https://api.raindrop.io/v2` via the built-in `fetch`

## Scripts

```
npm run local        # dev server (vike dev)
npm run build        # production build → dist/
npm run start        # node dist/server/index.mjs
npm run preview      # build + start
npm run deploy:prod  # force-push master → release/production
```

## Deploy

DigitalOcean App Platform, Node.js buildpack (no Dockerfile). Deploy is triggered by pushing
to `release/production` (`npm run deploy:prod`). Node version is pinned in `package.json` → `engines`.

App Platform sits behind Cloudflare, so:

- responses with `Cache-Control: public` are cached at the edge (pages: 20s, embeds: 60s, oembed/feed: 1h)
- static assets in `__pages_assets__/` are hashed and served with `max-age=31536000, immutable`
- compression is done by the edge, so it is disabled in Node (`photon.compress: false`)

## Structure

```
src/
  pages/            Vike pages (+route, +data, +Page, +headersResponse per route)
    collection/     view, search, share, embed, empty-slug (redirect to slugged URL)
    user/           home, share, embed
    _app/ _error/
    +onBeforeRoute  maps <username>.raindrop.page/... → /<username>/...
    +config.js      vike / photon config (server entry, compress, static cache)
  server/           Hono entry: /api/oembed, /<slug>-<id>/feed, then Vike handler
  api/              api.raindrop.io client (collection(s), raindrops, filters, user)
  co/               React components
  modules/          helpers (format, router, async, browser)
  config/           endpoints, links, constants
  public/           copied to dist/client root (favicon etc), see vite.config.js publicDir
  assets/           icons
```

## Routing

Subdomain is the username: `rustem.raindrop.page/design-123` is routed internally as
`/rustem/design-123`. Raw `#` in search URLs is user error, legacy redirects were removed on purpose.
