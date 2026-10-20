import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

import svgr from 'vite-plugin-svgr'

const src = path.resolve(import.meta.dirname, 'src')

export default defineConfig(({ command }) => ({
	//one asset cache entry for all user subdomains, see README
	base: command == 'build' ? 'https://raindrop.page/' : '/',
	server: {
		host: true,
		allowedHosts: ['.localhost']
	},
	publicDir: false,
	build: {
		assetsDir: '__pages_assets__',
		rolldownOptions: {
			output: {
				//rolldown emits a chunk per shared module (~60 tiny js/css per page), keep everything in one
				codeSplitting: {
					groups: [{ name: 'app', test: /\/src\// }]
				}
			}
		}
	},
	resolve: {
		alias: [{
			find: /^~(.*)/,
			replacement: `${src}/$1`
		}]
	},
	plugins: [vike(), react(), svgr()]
}))