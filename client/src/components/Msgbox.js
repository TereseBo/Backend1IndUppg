import './msgbox.scss'

export default function Msgbox({msg}) {
    return (
        <div className='msgbox'>
            <p>{msg}</p>
        </div>
    )
}