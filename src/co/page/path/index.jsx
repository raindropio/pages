import s from './index.module.css'
import last from 'lodash-es/last'
import Info from '~co/layout/info'
import Button from '~co/button'
import Icon from '~co/icon'

export default {
    Wrap: function({ children }) {
        const backHref = (last(children) || {}).props?.href || ''

        return (
            <nav className={s.path}>
                <Button
                    className={s.back}
                    href={backHref}
                    size='small'
                    variant='ghost'
                    title='Go back'>
                    <Icon 
                        name='arrow-left-s'
                        size='small' />
                </Button>

                <Info 
                    className={s.content}
                    divider='/'>
                    {children}
                </Info>
            </nav>
        )
    },

    Part: function(props) {
        return (
            <Button
                {...props}
                prefetch={false}
                variant='flat'
                size='small' />
        )
    }
}