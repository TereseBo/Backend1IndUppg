import { useState, useEffect } from 'react'
//Styles
import './userlist.scss'

//Components
import User from '../components/User'
import Addbutton from '../components/Addbutton'

export default function Userlist({ setMsg, setStatus, status }) {
    const [list, setList] = useState([])
    useEffect(() => {
        async function getUser() {
            const res = await fetch('http://localhost:5050/content/users', { credentials: 'include' })
            const data = await res.text()
            if (res.status === 200) {
                setList(JSON.parse(data))
                setMsg('Userlist loaded')
            } else {
                setMsg(data)
                setStatus(false)
            }
        }

        getUser()
    }, [status])

    async function addFriend(e) {
        console.log('addFriend')
        console.log(e.target.id)
        let res = await fetch('http://localhost:5050/friends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: e.target.id }),
            credentials: 'include'
        })
        if (res) {
            let data = await res.text()
            setMsg(data)
        }
    }

    return (
        <div>
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