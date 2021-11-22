import { hydrate } from 'react-dom'
import routes from '../routes'

const route = routes(location)
if (!route) return

const { Component } = route

hydrate(
    <Component {...window.__hydrate || {}} />,
    document.querySelector('#app')
)