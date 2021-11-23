export default {
    site: {
        index: import.meta.env.PROD ? 'https://raindrop.io' : 'http://dev.raindrop.io'
    },
    pub: {
        index: typeof SITE_URL == 'string' ? SITE_URL : ''
    },
    app: {
        index: 'https://app.raindrop.io'
    },
    help: {
        embed: 'https://help.raindrop.io/embed',
        publicPage: 'https://help.raindrop.io/public-page'
    }
}