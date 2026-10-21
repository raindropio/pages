import Icon from '~co/icon'
import HeartIcon from 'remixicon/icons/Health & Medical/heart-3-fill.svg?react'
import Button from '~co/button'
import { useFilterHref } from '~co/search/hooks'

export default function RaindropsSingleImportant({ item: { important }, target }) {
    const href = useFilterHref('important:1')

    if (!important)
        return null

    return (
        <Button 
            href={href}
            color='accent'
            target={target}
            title='Is favorite'>
            <Icon 
                as={HeartIcon} 
                size='small' />
        </Button>
    )
}