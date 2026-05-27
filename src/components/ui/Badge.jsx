import React from 'react'
import { STATUS_LABELS } from '../../data/mockData'

export function StatusBadge({ status }) {
  const { label, color } = STATUS_LABELS[status] ?? { label: status, color: 'bg-slate-100 text-slate-600' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

export function CategoryBadge({ category }) {
  const colors = {
    Quality: 'bg-violet-100 text-violet-700',
    Manufacturing: 'bg-sky-100 text-sky-700',
    Clinical: 'bg-rose-100 text-rose-700',
    Regulatory: 'bg-amber-100 text-amber-700',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors[category] ?? 'bg-slate-100 text-slate-600'}`}>
      {category}
    </span>
  )
}
