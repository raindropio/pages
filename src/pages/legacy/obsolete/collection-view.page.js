import links from '~config/links'

export async function onBeforeRender({ routeParams: { user_name, slug, id, options='' } }) {
    return {
        pageContext: {
            redirect: `${links.site.index}/${user_name}/${slug}-${id}/${options}`,
            statusCode: 308
        }
    }
}

export default ()=>null