const parts = /\/(.*)\/(view|search|embed|share)\/(\d+)\/?(.*)/i

export default ({ url }) => {
    const { pathname } = new URL(url, 'http://localhost')
    if (!parts.test(pathname))
        return false

    const [_, user_name, section='', id, options=''] = pathname.match(parts)

    return {
        routeParams: {
            user_name, section, id, options
        },
        precedence: 99
    }
}