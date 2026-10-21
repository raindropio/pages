import Button from '~co/button'
import { useFilterHref } from '~co/search/hooks'

export default function SearchTag({ _id, target }) {
    const href = useFilterHref('tags:'+_id)

    return (
        <Button 
            href={href}
            target={target}>
            #{_id}
        </Button>
    )
}