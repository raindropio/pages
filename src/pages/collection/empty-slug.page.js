import links from '~config/links'

export async function onBeforeRender({ routeParams: { user_name, id }, url }) {
    const { pathname } = new URL(url, 'http://localhost')
    const subPath = pathname.replace(`/${user_name}/-${id}`, `/a-${id}`)

    return {
        pageContext: {
            redirect: `https://${user_name}.${links.pub.domain}${subPath}`
        }
    }
}

export default null