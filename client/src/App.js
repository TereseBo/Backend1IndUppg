import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

//Pages
import Home from './pages/Home';
import Index from './pages/Index';
import List from './pages/List';

function App() {
  return (
    
    <BrowserRouter>
    <header>

    </header>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/friends" element={<Index/>} />
      <Route path="/lists" element={<Index/>} />
      <Route path="/lists/:id" element={<List/>} />
      <Route path="/friends/:id" element={<Index/>} />
      <Route path="/friends/lists:id" element={<Index/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
