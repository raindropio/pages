// -> { params, getData, Component }
export default function(url) {
    const { pathname } = new URL(url)
    const [ _, username, page='', ...etc ] = pathname.replace('//', '/').split('/')
    const route = require('./user')

    return {
        params: { username },
        getData: route.getData,
        Component: route.default
    }
}