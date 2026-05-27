import React from 'react'

const dotColor = {
  approve: 'bg-emerald-500',
  reject: 'bg-red-500',
  submit: 'bg-blue-500',
}

function buildEvents(app) {
  return [
    { date: app.createdAt, label: 'Application Created', desc: 'Draft filing initiated', icon: 'create' },
    { date: app.updatedAt, label: 'Last Updated', desc: 'Documents or details modified', icon: 'edit' },
    ...(app.status === 'submitted' || app.status === 'approved' || app.status === 'rejected'
      ? [{ date: '2026-01-10', label: 'Submitted to Regulator', desc: `Submitted to ${app.targetMarket}`, icon: 'submit' }]
      : []),
    ...(app.status === 'approved'
      ? [{ date: app.updatedAt, label: 'Application Approved', desc: 'Regulatory approval granted', icon: 'approve' }]
      : []),
    ...(app.status === 'rejected'
      ? [{ date: app.updatedAt, label: 'Application Rejected', desc: 'Deficiency letter issued', icon: 'reject' }]
      : []),
  ]
}

export function ApplicationTimeline({ app }) {
  const events = buildEvents(app)

  return (
    <div className="max-w-xl">
      <h2 className="section-heading mb-6">Application Timeline</h2>
      <ol className="relative border-l border-slate-200 space-y-8 ml-3">
        {events.map((ev, i) => (
          <li key={i} className="ml-6">
            <div className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${dotColor[ev.icon] ?? 'bg-brand-500'}`}>
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
            <p className="text-xs text-slate-400 mb-0.5">{ev.date}</p>
            <p className="text-sm font-semibold text-slate-800">{ev.label}</p>
            <p className="text-xs text-slate-500">{ev.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
