import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.css';

//Pages
import Home from './components/Home';
import Index from './pages/Index';
import List from './pages/List';
import Menu from './components/Menu';
import Userlist from './components/Userlist';

function App() {
  const [msg, setMsg] = useState('')
  const [status, setStatus] = useState(false)

  useEffect(() => {
    async function checkLogin() {
      let res = await fetch('http://localhost:5050/login')
      let data = await res.text()
      if (res.status === 200) {
        setStatus(true)
        setMsg(data)
      }
    }
    checkLogin()
  }, [])
  return (
    
    <BrowserRouter>
    <header>
      <Home msg={msg} setMsg={setMsg} status={status} setStatus={setStatus} />
<Link to='/'>Home menu</Link>
    </header>
    <Routes>
<Route path="/" element={<Menu/>} />
      <Route path="/friends" element={<Index/>} />
      <Route path="/friends/new" element={<Userlist status={status} setStatus={setStatus} setMsg={setMsg}/>} />
      <Route path="/lists" element={<Index/>} />
      <Route path="/lists/new" element={<List/>} />
      <Route path="/lists/:id" element={<List/>} />
      <Route path="/friends/:id" element={<Index/>} />
      <Route path="/friends/lists:id" element={<Index/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
