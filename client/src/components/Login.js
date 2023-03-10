import { useState } from "react";

export default function Login() {

    const [credentials, setCredentials] = useState({
        name: '',
        password: ''
    })
async function sendLogin(e) {
    e.preventDefault();
    console.log(credentials)
    let res= await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    let data = await res.text()
    console.log(data)
    if(res.ok) {
        console.log('Logged in')
    }
}

function saveChange(e) {
    setCredentials({
        ...credentials, [e.target.name]: e.target.value
    })
}

    return (
        <div className='Login'>
            <form onChange={saveChange} onSubmit={sendLogin}>
            <h1>Login</h1>
            <label htmlFor="name">Username</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="password">Password</label>
            <input type="current-password" name="password" id="password" />
            <input type="submit" value="Login" />
            </form>
        </div>
    )
}