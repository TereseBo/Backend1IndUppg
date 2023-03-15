


export default function Addbutton({ id, callback, text}){
    return(
        <div>
            <button id= {id} onClick={(e) => callback(e)}>{text}</button>
        </div>
    )
}