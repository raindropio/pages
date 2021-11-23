import Button from '~co/button'
import { useFilterHref } from '~co/search/hooks'

export default function SearchTag({ _id }) {
    const href = useFilterHref('#'+_id)

    return (
        <Button
            href={href}
            data-prefetch={false}>
            #{_id}
        </Button>
    )
}