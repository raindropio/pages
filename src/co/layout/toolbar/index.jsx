import s from './index.module.css'
import { Buttons } from '~co/button'

export default {
    Wrap: function({ className='', ...etc }) {
        return (
            <figure
                {...etc}
                className={s.toolbar+' '+className} />
        )
    },

    Title: function({ className='', ...etc }) {
        return (
            <figcaption
                {...etc}
                className={s.title+' '+className} />
        )
    },

    Buttons: function({ className='', ...etc }) {
        return (
            <Buttons
                {...etc}
                className={s.buttons+' '+className} />
        )
    }
}