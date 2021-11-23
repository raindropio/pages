export async function onBeforeRender() {
    return {
        pageContext: {
            json: {
                a: 'a'
            },
            statusCode: 202
        }
    }
}

export default function () {
    return null
}