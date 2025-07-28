import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Screens/Home'
import Signup from './Screens/Signup'
import Login from './Screens/Login'
import Dashboard from './Screens/Dashboard'
import Overview from './Screens/Overview'
import NewTask from './Screens/NewTask'
import AllTasks from './Screens/AllTasks'
import EditTask from './Screens/EditTask'
import ProtectedRoute from './components/auth/ProtectedRoute'
import UserRoute from './components/auth/UserRoute'

const App = () => {
  return (
  
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<UserRoute><Login/></UserRoute>}/>
      <Route path='/signup' element={<UserRoute><Signup/></UserRoute>}/>
      
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
      <Route path='overview' index element={<Overview/>}/>
      <Route path='new-task' element={<NewTask/>}/>
      <Route path='all-tasks' element={<AllTasks/>}/>
      <Route path='edit-task/:id' element={<EditTask/>}/>
      </Route>
    </Routes>

  )
}

export default App