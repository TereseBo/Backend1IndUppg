import './Home.scss';
import { useState } from "react";

//Components
import Login from './Login';
import Menu from './Menu';

export default function Home({msg, setMsg, status, setStatus}) {
    return(
        <div className='Home'>
            <Login status={status} setStatus={setStatus} msg={msg} setMsg={setMsg}/>
            <Menu status={status} />
        </div>
    )
}