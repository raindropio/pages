import s from './index.module.css'

export default function Content({ children }) {
    return (
        <main className={s.content}>
            {children}
        </main>
    )
}