import s from './index.module.css'
import { ReactComponent as BrandIcon } from '~assets/brand/icon_48.svg'
import { THUMBNAILS_ENDPOINT } from '~config/api'
import remixIconSymbolUrl from '~assets/remixicon.symbol.svg?url'

function Base({ as='svg', size, className='', ...etc }) {
    const Component = as

    return (
        <Component 
            {...etc}
            data-size={size||'regular'}
            className={s.icon+' '+className} />
    )
}

export default function Icon({ name, variant='line', ...etc }) {
    return (
        <Base {...etc} as='svg'>
            <use xlinkHref={`${remixIconSymbolUrl}#ri-${name}${variant ? '-'+variant : ''}`}></use>
        </Base>
    )
}

export function Logo(props) {
    return (
        <Base 
            {...props}
            as={BrandIcon} />
    )
}

//Image
const widths = {
    small: 18,
    regular: 24,
    large: 32,
    xlarge: 64,
}

export function Image({ src, ...etc }) {
    const width = widths[etc.size]||widths.regular

    return (
        <Base
            {...etc}
            key={src}
            src={`${THUMBNAILS_ENDPOINT}?url=${encodeURIComponent(src)}&mode=crop&width=${width}&height=${width}&dpr=2`}
            loading='lazy'
            decoding='async'
            as='img' />
    )
}

export function Avatar(props) {
    return (
        <span className={s.avatar}>
            <Image {...props} />
        </span>
    )
}

function Indicator({ className='', ...props }) {
    return (
        <span 
            {...props}
            className={s.activityIndicator+' '+className}>
            <svg viewBox='0 0 20 20' className={s.main}>
				<g stroke='none' strokeWidth='1' fillRule='evenodd'>
					<path d='M10,2 C10.5522847,2 11,2.44771525 11,3 L11,5 C11,5.55228475 10.5522847,6 10,6 C9.44771525,6 9,5.55228475 9,5 L9,3 C9,2.44771525 9.44771525,2 10,2 Z' fillRule='nonzero'></path>
				</g>
			</svg>

			<svg viewBox='0 0 20 20' className={s.bg}>
				<g stroke='none' strokeWidth='1' fillRule='evenodd'>
					<path d='M10,2 C10.5522847,2 11,2.44771525 11,3 L11,5 C11,5.55228475 10.5522847,6 10,6 C9.44771525,6 9,5.55228475 9,5 L9,3 C9,2.44771525 9.44771525,2 10,2 Z' fillRule='nonzero'></path>
					<path d='M10,14 C10.5522847,14 11,14.4477153 11,15 L11,17 C11,17.5522847 10.5522847,18 10,18 C9.44771525,18 9,17.5522847 9,17 L9,15 C9,14.4477153 9.44771525,14 10,14 Z' fillRule='nonzero'></path>
					<path d='M5,9 C5.55228475,9 6,9.44771525 6,10 C6,10.5522847 5.55228475,11 5,11 L3,11 C2.44771525,11 2,10.5522847 2,10 C2,9.44771525 2.44771525,9 3,9 L5,9 Z' fillRule='nonzero'></path>
					<path d='M17,9 C17.5522847,9 18,9.44771525 18,10 C18,10.5522847 17.5522847,11 17,11 L15,11 C14.4477153,11 14,10.5522847 14,10 C14,9.44771525 14.4477153,9 15,9 L17,9 Z' fillRule='nonzero'></path>
					<path d='M4.29289322,4.29289322 C4.65337718,3.93240926 5.22060824,3.90467972 5.61289944,4.20970461 L5.70710678,4.29289322 L7.20710678,5.79289322 C7.59763107,6.18341751 7.59763107,6.81658249 7.20710678,7.20710678 C6.84662282,7.56759074 6.27939176,7.59532028 5.88710056,7.29029539 L5.79289322,7.20710678 L4.29289322,5.70710678 C3.90236893,5.31658249 3.90236893,4.68341751 4.29289322,4.29289322 Z' fillRule='nonzero'></path>
					<path d='M15.7071068,4.29289322 C15.3466228,3.93240926 14.7793918,3.90467972 14.3871006,4.20970461 L14.2928932,4.29289322 L12.7928932,5.79289322 C12.4023689,6.18341751 12.4023689,6.81658249 12.7928932,7.20710678 C13.1533772,7.56759074 13.7206082,7.59532028 14.1128994,7.29029539 L14.2071068,7.20710678 L15.7071068,5.70710678 C16.0976311,5.31658249 16.0976311,4.68341751 15.7071068,4.29289322 Z' fillRule='nonzero'></path>
					<path d='M4.29289322,15.7071068 C4.65337718,16.0675907 5.22060824,16.0953203 5.61289944,15.7902954 L5.70710678,15.7071068 L7.20710678,14.2071068 C7.59763107,13.8165825 7.59763107,13.1834175 7.20710678,12.7928932 C6.84662282,12.4324093 6.27939176,12.4046797 5.88710056,12.7097046 L5.79289322,12.7928932 L4.29289322,14.2928932 C3.90236893,14.6834175 3.90236893,15.3165825 4.29289322,15.7071068 Z' fillRule='nonzero'></path>
					<path d='M15.7071068,15.7071068 C15.3466228,16.0675907 14.7793918,16.0953203 14.3871006,15.7902954 L14.2928932,15.7071068 L12.7928932,14.2071068 C12.4023689,13.8165825 12.4023689,13.1834175 12.7928932,12.7928932 C13.1533772,12.4324093 13.7206082,12.4046797 14.1128994,12.7097046 L14.2071068,12.7928932 L15.7071068,14.2928932 C16.0976311,14.6834175 16.0976311,15.3165825 15.7071068,15.7071068 Z' fillRule='nonzero'></path>
				</g>
			</svg>
        </span>
    )
}

export function ActivityIndicator(props) {
    return (
        <Base
            {...props}
            as={Indicator} />
    )
}