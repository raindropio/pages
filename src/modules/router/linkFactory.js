import { createContext, useContext } from 'react'

/*
    Root component:
    <LinkFactory.Provider
        value={({ key: val })=>'url...'}
*/
export const LinkFactory = createContext(()=>'')

/*
    Use inside component:
    const getLink = useLinkFactory()
    getLink({ key: val })
*/
export function useLinkFactory() {
    return useContext(LinkFactory)
}