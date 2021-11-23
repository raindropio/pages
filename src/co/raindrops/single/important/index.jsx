import Icon from '~co/icon'
import Button from '~co/button'
import { useFilterHref } from '~co/search/hooks'

export default function RaindropsSingleImportant({ item: { important }, target }) {
    const href = useFilterHref('important:1')

    if (!important)
        return null

    return (
        <Button 
            href={href}
            prefetch={false}
            color='accent'
            target={target}
            title='Is favorite'>
            <Icon 
                name='heart-3'
                variant='fill' 
                size='small' />
        </Button>
    )
}