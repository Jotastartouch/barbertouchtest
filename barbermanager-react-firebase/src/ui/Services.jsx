
import React from 'react'
import { db, auth } from '../firebase'
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import './util.css'

export default function Services(){
  const [name,setName] = React.useState("")
  const [price,setPrice] = React.useState("")
  const [duration,setDuration] = React.useState("30")
  const [list,setList] = React.useState([])
  React.useEffect(()=>{
    const uid = auth.currentUser.uid
    const col = collection(db, "tenants", uid, "services")
    return onSnapshot(col, (snap)=> setList(snap.docs.map(d=>({id:d.id, ...d.data()}))))
  },[])

  const add = async (e)=>{
    e.preventDefault()
    const uid = auth.currentUser.uid
    await addDoc(collection(db,"tenants",uid,"services"), {name, price: parseFloat(price||0), duration: parseInt(duration||0), createdAt: Date.now()})
    setName(""); setPrice(""); setDuration("30")
  }
  const del = async (id)=>{
    const uid = auth.currentUser.uid
    await deleteDoc(doc(db,"tenants",uid,"services",id))
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={add} className="card grid md:grid-cols-4 gap-2">
        <input className="input" placeholder="Serviço" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Preço (R$)" value={price} onChange={e=>setPrice(e.target.value)} />
        <input className="input" placeholder="Duração (min)" value={duration} onChange={e=>setDuration(e.target.value)} />
        <button className="btn">Adicionar</button>
      </form>
      <div className="grid gap-2">
        {list.map(s=> (
          <div key={s.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-500">R$ {s.price?.toFixed(2)} • {s.duration}min</div>
            </div>
            <button onClick={()=>del(s.id)} className="text-red-600">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  )
}
