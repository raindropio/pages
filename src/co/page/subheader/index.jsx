import s from './index.module.css'

export default function Subheader({ children }) {
    return (
        <aside className={s.subheader} data-is-subheader>
            {children}
        </aside>
    )
}