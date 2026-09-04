import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

import svgr from 'vite-plugin-svgr'

const src = path.resolve(import.meta.dirname, 'src')

export default defineConfig({
	server: {
		host: true,
		allowedHosts: ['.localhost']
	},
	publicDir: 'src/public',
	build: {
		assetsDir: '__pages_assets__'
	},
	environments: {
		//public/ only belongs in dist/client
		ssr: { build: { copyPublicDir: false } }
	},
	resolve: {
		alias: [{
			find: /^~(.*)/,
			replacement: `${src}/$1`
		}]
	},
	plugins: [vike(), react(), svgr()]
})
