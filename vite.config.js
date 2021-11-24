import path from 'path'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import svgrPlugin from 'vite-plugin-svgr'

const src = path.resolve(__dirname, 'src')

export default {
	root: src,
	base: process.env.BASE_URL || '/',
	build: {
		outDir: '../dist'
	},
	resolve: {
		alias: [{
			find: /^~(.*)/,
			replacement: `${src}/$1`
		}]
	},
	plugins: [react(), ssr(), svgrPlugin()]
}