import links from '~config/links'

export async function onBeforeRender({ routeParams: { user_name, slug, id, options='' } }) {
    return {
        pageContext: {
            redirect: `https://${user_name}.${links.pub.domain}/${slug}-${id}/${options}`,
            statusCode: 308
        }
    }
}

export default ()=>null