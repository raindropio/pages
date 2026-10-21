import Button from '~co/button'
import { useFilterHref } from '~co/search/hooks'

export default function SearchTag({ _id }) {
    const href = useFilterHref('tags:'+_id)

    return (
        <Button
            href={href}>
            #{_id}
        </Button>
    )
}