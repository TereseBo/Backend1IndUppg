import { useState, useEffect } from 'react'
import User from '../components/User'
import Addbutton from '../components/Addbutton'

export default function Friendlist({ setMsg, setStatus, status }) {
    const [list, setList] = useState([])
    useEffect(() => {
        async function getFriends() {
            const res = await fetch('http://localhost:5050/friends', { credentials: 'include' })
            const data = await res.text()
            console.log(data)
            console.log(res.status)
            switch (res.status) {
                case 200:
                    setList(JSON.parse(data))
                    setMsg('Friendlist loaded')
                    break;
                case 204:
                    setMsg("Nothing to return")
                    break;
                case 401:
                    setMsg(data)
                    setStatus(false)
                    break;
                default:
                    setMsg(data)
            }
        }

        getFriends()
    }, [status])



    return (

        <div>
            <ul>
                {list.map((friend) => (
                    <li key={"li-" + friend.id}>
                        <User key={"friend-" + friend.id} id={friend.id} name={friend.name} />
                    </li>
                ))}
            </ul>
        </div>
    )
}