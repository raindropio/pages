import { useMemo, useCallback } from 'react'

import { useLinkFactory } from '~modules/router'
import { Select } from '~co/button'
import Icon from '~co/icon'
import SortAscIcon from 'remixicon/icons/Editor/sort-asc.svg?react'
import SortDescIcon from 'remixicon/icons/Editor/sort-desc.svg?react'

export default function RaindropsSort({ options={} }) {
    const getLink = useLinkFactory()

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

    const onChange = useCallback(sort=>{
        location.assign(getLink({ sort }))
    }, [getLink])

    return (
        <Select 
            variant={sort!='-sort' ? 'active' : 'flat'}
            selected={sort}
            options={sorts}
            onChange={onChange}>
            {({label, dir})=>(<>
                <Icon
                    as={dir == 'asc' ? SortAscIcon : SortDescIcon}
                    size='small' />

                {label.replace(/\s\(.*\)/, '')}
            </>)}
        </Select>
    )
}