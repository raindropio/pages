import links from '~config/links'

export async function onBeforeRender({ routeParams: { user_name, id }, url }) {
    const { pathname } = new URL(url, 'http://localhost')
    
    return {
        pageContext: {
            redirect: `${links.site.index}${pathname.replace(`${user_name}/-${id}`, `${user_name}/a-${id}`)}`
        }
    }
}

export default null