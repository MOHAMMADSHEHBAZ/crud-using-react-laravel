import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import CreateUser from './CreateUser.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path:"create-user/:rid",
    element: <CreateUser/>
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router}/>
  // </StrictMode>
  ,
)
