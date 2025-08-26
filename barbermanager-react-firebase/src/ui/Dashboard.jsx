
import React from 'react'
import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { db, auth } from '../firebase'
import './util.css'

export default function Dashboard(){
  const [stats,setStats] = React.useState(null)
  React.useEffect(()=>{
    (async ()=>{
      const uid = auth.currentUser?.uid
      if(!uid) return
      const c1 = await getCountFromServer(collection(db, "tenants", uid, "clients"))
      const c2 = await getCountFromServer(collection(db, "tenants", uid, "appointments"))
      const c3 = await getCountFromServer(collection(db, "tenants", uid, "services"))
      setStats({ clients: c1.data().count, appts: c2.data().count, services: c3.data().count })
    })()
  },[])

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Stat title="Clientes" value={stats?.clients ?? "..."} />
      <Stat title="Agendamentos" value={stats?.appts ?? "..."} />
      <Stat title="Serviços" value={stats?.services ?? "..."} />
    </div>
  )
}

function Stat({title, value}){
  return (
    <div className="card text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
    </div>
  )
}
