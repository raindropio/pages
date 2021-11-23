import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Select } from '~co/button'
import Icon from '~co/icon'

export default function RaindropsSort({ options={} }) {
    const router = useRouter()

    const sort = options.sort
    const sorts = useMemo(()=>[
        { separator: true, label: 'Curator specified' },
        { value: '-sort', label: 'Custom sorting', dir: 'desc' },

        { separator: true, label: 'Date added' },
        { value: '-created', label: 'Newest', dir: 'desc' },
        { value: 'created', label: 'Oldest', dir: 'asc' },

        { separator: true, label: 'Name' },
        { value: 'title', label: 'A-Z', dir: 'desc' },
        { value: '-title', label: 'Z-A', dir: 'asc' },

        ...options.search ? [
            { separator: true, label: 'Search' },
            { value: 'score', label: 'By relevance', dir: 'desc' }
        ] : []
    ], [options])

    const onChange = useCallback(value=>{
        router.push({
            pathname: router.pathname.endsWith('[options]') ? router.pathname : `${router.pathname}/[options]`,
            query: {
                ...router.query,
                options: new URLSearchParams({
                    ...options,
                    sort: value
                }).toString()
            }
        })
    }, [options])

    return (
        <Select 
            variant={sort!='-sort' ? 'active' : 'flat'}
            selected={sort}
            options={sorts}
            onChange={onChange}>
            {({label, dir})=>(<>
                <Icon
                    name={`sort-${dir}`}
                    variant=''
                    size='small' />

                {label.replace(/\s\(.*\)/, '')}
            </>)}
        </Select>
    )
}