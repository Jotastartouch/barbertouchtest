
import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function App(){
  const navigate = useNavigate()
  React.useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{
      if(!u) navigate("/login")
    })
    return unsub
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-60 bg-black text-white hidden md:block">
        <div className="p-4 font-bold tracking-wide">BarberManager</div>
        <nav className="px-2 space-y-1">
          <Nav to="/" icon="🏠" label="Dashboard"/>
          <Nav to="/clientes" icon="👥" label="Clientes"/>
          <Nav to="/agenda" icon="🗓️" label="Agendamentos"/>
          <Nav to="/servicos" icon="✂️" label="Serviços"/>
          <Nav to="/colaboradores" icon="🧑‍💼" label="Colaboradores"/>
          <Nav to="/financeiro" icon="💰" label="Financeiro"/>
          <Nav to="/relatorios" icon="📈" label="Relatórios"/>
          <Nav to="/configuracoes" icon="⚙️" label="Configurações"/>
        </nav>
        <div className="p-2">
          <button onClick={()=>signOut(auth)} className="w-full mt-4 bg-red-600 hover:bg-red-700 rounded-xl py-2">Sair</button>
        </div>
      </aside>
      <main className="flex-1">
        <Header/>
        <div className="p-4 max-w-5xl mx-auto">
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

function Nav({to, icon, label}){
  return (
    <NavLink to={to} end className={({isActive})=>
      "flex items-center gap-2 px-3 py-2 rounded-lg " + (isActive ? "bg-white text-black" : "hover:bg-white/10")
    }>
      <span>{icon}</span><span>{label}</span>
    </NavLink>
  )
}

function Header(){
  return (
    <div className="sticky top-0 bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="font-semibold">Painel</div>
      </div>
    </div>
  )
}
