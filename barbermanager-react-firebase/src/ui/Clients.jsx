
import React from 'react'
import { db, auth } from '../firebase'
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import './util.css'

export default function Clients(){
  const [name,setName] = React.useState("")
  const [phone,setPhone] = React.useState("")
  const [list,setList] = React.useState([])
  React.useEffect(()=>{
    const uid = auth.currentUser.uid
    const col = collection(db, "tenants", uid, "clients")
    const q = query(col, orderBy("createdAt","desc"))
    const unsub = onSnapshot(q, (snap)=>{
      setList(snap.docs.map(d=>({id:d.id, ...d.data()})))
    })
    return unsub
  },[])

  const add = async (e)=>{
    e.preventDefault()
    const uid = auth.currentUser.uid
    await addDoc(collection(db,"tenants",uid,"clients"), {name, phone, createdAt: Date.now()})
    setName(""); setPhone("")
  }
  const del = async (id)=>{
    const uid = auth.currentUser.uid
    await deleteDoc(doc(db, "tenants", uid, "clients", id))
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={add} className="card grid md:grid-cols-3 gap-2">
        <input className="input" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Telefone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <button className="btn">Adicionar</button>
      </form>
      <div className="grid gap-2">
        {list.map(c=> (
          <div key={c.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-500">{c.phone}</div>
            </div>
            <button onClick={()=>del(c.id)} className="text-red-600">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  )
}
