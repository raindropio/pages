import links from '~config/links'

export async function onBeforeRender({ routeParams: { user_name, section='', id, options='' } }) {
    return {
        pageContext: {
            redirect: `https://${user_name}.${links.pub.domain}/a-${id}${section && section!='view' ? `/${section}` : ''}${options ? '/'+options : ''}`,
            statusCode: 308
        }
    }
}

export default ()=>null