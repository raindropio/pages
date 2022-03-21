import s from './index.module.css'

export default function RaindropsSingleHighlight({ className='', text, note, color }) {
    return (
        <div className={s.highlight+' '+className}>
            <div className={s.text} style={color != 'yellow' ? {'--highlight-color': color} : {}}>
                {text}
            </div>

            {note ? (
                <div className={s.note}>
                    {note}
                </div>
            ) : null}
        </div>
    )
}