if (typeof DOMAIN != 'string' || !DOMAIN)
    throw new Error('DOMAIN variable is not set')

export default {
    site: {
        index: import.meta.env.PROD ? 'https://raindrop.io' : 'http://dev.raindrop.io'
    },
    pub: {
        domain: DOMAIN
    },
    app: {
        index: 'https://app.raindrop.io'
    },
    help: {
        embed: 'https://help.raindrop.io/embed',
        publicPage: 'https://help.raindrop.io/public-page',
        search: 'https://help.raindrop.io/using-search'
    }
}
