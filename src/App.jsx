import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import TasksAside from './components/TasksAside/TasksAside';
import TasksMain from './components/TasksMain/TasksMain';
import TasksAddTask from './pages/TasksAddTask';
import AsideLogo from './components/AsideLogo/AsideLogo';
import CategoriesMain from './components/CategoriesMain/CategoriesMain';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home/" element={<Home />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/tasks-aside" element={<TasksAside />} />
      <Route path="/tasks-main" element={<TasksMain />} />
      <Route path="/add-task" element={<TasksAddTask />} />
      <Route path="/aside-logo" element={<AsideLogo />} />
      <Route path="/categories" element={<CategoriesMain />} />

    </Routes>
  );
}

export default App;

