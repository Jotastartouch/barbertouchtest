
import React from 'react'
import { db, auth } from '../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import './util.css'

export default function Settings(){
  const [shop,setShop] = React.useState({ barbershopName:"", plan:"trial" })
  React.useEffect(()=>{
    (async()=>{
      const uid = auth.currentUser.uid
      const snap = await getDoc(doc(db,"tenants",uid))
      if(snap.exists()) setShop(snap.data())
    })()
  },[])

  const save = async ()=>{
    const uid = auth.currentUser.uid
    await setDoc(doc(db,"tenants",uid), shop, { merge:true })
    alert("Configurações salvas")
  }

  return (
    <div className="card grid gap-3 max-w-xl">
      <label className="text-sm text-gray-600">Nome da Barbearia</label>
      <input className="input" value={shop.barbershopName} onChange={e=>setShop(s=>({...s, barbershopName:e.target.value}))}/>
      <div className="text-sm text-gray-600 mt-2">Plano/Assinatura</div>
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full bg-black text-white text-sm">{shop.plan}</span>
        <button className="btn" onClick={()=>alert("Integre Stripe/Mercado Pago no backend e atualize o campo tenants/{uid}.plan='premium' após pagamento.")}>Gerenciar Assinatura</button>
      </div>
      <button className="btn mt-4 w-full" onClick={save}>Salvar</button>
    </div>
  )
}
