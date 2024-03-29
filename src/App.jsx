import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';
import TasksAddTask from './pages/TasksAddTask';
import TasksDeleted from './pages/TasksDeleted';
import TasksCategories from './pages/TasksCategories';
import TasksEditTask from './pages/TasksEditTask';
import RegisterUserPage from './pages/RegisterUserPage';
import UsersDeleted from './pages/UsersDeleted';
import UsersEditUser from './pages/UsersEditUser';
import UsersList from './pages/UsersList';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home/" element={<Home />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/add-task" element={<TasksAddTask />} />
      <Route path="/tasks-deleted" element={<TasksDeleted />} />
      <Route path="/tasks-categories" element={<TasksCategories />} />
      <Route path="/edit-task/:taskId" element={<TasksEditTask />} />
      <Route path="/register-user" element={<RegisterUserPage />} />
      <Route path="/deleted-users" element={<UsersDeleted />} />
      <Route path="/edit-user/:username" element={<UsersEditUser />} />
      <Route path="/users-list" element={<UsersList />} />
    </Routes>
  );
}

export default App;

