import { useRouter } from 'next/router'
import { parseQueryParams } from '~modules/format/url'

export function useFilterHref(filter) {
    const { query, pathname } = useRouter()
    const search = String(parseQueryParams(query.options).search||'')

    let val = filter.includes(' ') ? `"${filter}"` : filter

    if (search.includes(val))
        return {
            pathname,
            query
        }

    return {
        pathname: '/[user_name]/search/[id]/[options]',
        query: {
            ...query,
            options: new URLSearchParams({
                search: (search ? 
                    `${search.trim()} ${val}` :
                    val) + ' '
            }).toString()
        }
    }
}