
import React from 'react'
import { db, auth } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Reports(){
  const [summary,setSummary] = React.useState({ revenue:0, expenses:0 })
  React.useEffect(()=>{
    const uid = auth.currentUser.uid
    return onSnapshot(collection(db,"tenants",uid,"transactions"), (snap)=>{
      let rev=0, exp=0
      snap.forEach(d=>{
        const amt = d.data().amount||0
        if(amt>=0) rev += amt; else exp += Math.abs(amt)
      })
      setSummary({revenue:rev, expenses:exp})
    })
  },[])
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <div className="text-sm text-gray-500">Receita</div>
        <div className="text-3xl font-bold text-green-600">R$ {summary.revenue.toFixed(2)}</div>
      </div>
      <div className="card">
        <div className="text-sm text-gray-500">Despesas</div>
        <div className="text-3xl font-bold text-red-600">R$ {summary.expenses.toFixed(2)}</div>
      </div>
    </div>
  )
}
