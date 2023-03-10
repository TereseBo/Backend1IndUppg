export default function User({id, name}){
    return(
        <div>
            <h1 key={id} id={id}>{name}</h1>
        </div>
    )
}