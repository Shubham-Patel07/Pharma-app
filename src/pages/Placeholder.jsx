import React from 'react'
import { TopBar } from '../components/layout/TopBar'

export function Placeholder({ title, subtitle }) {
  return (
    <div className="flex flex-col flex-1">
      <TopBar title={title} subtitle={subtitle} />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚧</span>
          </div>
          <p className="text-slate-600 font-medium">{title}</p>
          <p className="text-slate-400 text-sm mt-1">This page is coming soon.</p>
        </div>
      </main>
    </div>
  )
}
