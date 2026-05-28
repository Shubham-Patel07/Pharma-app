import React from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon } from '../icons/HomeIcon'
import { AppsIcon } from '../icons/AppsIcon'
import { PlusIcon } from '../icons/PlusIcon'
import { FolderIcon } from '../icons/FolderIcon'
import { ChartIcon } from '../icons/ChartIcon'
import { GearIcon } from '../icons/GearIcon'

const NAV_ITEMS = [
  {
    section: 'Overview',
    items: [
      { to: '/', label: 'Dashboard', icon: HomeIcon, exact: true },
    ],
  },
  {
    section: 'Applications',
    items: [
      { to: '/applications', label: 'All Applications', icon: AppsIcon },
      { to: '/applications/new', label: 'New Application', icon: PlusIcon },
    ],
  },
  {
    section: 'Tools',
    items: [
      { to: '/documents', label: 'Document Library', icon: FolderIcon },
      { to: '/analytics', label: 'Analytics', icon: ChartIcon },
    ],
  },
  {
    section: 'Account',
    items: [
      { to: '/settings', label: 'Settings', icon: GearIcon },
    ],
  },
]

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">Rx</span>
          </div>
          <div>
            <span className="font-bold text-slate-900 text-base tracking-tight">RegIQ</span>
            <span className="block text-[10px] text-slate-400 -mt-0.5 font-medium uppercase tracking-widest">Regulatory Suite</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV_ITEMS.map(({ section, items }) => (
          <div key={section} className="mb-5">
            <p className="px-5 mb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              {section}
            </p>
            {items.map(({ to, label, icon: Icon, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-sm font-semibold shrink-0">
            SP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">Shubham Patel</p>
            <p className="text-xs text-slate-400 truncate">Regulatory Affairs Lead</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

