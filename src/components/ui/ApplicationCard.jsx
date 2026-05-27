import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody } from './Card'
import { StatusBadge } from './Badge'
import { ReadinessScoreRing } from './ReadinessScore'

export function ApplicationCard({ app }) {
  const navigate = useNavigate()
  return (
    <Card onClick={() => navigate(`/applications/${app.id}`)}>
      <CardBody className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-slate-900 text-base leading-tight truncate">{app.productName}</h3>
            <StatusBadge status={app.status} />
          </div>
          <div className="space-y-1.5 mt-3">
            <DetailRow label="Dosage Form" value={app.dosageForm} />
            <DetailRow label="Strength" value={app.strength} />
            <DetailRow label="Manufacturer" value={app.manufacturerName} />
            <DetailRow label="Target Market" value={app.targetMarket} />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">{app.submissionType} · Updated {app.updatedAt}</span>
          </div>
        </div>
        <div className="shrink-0 pt-1">
          <ReadinessScoreRing score={app.readinessScore} size="md" />
        </div>
      </CardBody>
    </Card>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 w-28 shrink-0">{label}</span>
      <span className="text-xs text-slate-700 font-medium truncate">{value}</span>
    </div>
  )
}
