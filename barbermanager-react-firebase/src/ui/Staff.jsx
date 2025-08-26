
import React from 'react'
import { db, auth } from '../firebase'
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import './util.css'

export default function Staff(){
  const [name,setName] = React.useState("")
  const [phone,setPhone] = React.useState("")
  const [commission,setCommission] = React.useState("50")
  const [list,setList] = React.useState([])
  React.useEffect(()=>{
    const uid = auth.currentUser.uid
    const col = collection(db, "tenants", uid, "staff")
    return onSnapshot(col, (snap)=> setList(snap.docs.map(d=>({id:d.id, ...d.data()}))))
  },[])

  const add = async (e)=>{
    e.preventDefault()
    const uid = auth.currentUser.uid
    await addDoc(collection(db,"tenants",uid,"staff"), {name, phone, commission: parseInt(commission||0), createdAt: Date.now()})
    setName(""); setPhone(""); setCommission("50")
  }
  const del = async (id)=>{
    const uid = auth.currentUser.uid
    await deleteDoc(doc(db,"tenants",uid,"staff",id))
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={add} className="card grid md:grid-cols-4 gap-2">
        <input className="input" placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Telefone" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input className="input" placeholder="Comissão (%)" value={commission} onChange={e=>setCommission(e.target.value)} />
        <button className="btn">Adicionar</button>
      </form>
      <div className="grid gap-2">
        {list.map(s=> (
          <div key={s.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-500">{s.phone} • Comissão {s.commission}%</div>
            </div>
            <button onClick={()=>del(s.id)} className="text-red-600">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  )
}
