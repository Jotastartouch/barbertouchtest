
import React from 'react'
import { db, auth } from '../firebase'
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import './util.css'

export default function Schedule(){
  const [client,setClient]=React.useState("")
  const [service,setService]=React.useState("")
  const [staff,setStaff]=React.useState("")
  const [time,setTime]=React.useState("")
  const [list,setList]=React.useState([])
  const [clients,setClients]=React.useState([])
  const [services,setServices]=React.useState([])
  const [staffs,setStaffs]=React.useState([])

  React.useEffect(()=>{
    const uid = auth.currentUser.uid
    const col = collection(db,"tenants",uid,"appointments")
    const unsub = onSnapshot(col,(snap)=> setList(snap.docs.map(d=>({id:d.id,...d.data()}))))
    const unsub2 = onSnapshot(collection(db,"tenants",uid,"clients"),(s)=> setClients(s.docs.map(d=>({id:d.id,...d.data()}))))
    const unsub3 = onSnapshot(collection(db,"tenants",uid,"services"),(s)=> setServices(s.docs.map(d=>({id:d.id,...d.data()}))))
    const unsub4 = onSnapshot(collection(db,"tenants",uid,"staff"),(s)=> setStaffs(s.docs.map(d=>({id:d.id,...d.data()}))))
    return ()=>{unsub();unsub2();unsub3();unsub4();}
  },[])

  const add = async (e)=>{
    e.preventDefault()
    const uid = auth.currentUser.uid
    await addDoc(collection(db,"tenants",uid,"appointments"), {client, service, staff, time, status:"confirmado", createdAt: Date.now()})
    setClient(""); setService(""); setStaff(""); setTime("")
  }
  const del = async (id)=>{
    const uid = auth.currentUser.uid
    await deleteDoc(doc(db,"tenants",uid,"appointments",id))
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={add} className="card grid md:grid-cols-5 gap-2">
        <select className="input" value={client} onChange={e=>setClient(e.target.value)}>
          <option value="">Cliente</option>
          {clients.map(c=><option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <select className="input" value={service} onChange={e=>setService(e.target.value)}>
          <option value="">Serviço</option>
          {services.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
        <select className="input" value={staff} onChange={e=>setStaff(e.target.value)}>
          <option value="">Barbeiro</option>
          {staffs.map(s=><option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
        <input className="input" type="datetime-local" value={time} onChange={e=>setTime(e.target.value)}/>
        <button className="btn">Agendar</button>
      </form>

      <div className="grid gap-2">
        {list.map(a=>(
          <div key={a.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{a.client} • {a.service}</div>
              <div className="text-sm text-gray-500">{a.staff} • {new Date(a.time).toLocaleString()}</div>
            </div>
            <button onClick={()=>del(a.id)} className="text-red-600">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  )
}
