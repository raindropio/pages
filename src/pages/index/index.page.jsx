import Helmet from 'react-helmet'

export async function onBeforeRender() {
    return {
        pageContext: {
            redirect: 'https://raindrop.io'
            // pageProps: {
            //     a: 'a'
            // }
        }
    }
}

export default function Page({ a }) {
    return (
        <>
            <Helmet>
                <title>Hi!</title>
            </Helmet>

            <h1>Welcome! {a}</h1>
        </>
    )
}