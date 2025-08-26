
import React from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'

export default function Register(){
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [name,setName] = React.useState("")
  const [err,setErr] = React.useState("")
  const nav = useNavigate()
  const onSubmit = async (e)=>{
    e.preventDefault()
    setErr("")
    try{
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name })
      await setDoc(doc(db, "tenants", user.uid), {
        ownerUid: user.uid,
        barbershopName: "Minha Barbearia",
        plan: "trial",
        createdAt: Date.now()
      })
      nav("/")
    }catch(e){ setErr(e.message) }
  }
  return (
    <div className="min-h-screen grid place-items-center bg-gray-100 p-4">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-2xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2">Criar conta</h1>
        <input className="input" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input mt-2" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="input mt-2" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-600 text-sm mt-2">{err}</div>}
        <button className="btn w-full mt-4">Criar conta</button>
        <div className="text-sm mt-3">Já tem conta? <Link to="/login" className="text-blue-600">Entrar</Link></div>
      </form>
    </div>
  )
}
