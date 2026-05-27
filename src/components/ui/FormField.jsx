import React from 'react'

export function FormField({ label, required, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`form-control placeholder-slate-400 ${className}`}
    />
  )
}

export function Select({ children, className = '', ...props }) {
  return (
    <select
      {...props}
      className={`form-control ${className}`}
    >
      {children}
    </select>
  )
}
