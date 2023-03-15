import { useState } from "react";

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
        if (res.status === 200) {//Add other codes
            setStatus(true)
        }
        let data = await res.text()
        setMsg(data)
    }

    function saveChange(e) {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }

    return (
        <div className='Login'>
            {status!==true?(
                <div>
                <form onChange={saveChange} onSubmit={sendLogin}>
                    <h1>Login</h1>
                    <label htmlFor="name">Username</label>
                    <input type="text" name="name" id="name" />
                    <label htmlFor="password">Password</label>
                    <input type="current-password" name="password" id="password" />
                    <input type="submit" value="Login" />
                </form>
                <p>{msg}</p>
                </div>
            ):(
                <p>{msg}</p>
            )
            }
        </div>
    )
}