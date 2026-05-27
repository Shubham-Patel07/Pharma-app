import React from 'react'
import { SearchIcon } from '../icons/SearchIcon'
import { STATUS_LABELS } from '../../data/mockData'

const FILTER_OPTIONS = ['all', 'draft', 'in_review', 'submitted', 'approved', 'rejected']

export function SearchFilter({ search, onSearchChange, filter, onFilterChange }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-60">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by product or manufacturer…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="form-control pl-9"
        />
      </div>
      <div className="flex items-center gap-1.5">
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-brand-600 text-white'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f === 'all' ? 'All' : STATUS_LABELS[f]?.label ?? f}
          </button>
        ))}
      </div>
    </div>
  )
}
