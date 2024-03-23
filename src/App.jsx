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
import DeletedTasks from './components/DeletedTasks/DeletedTasks';
import TasksDeleted from './pages/TasksDeleted';
import CategoriesAside from './components/CategoriesAside/CategoriesAside';
import TasksCategories from './pages/TasksCategories';
import TasksEditTask from './pages/TasksEditTask';


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
      <Route path="/deleted-tasks" element={<DeletedTasks />} />
      <Route path="/tasks-deleted" element={<TasksDeleted />} />
      <Route path="/categories-aside" element={<CategoriesAside />} />
      <Route path="/tasks-categories" element={<TasksCategories />} />
      <Route path="/edit-task/:taskId" element={<TasksEditTask />} />
    </Routes>
  );
}

export default App;

