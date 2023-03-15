import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.css';

//Components
import Home from './components/Home';
//Pages
import Index from './pages/Index';
import Listlist from './pages/Listlist';
import Menu from './pages/Menu';
import Userlist from './pages/Userlist';
import Friendlist from './pages/Friendlist';
import FriendsLists from './pages/FriendsLists';

function App() {
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState(false)

  useEffect(() => {
    async function checkLogin() {
      let res = await fetch('http://localhost:5050/login', { credentials: 'include' })
      let data = await res.text()
      if (res.status === 200) {
        setStatus(true)
        setMsg(data)
      } else {
        setStatus(false)
        setMsg(data)
      }
    }
    checkLogin()
  }, [])
  return (

    <BrowserRouter>
      <header>
        <Home msg={msg} setMsg={setMsg} status={status} setStatus={setStatus} />
        {/*<Link to='/'>Home menu</Link>*/}
      </header>
      <Routes>
       {/* <Route path="/" element={<Menu status={status} msg={msg} setMsg={setMsg} />} />*/}
        <Route path="/friends" element={<Friendlist status={status} setStatus={setStatus} setMsg={setMsg} />} />
        <Route path="/friends/new" element={<Userlist status={status} setStatus={setStatus} setMsg={setMsg} />} />
        <Route path="/lists" element={<Listlist status={status} setStatus={setStatus} setMsg={setMsg} />} />
        <Route path="/friends/lists/:id" element={<FriendsLists status={status} setStatus={setStatus} setMsg={setMsg} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
