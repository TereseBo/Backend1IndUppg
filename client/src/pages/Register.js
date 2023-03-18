import { useState } from "react";
import { Link } from 'react-router-dom';
//Style
import "./register.scss";
//Components
import Msgbox from '../components/Msgbox';

export default function Register({ status, setMsg }) {
    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    })
    const [pgMsg, setPgMsg] = useState('')
    

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
        if (res) {
            setPgMsg(data)
            e.target.reset()
        }
    }

    function saveChange(e) {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }

    return (
        
        <div className='register'>
            
            {status !== true ? (
                <div className="register-box">
                    <div className="registerform-container">
                        <h1>Register</h1>
                        <form className="register-form" onChange={saveChange} onSubmit={sendRegistration}>
                            <div>
                                <label htmlFor="name">Username</label>
                                <input type="text" name="name" id="name" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="current-password" name="password" id="password" />
                            </div>
                            <input type="submit" value="Register" />
                        </form>
                    </div>
                    <Msgbox msg={pgMsg} />
                </div>
            ) : (
                <Msgbox msg="You are already logged in" />
            )
            }
        </div>
    )
}