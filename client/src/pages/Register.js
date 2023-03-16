import { useState } from "react";
import { Link } from 'react-router-dom';

//Components
import Msgbox from '../components/Msgbox';
export default function Register({ status, setStatus, msg, setMsg }) {
    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    })
    const [pgMsg, setPgMsg] = useState('')
    setMsg('')

    async function sendRegistration(e) {
        e.preventDefault();
        let res = await fetch('http://localhost:5050/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        })
        let data = await res.text()
        setMsg(data)
        if (res) {
            setPgMsg(data)
        }
    }

    function saveChange(e) {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }

    return (
        <div className='Register'>
            {status !== true ? (
                <div>
                    <form onChange={saveChange} onSubmit={sendRegistration}>
                        <h1>Register</h1>
                        <label htmlFor="name">Username</label>
                        <input type="text" name="name" id="name" />
                        <label htmlFor="password">Password</label>
                        <input type="current-password" name="password" id="password" />
                        <input type="submit" value="Login" />

                    </form>
                    <Msgbox msg={pgMsg}/>
                </div>
            ) : (
                <p>You are already logged in</p>
            )
            }
        </div>
    )
}