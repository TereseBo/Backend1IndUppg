import { useState } from "react";
import { Link } from 'react-router-dom';
//Style
import "./login.scss";
//Components
import Msgbox from './Msgbox';

export default function Login({ status, setStatus, msg, setMsg }) {
    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    })

    async function sendLogin(e) {
        e.preventDefault();
        let res = await fetch('http://localhost:5050/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        })
        let data = await res.text()
        switch (res.status) {
            case 200:
                setStatus(true)
                setMsg(data)
                break;
            default:
                setStatus(false)
                setMsg(data)
                break;
        }
    }

    function saveChange(e) {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }

    return (
        <div className="login" >
            {status !== true ? (
                <div className='login-box'>
                    <div className="loginform-container">
                        <h1>Login</h1>
                        <form className="login-form" onChange={saveChange} onSubmit={sendLogin}>
                            <div>
                                <label htmlFor="name">Username</label>
                                <input type="text" name="name" id="name" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="current-password" name="password" id="password" />
                            </div>
                            <input type="submit" value="Login" />
                        </form>
                        <Link to='/register'>Register</Link>
                    </div>
                    <Msgbox msg={msg} />
                </div>
            ) : (
                <Msgbox msg={msg} />
            )}
        </div>
    )
}