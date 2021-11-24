const parts = /\/(.*)\/(\d+)\/?(view|search|embed|share)?\/?(.*)/i

export default ({ url }) => {
    const { pathname } = new URL(url, 'http://localhost')
    if (!parts.test(pathname))
        return false

    const [_, user_name, id, section='', options=''] = pathname.match(parts)

    return {
        routeParams: {
            user_name, section, id, options
        },
        precedence: 99
    }
}