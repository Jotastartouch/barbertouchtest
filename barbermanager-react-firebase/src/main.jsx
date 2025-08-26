
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './ui/App.jsx'
import Login from './ui/Login.jsx'
import Register from './ui/Register.jsx'
import Dashboard from './ui/Dashboard.jsx'
import Clients from './ui/Clients.jsx'
import Services from './ui/Services.jsx'
import Staff from './ui/Staff.jsx'
import Schedule from './ui/Schedule.jsx'
import Finance from './ui/Finance.jsx'
import Reports from './ui/Reports.jsx'
import Settings from './ui/Settings.jsx'

const router = createBrowserRouter([
  { path: "/login", element: <Login/> },
  { path: "/register", element: <Register/> },
  {
    path: "/",
    element: <App/>,
    children: [
      { index: true, element: <Dashboard/> },
      { path: "clientes", element: <Clients/> },
      { path: "servicos", element: <Services/> },
      { path: "colaboradores", element: <Staff/> },
      { path: "agenda", element: <Schedule/> },
      { path: "financeiro", element: <Finance/> },
      { path: "relatorios", element: <Reports/> },
      { path: "configuracoes", element: <Settings/> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
