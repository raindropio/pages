export default {
    site: {
        index: process.env.NODE_ENV == 'production' ? 'https://raindrop.io' : 'http://dev.raindrop.io'
    },
    app: {
        index: 'https://app.raindrop.io'
    },
    help: {
        embed: 'https://help.raindrop.io/embed',
        publicPage: 'https://help.raindrop.io/public-page'
    }
}