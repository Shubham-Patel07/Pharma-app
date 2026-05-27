import React from 'react'

export function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${onClick ? 'card-interactive' : 'card'} ${className}`}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b border-slate-100 ${className}`}>{children}</div>
}

export function CardBody({ children, className = '' }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}
