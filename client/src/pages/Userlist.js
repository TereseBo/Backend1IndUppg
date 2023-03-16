import { useState, useEffect } from 'react'
//Styles
import './userlist.scss'

//Components
import User from '../components/User'
import Addbutton from '../components/Addbutton'

export default function Userlist({ setMsg, setStatus, status }) {
    const [list, setList] = useState([])
    const [pgMsg, setPgMsg] = useState('')
    useEffect(() => {
        async function getUser() {
            const res = await fetch('http://localhost:5050/content/users', { credentials: 'include' })
            const data = await res.text()
            switch (res.status) {
                case 200:
                    setList(JSON.parse(data))
                    setMsg('')
                    setPgMsg('')
                    break;
                case 204:
                    setMsg('')
                    setPgMsg("No users found")
                    break;
                case 401:
                    setMsg(data)
                    setPgMsg('  ')
                    setStatus(false)
                    break;
                default:
                    setMsg('')
                    setPgMsg(data)
            }
        }

        getUser()
    }, [status])

    async function addFriend(e) {
        let res = await fetch('http://localhost:5050/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.id }),
            credentials: 'include'
        })
        const data = await res.text()
        switch (res.status) {

            case 401:
                setMsg(data)
                setPgMsg('')
                setStatus(false)
                break;
            default:
                setMsg('')
                setPgMsg(data)
        }
    }

    return (
        <div>
            {pgMsg==='' ? null : <p>{pgMsg}</p>}
            <ul className='user-list'>
                {list.map((friend) => (
                    <li className='user-container' key={"li-" + friend.id}>
                        <User key={"user-" + friend.id} id={friend.id} name={friend.name} />
                        <Addbutton id={friend.id} key={friend.id} callback={addFriend} text="Add friend" />
                    </li>
                ))}
            </ul>
        </div>
    )
}