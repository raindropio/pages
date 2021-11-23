# Raindrop.io Public Pages for Collection / User

## Implementation
Build with `vite` & `vite-ssr-plugin`. Can be run on any serverless environment.
But optimized for Cloudflare Worker for now.

**Folder structure**
- etc/dev-server        Used only for local development, mimics Cloudflare Worker environment
- src
    - pages
    - public            Files that will be copied to production root folder
        - _app          Like next.js
        - _error        Like next.js
    - renderer          Different root index files for client/server env
- worker                Source of Cloudflare Worker
- wrangler.toml         Cloudflare Worker specific

## Todo
[] Client-side routing with prefetch https://vite-plugin-ssr.com/useClientRouter

[] /user_name/collection-11/view/... redirect