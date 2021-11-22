import * as React from 'react'
import { renderToString } from 'react-dom/server'
import routes from '../routes'

export async function onRequestGet({ request, env }) {
    var html = ''

    //send static files (except html)
    try{
        const file = await env.ASSETS.fetch(request)
        if (file.ok) {
            if (file.headers.get('content-type').includes('text/html'))
                html = await file.text()
            else
                return file
        }
    } catch (e) {}

    //get html
    if (!html) {
        const file = await env.ASSETS.fetch(new URL(request.url).origin)
        html = await file.text()
    }

    //ssr
    const route = routes(request.url)
    if (!route)
        return new Response('', { status: 404 })

    const { params, getData, Component } = route
    const data = await getData(params)
    
    if (!data || data.notFound)
        return new Response('', { status: 404 })

    return new Response(
        html.replace(
            '{{SSR}}',
            renderToString(<>
                <script dangerouslySetInnerHTML={{__html: `
                    window.__hydrate = ${JSON.stringify(data)}
                `}}></script>
                
                <Component {...data} />
            </>)
        ),
        {
            headers: {
                'content-type': 'content-type: text/html; charset=utf-8'
            }
        }
    )
}