import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter ,RouterProvider} from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import Register from './pages/Login/Register.jsx'
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx'
const router=createBrowserRouter([{
  path:'/',
  element:<HomePage/>,
  errorElement:<PageNotFound/>
},
{
  path:'/login',
  element:<LoginPage/>,
  errorElement:<PageNotFound/>
},
{
  path:'/register',
  element:<Register/>,
  errorElement:<PageNotFound/>
},
{
  
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
