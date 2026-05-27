import React from 'react'

export function QuickAction({ icon, title, desc, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card px-5 py-4 text-left hover:shadow-md hover:border-brand-200 transition-all flex items-start gap-4"
    >
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-800 text-sm">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
      </div>
    </button>
  )
}
