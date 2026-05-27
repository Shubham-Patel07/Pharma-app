import React from 'react'

export function StatCard({ label, value, sub, colorClass = 'text-slate-900', bgClass = 'bg-white' }) {
  return (
    <div className={`${bgClass} rounded-xl border border-slate-200 shadow-sm px-6 py-5`}>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${colorClass}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </div>
  )
}
