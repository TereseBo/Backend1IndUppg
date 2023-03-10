import { useState, useEffect } from 'react'
import User from './User'

export default function Userlist({ setMsg, setStatus, status}){
    const [list, setList] = useState([])
    useEffect(() => {
    async function getUser(){
        const res = await fetch('http://localhost:5050/content/users',  {credentials: 'include'})
        const data = await res.text()
        if(res.status === 200){
            setList(JSON.parse(data))
        }else{
            setMsg(data)
            setStatus(false)
        }
    }
 
    getUser()
    }, [status])

    return(
        
        <div>
            {list.map((friend) => (
                <User key={friend.id} id={friend.id} name={friend.name} />
            ))}
        </div>
    )
}