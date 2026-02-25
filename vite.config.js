import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

import svgr from 'vite-plugin-svgr'

const src = path.resolve(__dirname, 'src')

export default defineConfig({
	server: {
		host: true,
		allowedHosts: ['.localhost']
	},
	build: {
		assetsDir: '__pages_assets__'
	},
	resolve: {
		alias: [{
			find: /^~(.*)/,
			replacement: `${src}/$1`
		}]
	},
	plugins: [react(), svgr()]
})
