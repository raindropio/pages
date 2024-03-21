export async function onBeforeRender({ url }) {
    const query = Object.fromEntries(new URL(url, 'http://localhost').searchParams)
    const destination = query.url || ''

    if (!destination.startsWith('https://raindrop.io'))
        return {
            pageContext: {
                statusCode: 404
            }
        }

    return {
        pageContext: {
            proxy: `https://rdl.ink/render/${destination}?width=1200&height=628`
        }
    }
}

export default ()=>null