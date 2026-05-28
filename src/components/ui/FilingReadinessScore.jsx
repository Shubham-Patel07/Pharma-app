import React from 'react'
import { ReadinessScoreRing } from './ReadinessScore'

function SubScoreBar({ label, score, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-500">{label}</span>
        <span className="text-xs font-semibold text-slate-700">{score}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export function FilingReadinessScore({ fieldScore, documentScore, checklistScore, overallScore, isFilingReady }) {
  return (
    <div className="flex flex-col items-center gap-5">
      <ReadinessScoreRing score={overallScore} size="lg" />

      <div className="w-full space-y-3">
        <SubScoreBar label="Documents" score={documentScore} color="bg-brand-500" />
        <SubScoreBar label="Field Completeness" score={fieldScore} color="bg-violet-500" />
        <SubScoreBar label="Gate Checklist" score={checklistScore} color="bg-amber-400" />
      </div>

      <div className="text-center">
        {isFilingReady ? (
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm font-semibold text-emerald-700">Ready to File</p>
            <p className="text-xs text-emerald-600 mt-0.5">All requirements met</p>
          </div>
        ) : (
          <div className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm font-semibold text-amber-700">Not Ready to File</p>
            <p className="text-xs text-amber-600 mt-0.5">Complete all requirements below</p>
          </div>
        )}
      </div>
    </div>
  )
}
