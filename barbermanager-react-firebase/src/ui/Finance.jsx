
import React from 'react'
import { db, auth } from '../firebase'
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import './util.css'

export default function Finance(){
  const [desc,setDesc]=React.useState("")
  const [amount,setAmount]=React.useState("")
  const [type,setType]=React.useState("entrada")
  const [list,setList]=React.useState([])

  React.useEffect(()=>{
    const uid = auth.currentUser.uid
    const col = collection(db,"tenants",uid,"transactions")
    return onSnapshot(col,(snap)=> setList(snap.docs.map(d=>({id:d.id,...d.data()}))))
  },[])

  const add = async (e)=>{
    e.preventDefault()
    const uid = auth.currentUser.uid
    await addDoc(collection(db,"tenants",uid,"transactions"), {desc, amount: parseFloat(amount||0)*(type==="saida"?-1:1), type, createdAt: Date.now()})
    setDesc(""); setAmount(""); setType("entrada")
  }
  const del = async (id)=>{
    const uid = auth.currentUser.uid
    await deleteDoc(doc(db,"tenants",uid,"transactions",id))
  }

  const total = list.reduce((s,x)=> s + (x.amount||0), 0)

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="text-sm text-gray-500">Saldo do Dia</div>
        <div className={"text-3xl font-bold " + (total>=0 ? "text-green-600":"text-red-600")}>R$ {total.toFixed(2)}</div>
      </div>

      <form onSubmit={add} className="card grid md:grid-cols-4 gap-2">
        <input className="input" placeholder="Descrição" value={desc} onChange={e=>setDesc(e.target.value)} />
        <input className="input" placeholder="Valor" value={amount} onChange={e=>setAmount(e.target.value)} />
        <select className="input" value={type} onChange={e=>setType(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <button className="btn">Lançar</button>
      </form>

      <div className="grid gap-2">
        {list.map(t=>(
          <div key={t.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{t.desc}</div>
              <div className="text-sm text-gray-500">{t.type} • R$ {t.amount.toFixed(2)}</div>
            </div>
            <button onClick={()=>del(t.id)} className="text-red-600">Excluir</button>
          </div>
        ))}
      </div>
    </div>
  )
}
