import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardBody, CardRow } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import { ReadinessScoreRing, ReadinessScoreBar } from '../components/ui/ReadinessScore'
import { TabBar } from '../components/ui/TabBar'
import { DocumentUpload } from '../components/ui/DocumentUpload'
import { ApplicationTimeline } from '../components/ui/ApplicationTimeline'
import { DMLAChecklist } from '../components/ui/DMLAChecklist'
import { FilingReadinessScore } from '../components/ui/FilingReadinessScore'
import { GateChecklist } from '../components/ui/GateChecklist'
import { MOCK_APPLICATIONS } from '../data/mockData'
import { DMLA_DOCUMENT_CHECKLIST, DMLA_FIELD_MAP } from '../data/dmlaData'
import { useDocumentProgress } from '../hooks/useDocumentProgress'
import { getMissingRequiredDocs } from '../hooks/documentHelpers'
import { useFilingReadiness } from '../hooks/useFilingReadiness'

export function ApplicationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const app = MOCK_APPLICATIONS.find((a) => a.id === id)
  const [activeTab, setActiveTab] = useState('overview')

  if (!app) {
    return (
      <div className="page-wrapper">
        <TopBar title="Application Not Found" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500 mb-4">This application could not be found.</p>
            <Button onClick={() => navigate('/applications')}>Back to Applications</Button>
          </div>
        </main>
      </div>
    )
  }

  const { totalRequired, uploadedRequired, totalUploaded } = useDocumentProgress(app)

  const [dmlaChecklist, setDmlaChecklist] = useState(app.dmlaChecklist ?? [])
  const appWithChecklist = { ...app, dmlaChecklist }

  function handleGateToggle(itemId, checked) {
    setDmlaChecklist((prev) =>
      prev.map((i) => i.itemId === itemId ? { ...i, checked } : i)
    )
  }

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: `Documents (${totalUploaded}/${DMLA_DOCUMENT_CHECKLIST.length})` },
    { id: 'timeline', label: 'Timeline' },
    { id: 'filing', label: 'Filing Readiness' },
  ]

  return (
    <div className="page-wrapper">
      <TopBar
        title={app.productName}
        subtitle={`${app.submissionType} · Gujarat DMLA`}
        actions={
          <div className="flex items-center gap-3">
            <StatusBadge status={app.status} />
            <Button variant="secondary" onClick={() => navigate('/applications')}>
              ← Back
            </Button>
            <Button>Edit Application</Button>
          </div>
        }
      />

      <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="page-content-sm">
        {activeTab === 'overview' && (
          <OverviewTab app={app} totalRequired={totalRequired} uploadedRequired={uploadedRequired} totalUploaded={totalUploaded} />
        )}
        {activeTab === 'documents' && <DocumentsTab app={app} />}
        {activeTab === 'timeline' && <ApplicationTimeline app={app} />}
        {activeTab === 'filing' && (
          <FilingReadinessTab app={appWithChecklist} onGateToggle={handleGateToggle} />
        )}
      </main>
    </div>
  )
}

function OverviewTab({ app, totalRequired, uploadedRequired, totalUploaded }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-5">
        <Card>
          <CardHeader>
            <h2 className="card-heading">Product Summary</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <CardRow label="Product Name" value={app.productName} />
              <CardRow label="Dosage Form" value={app.dosageForm} />
              <CardRow label="Strength" value={app.strength} />
              <CardRow label="Pack Size" value={app.packSize} />
              <CardRow label="Manufacturer" value={app.manufacturerName} />
              <CardRow label="License Type" value={app.licenseType} />
              <CardRow label="Drug Schedule" value={app.drugSchedule} />
              <CardRow label="District" value={app.district} />
              <CardRow label="Status" value={<StatusBadge status={app.status} />} />
              <CardRow label="Created" value={app.createdAt} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="card-heading">Document Progress</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-6">
              <ProgressItem label="Required docs" value={`${uploadedRequired}/${totalRequired}`} color="text-red-600" />
              <ProgressItem label="Total uploaded" value={`${totalUploaded}/${DMLA_DOCUMENT_CHECKLIST.length}`} color="text-brand-600" />
            </div>
            <ReadinessScoreBar score={app.readinessScore} />
          </CardBody>
        </Card>
      </div>

      <div className="space-y-5">
        <Card>
          <CardBody className="flex flex-col items-center py-8 gap-4">
            <ReadinessScoreRing score={app.readinessScore} size="lg" />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-700">
                {app.readinessScore >= 80 ? 'Ready for Submission' : app.readinessScore >= 50 ? 'Needs More Documents' : 'Early Stage'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {app.readinessScore >= 80
                  ? 'All critical documents are uploaded'
                  : `Upload ${totalRequired - uploadedRequired} more required document(s)`}
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="card-heading">Next Steps</h2>
          </CardHeader>
          <CardBody className="space-y-2.5">
            {getMissingRequiredDocs(app.dmlaDocuments).slice(0, 4).map((doc) => (
              <div key={doc.id} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span className="text-slate-600">Upload {doc.name}</span>
              </div>
            ))}
            {getMissingRequiredDocs(app.dmlaDocuments).length === 0 && (
              <p className="text-sm text-emerald-600 font-medium">All required documents uploaded!</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function DocumentsTab({ app }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-5">
        <h2 className="section-heading">DMLA Document Checklist</h2>
        <p className="text-sm text-slate-500 mt-0.5">Upload all required documents for the iDMLA portal. Accepted formats: PDF, DOC, DOCX.</p>
      </div>

      <DocumentUpload />

      <DMLAChecklist dmlaDocuments={app.dmlaDocuments} />
    </div>
  )
}

function FilingReadinessTab({ app, onGateToggle }) {
  const { fieldScore, documentScore, checklistScore, overallScore, isFilingReady, missingFields } = useFilingReadiness(app)

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">

        {/* Field Completeness */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="card-heading">iDMLA Portal Field Mapping</h2>
              <span className="text-xs text-slate-400">{fieldScore}% complete</span>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(DMLA_FIELD_MAP).map(([key, meta]) => {
                const value = app[key]
                const missing = meta.required && !value?.toString().trim()
                return (
                  <div key={key}>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                      {meta.portalLabel}
                      {meta.required && <span className="text-red-400 ml-0.5">*</span>}
                    </p>
                    {missing ? (
                      <p className="text-sm text-amber-600 font-medium flex items-center gap-1">
                        <span>⚠</span> Not filled
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-slate-800">{value || '—'}</p>
                    )}
                  </div>
                )
              })}
            </div>
            {missingFields.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-amber-600 font-medium">
                  {missingFields.length} required field(s) missing — edit the application to complete them.
                </p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* DMLA Document Checklist */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="card-heading">DMLA Document Requirements</h2>
              <span className="text-xs text-slate-400">{documentScore}% uploaded</span>
            </div>
          </CardHeader>
          <CardBody>
            <DMLAChecklist dmlaDocuments={app.dmlaDocuments} />
          </CardBody>
        </Card>

        {/* Pre-submission Gate */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="card-heading">Pre-submission Gate Checklist</h2>
              <span className="text-xs text-slate-400">{checklistScore}% complete</span>
            </div>
          </CardHeader>
          <CardBody>
            <GateChecklist dmlaChecklist={app.dmlaChecklist} onChange={onGateToggle} />
          </CardBody>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        <Card>
          <CardHeader>
            <h2 className="card-heading">Filing Readiness</h2>
          </CardHeader>
          <CardBody className="py-6">
            <FilingReadinessScore
              fieldScore={fieldScore}
              documentScore={documentScore}
              checklistScore={checklistScore}
              overallScore={overallScore}
              isFilingReady={isFilingReady}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

function ProgressItem({ label, value, color }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  )
}
