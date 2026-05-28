import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/layout/TopBar'
import { Card, CardBody } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import { ReadinessScoreRing } from '../components/ui/ReadinessScore'
import { Button } from '../components/ui/Button'
import { MOCK_APPLICATIONS } from '../data/mockData'
import { useFilingReadiness } from '../hooks/useFilingReadiness'

export function Filing() {
  const navigate = useNavigate()
  const dmlaApps = MOCK_APPLICATIONS.filter((a) => a.targetMarket === 'Gujarat DMLA')

  return (
    <div className="page-wrapper">
      <TopBar
        title="Gujarat DMLA Filing"
        subtitle="Track filing readiness for iDMLA portal submissions"
      />
      <main className="page-content space-y-6">
        {dmlaApps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-slate-600 font-medium">No DMLA applications yet</p>
            <p className="text-slate-400 text-sm mt-1 mb-5">Create an application with Gujarat DMLA as the target market.</p>
            <Button onClick={() => navigate('/applications/new')}>Create Application</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {dmlaApps.map((app) => (
              <DMLAAppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function DMLAAppCard({ app }) {
  const navigate = useNavigate()
  const { overallScore, isFilingReady, missingDocs, failedChecks } = useFilingReadiness(app)
  const blockingCount = missingDocs.length + failedChecks.length

  return (
    <Card onClick={() => navigate(`/applications/${app.id}?tab=filing`)}>
      <CardBody className="flex items-start gap-4 py-5">
        <ReadinessScoreRing score={overallScore} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-slate-800 text-sm truncate">{app.productName}</p>
            <StatusBadge status={app.status} />
          </div>
          <p className="text-xs text-slate-500 mb-1">{app.licenseType} · {app.district}</p>
          <p className="text-xs text-slate-500 truncate">{app.manufacturerName}</p>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            {isFilingReady ? (
              <span className="text-xs font-semibold text-emerald-600">✓ Ready to File</span>
            ) : (
              <span className="text-xs text-amber-600 font-medium">
                {blockingCount} blocking issue{blockingCount !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(`/applications/${app.id}?tab=filing`) }}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              View Readiness →
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
