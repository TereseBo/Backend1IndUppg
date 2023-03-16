import { useState, useEffect } from 'react'
//Styles
import './friendlist.scss'
//Components
import User from '../components/User'
import Addbutton from '../components/Addbutton'
import {  Link} from "react-router-dom";
import Msgbox from '../components/Msgbox';

export default function Friendlist({ setMsg, setStatus, status }) {
    const [list, setList] = useState([])
    const [pgMsg, setPgMsg] = useState('')
    useEffect(() => {
        async function getFriends() {
            const res = await fetch('http://localhost:5050/friends', { credentials: 'include' })
            const data = await res.text()
            switch (res.status) {
                case 200:
                    setList(JSON.parse(data))
                    setPgMsg('')
                    break;
                case 204:
                    setPgMsg("No friends yet, add some!")
                    break;
                case 401:
                    setPgMsg('')
                    setMsg(data)
                    setStatus(false)
                    break;
                default:
                    setPgMsg(data)
            }
        }
        getFriends()
    }, [status])

    return (
        <div>
            {pgMsg===''?null:<Msgbox msg={pgMsg}/>}
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