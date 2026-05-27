import React from 'react'
import { InfoIcon } from '../icons/InfoIcon'

export function InfoBanner({ children }) {
  return (
    <div className="flex gap-3 px-4 py-3.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700">
      <InfoIcon className="w-5 h-5 shrink-0 mt-0.5" />
      <p>{children}</p>
    </div>
  )
}
