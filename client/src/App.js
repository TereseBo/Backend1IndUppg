import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
//Styles
import './app.scss';
//Components
import Header from './components/Header';
//Pages
import Friendlist from './pages/Friendlist';
import FriendsLists from './pages/FriendsLists';
import Listlist from './pages/Listlist';
import Register from './pages/Register';
import Userlist from './pages/Userlist';

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
    <div className='App'>
      <BrowserRouter>
        <header>
          <Header msg={msg} setMsg={setMsg} status={status} setStatus={setStatus} />
        </header>

        <Routes>
          <Route path="/" element={<Listlist status={status} setStatus={setStatus} setMsg={setMsg} />} />
          <Route path="/friends" element={<Friendlist status={status} setStatus={setStatus} setMsg={setMsg} />} />
          <Route path="/friends/new" element={<Userlist status={status} setStatus={setStatus} setMsg={setMsg} />} />
          <Route path="/friends/lists/:id" element={<FriendsLists status={status} setStatus={setStatus} setMsg={setMsg} />} />
          <Route path="/lists" element={<Listlist status={status} setStatus={setStatus} setMsg={setMsg} />} />
          <Route path="/register" element={<Register status={status} msg={msg} setMsg={setMsg} />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
