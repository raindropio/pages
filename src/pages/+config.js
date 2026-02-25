import vikeReact from 'vike-react/config'
import vikePhoton from 'vike-photon/config'

export default {
	extends: [vikeReact, vikePhoton],
	photon: { server: '../server/index.js' }
}
