import { useState, useEffect } from 'react'
//Styles
import './friendlist.scss'
//Components
import User from '../components/User'
import Addbutton from '../components/Addbutton'
import {  Link} from "react-router-dom";

export default function Friendlist({ setMsg, setStatus, status }) {
    const [list, setList] = useState([])
    useEffect(() => {
        async function getFriends() {
            const res = await fetch('http://localhost:5050/friends', { credentials: 'include' })
            const data = await res.text()
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
            <ul className='friend-list'>
                {list.map((friend) => (
                    <li className='friend-container' key={"li-" + friend.id}>
                        <User key={"friend-" + friend.id} id={friend.id} name={friend.name} />
                        <Link to={`/friends/lists/${friend.id}`}>Wiew Lists</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}