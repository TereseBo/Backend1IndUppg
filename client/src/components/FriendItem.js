
export default function FriendItem({item}) {
    return (
        <div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><span>created: </span>{item.created}</p>
            {item.completed === null ?
                (<div><p><span>Not completed </span> </p></div>)
                :
                (<div><p><span>completed: </span>{item.completed} </p> </div>)
            }
        </div>
    )
}