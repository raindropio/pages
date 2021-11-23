import { useMemo } from 'react'
import { Select } from '~co/button'
import Icon from '~co/icon'

export default function RaindropsSort({ onChange, options={} }) {
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