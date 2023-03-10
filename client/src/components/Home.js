import './Home.css';
import { useState } from "react";

//Components
import Login from './Login';

export default function Home({msg, setMsg, status, setStatus}) {
 
    return(
        <div className='Home'>
            <h1>Home</h1>
            <Login status={status} setStatus={setStatus} msg={msg} setMsg={setMsg}/>

        </div>
    )
}