export async function onBeforeRender({ routeParams: { user_name, section='', id, options='' } }) {
    return {
        pageContext: {
            redirect: `/${user_name}/a-${id}${section && section!='view' ? `/${section}` : ''}/${options}`,
            statusCode: 308
        }
    }
}

export default ()=>null