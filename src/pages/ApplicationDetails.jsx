import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardBody, CardRow } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import { ReadinessScoreRing, ReadinessScoreBar } from '../components/ui/ReadinessScore'
import { DocumentChecklist } from '../components/ui/DocumentChecklist'
import { TabBar } from '../components/ui/TabBar'
import { DocumentUpload } from '../components/ui/DocumentUpload'
import { ApplicationTimeline } from '../components/ui/ApplicationTimeline'
import { MOCK_APPLICATIONS, DOCUMENT_CHECKLIST } from '../data/mockData'
import { useDocumentProgress } from '../hooks/useDocumentProgress'
import { getMissingRequiredDocs } from '../hooks/documentHelpers'

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

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: `Documents (${totalUploaded}/${DOCUMENT_CHECKLIST.length})` },
    { id: 'timeline', label: 'Timeline' },
  ]

  return (
    <div className="page-wrapper">
      <TopBar
        title={app.productName}
        subtitle={`${app.submissionType} · ${app.targetMarket}`}
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
              <CardRow label="Submission Type" value={app.submissionType} />
              <CardRow label="Target Market" value={app.targetMarket} />
              <CardRow label="Status" value={<StatusBadge status={app.status} />} />
              <CardRow label="Created" value={app.createdAt} />
              <CardRow label="Last Updated" value={app.updatedAt} />
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
              <ProgressItem label="Total uploaded" value={`${totalUploaded}/${DOCUMENT_CHECKLIST.length}`} color="text-brand-600" />
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
            {getMissingRequiredDocs(app.documents).slice(0, 4).map((doc) => (
              <div key={doc.id} className="flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span className="text-slate-600">Upload {doc.name}</span>
              </div>
            ))}
            {getMissingRequiredDocs(app.documents).length === 0 && (
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
        <h2 className="section-heading">Document Checklist</h2>
        <p className="text-sm text-slate-500 mt-0.5">Upload all required documents to improve your readiness score. Accepted formats: PDF, DOC, DOCX.</p>
      </div>

      <DocumentUpload />

      <DocumentChecklist documents={app.documents} />
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