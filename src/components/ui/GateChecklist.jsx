import React from 'react'
import { DMLA_CHECKLIST_ITEMS } from '../../data/dmlaData'

export function GateChecklist({ dmlaChecklist = [], onChange }) {
  const itemMap = Object.fromEntries(dmlaChecklist.map((i) => [i.itemId, i.checked]))
  const categories = [...new Set(DMLA_CHECKLIST_ITEMS.map((i) => i.category))]
  const allPassed = DMLA_CHECKLIST_ITEMS.every((i) => itemMap[i.id])

  return (
    <div className="space-y-5">
      {!allPassed && (
        <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <span className="shrink-0 mt-0.5">⚠</span>
          <p>One or more gate items are incomplete. All items must be confirmed before filing.</p>
        </div>
      )}

      {categories.map((cat) => {
        const items = DMLA_CHECKLIST_ITEMS.filter((i) => i.category === cat)
        return (
          <div key={cat}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{cat}</p>
            <div className="space-y-2">
              {items.map((item) => {
                const checked = itemMap[item.id] ?? false
                return (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                      checked ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onChange?.(item.id, !checked)}
                      className="mt-0.5 w-4 h-4 rounded accent-brand-600 shrink-0"
                    />
                    <span className={`text-sm ${checked ? 'text-slate-700' : 'text-slate-600'}`}>
                      {item.label}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
