
import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [err,setErr] = React.useState("")
  const nav = useNavigate()
  const onSubmit = async (e)=>{
    e.preventDefault()
    setErr("")
    try{
      await signInWithEmailAndPassword(auth, email, password)
      nav("/")
    }catch(e){ setErr(e.message) }
  }
  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 p-4">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2">Entrar</h1>
        <p className="text-sm text-gray-500 mb-4">Use seu e-mail e senha</p>
        <input className="input" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="input mt-2" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-600 text-sm mt-2">{err}</div>}
        <button className="btn w-full mt-4">Entrar</button>
        <div className="text-sm mt-3">Não tem conta? <Link to="/register" className="text-blue-600">Criar</Link></div>
      </form>
    </div>
  )
}
