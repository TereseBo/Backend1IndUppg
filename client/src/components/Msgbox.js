import './msgbox.scss'

export default function Msgbox({ msg }) {

    if (msg === '' || msg === undefined) {
        return null
    }
    else {
        return (
            <div className='msgbox'>
                <p>{msg}</p>
            </div>
        )
    }
}
