import './addbutton.scss'

export default function Addbutton({ id, callback, text}){
    return(
        <div className='addbutton-box'>
            <button id= {id} onClick={(e) => callback(e)}>{text}</button>
        </div>
    )
}