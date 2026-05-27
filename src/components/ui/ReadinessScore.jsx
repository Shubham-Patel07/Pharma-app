import React from 'react'

function getScoreColor(score) {
  if (score >= 80) return { ring: 'text-emerald-500', bg: 'bg-emerald-500', text: 'text-emerald-600' }
  if (score >= 50) return { ring: 'text-amber-500', bg: 'bg-amber-500', text: 'text-amber-600' }
  return { ring: 'text-red-500', bg: 'bg-red-500', text: 'text-red-600' }
}

export function ReadinessScoreRing({ score, size = 'md' }) {
  const { ring, text } = getScoreColor(score)
  const radius = size === 'lg' ? 36 : 24
  const stroke = size === 'lg' ? 5 : 4
  const svgSize = (radius + stroke) * 2
  const circumference = 2 * Math.PI * radius
  const progress = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative inline-flex items-center justify-center">
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-slate-200"
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            className={`${ring} transition-all duration-700`}
          />
        </svg>
        <span className={`absolute text-${size === 'lg' ? 'lg' : 'sm'} font-bold ${text}`}>
          {score}
        </span>
      </div>
      {size === 'lg' && <span className="text-xs text-slate-500 font-medium">Readiness</span>}
    </div>
  )
}

export function ReadinessScoreBar({ score }) {
  const { bg, text } = getScoreColor(score)
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">Readiness Score</span>
        <span className={`text-sm font-bold ${text}`}>{score}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${bg}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
