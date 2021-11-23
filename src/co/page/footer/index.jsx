import s from './index.module.css'
import links from '~config/links'
import { Logo } from '~co/icon'
import Button from '~co/button'

export default function Footer() {
    return (
        <footer className={s.footer}>
            <Button 
                href={links.site.index}
                variant='flat'
                title='Raindrop.io'>
                <Logo />
            </Button>

            <a href={links.site.index} className={s.brand}>
                <span className={s.site}>Raindrop.io</span>
                <span className={s.desc}>All-in-one bookmark manager</span>
            </a>

            <Button href={links.app.index} variant='flat'>Create your own curated list</Button>
            <Button href={links.help.publicPage} variant='flat'>Help</Button>
        </footer>
    )
}