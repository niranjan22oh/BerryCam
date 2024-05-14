import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { Route, BrowserRouter as Router, RouterProvider, Routes, createBrowserRouter  } from 'react-router-dom'
import SideBar from './components/SideBar'
import HomePage from './pages/HomePage/HomePage'
import RegisterPage from './pages/Login/Register'
import AboutPage from './pages/Aboutus/AboutPage'
import ServicesPage from './pages/Services/ServicesPage'
import Attendance from './pages/Attendence_Monitor/Attendance'
const router=createBrowserRouter([{
  path:'/',
  element:<HomePage/>,
},
{
  path:'/signin',
  element:<RegisterPage/>
},
{
  path:'/attendance',
  element:<Attendance/>
},
{
  path:'/about',
  element:<AboutPage/>
},
{
  path:'/services',
  element:<ServicesPage/>
}])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router}/>
    </>
    
  )
}

export default App
