import { useLinkFactory } from '~modules/router'

export function useFilterHref(filter) {
    const getLink = useLinkFactory()

    return getLink({
        search: filter.includes(' ') ? `"${filter}"` : filter
    })
}