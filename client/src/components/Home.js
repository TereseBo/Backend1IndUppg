import './Home.scss';
import { useState } from "react";

//Components
import Login from './Login';
import Menu from '../pages/Menu';

export default function Home({msg, setMsg, status, setStatus}) {
    return(
        <div className='Home'>
            <h1>Home</h1>
            <Login status={status} setStatus={setStatus} msg={msg} setMsg={setMsg}/>
            <Menu status={status} />
        </div>
    )
}