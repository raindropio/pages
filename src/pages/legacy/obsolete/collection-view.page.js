export async function onBeforeRender({ routeParams: { user_name, slug, id, options='' } }) {
    return {
        pageContext: {
            redirect: `/${user_name}/${slug}-${id}/${options}`,
            statusCode: 308
        }
    }
}

export default ()=>null