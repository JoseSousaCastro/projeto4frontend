import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home/" element={<Home />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  );
}

export default App;

