import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import { StatusBadge } from '../components/ui/Badge'
import { ReadinessScoreRing, ReadinessScoreBar } from '../components/ui/ReadinessScore'
import { DocumentChecklist } from '../components/ui/DocumentChecklist'
import { MOCK_APPLICATIONS, DOCUMENT_CHECKLIST } from '../data/mockData'

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

  const totalRequired = DOCUMENT_CHECKLIST.filter((d) => d.required).length
  const uploadedRequired = DOCUMENT_CHECKLIST.filter((d) => d.required).filter(
    (d) => app.documents.find((ud) => ud.docId === d.id)?.uploaded
  ).length
  const totalUploaded = app.documents.filter((d) => d.uploaded).length

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

      {/* Tab bar */}
      <div className="bg-white border-b border-slate-200 px-8">
        <div className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-brand-600 text-brand-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="page-content-sm">
        {activeTab === 'overview' && (
          <OverviewTab app={app} totalRequired={totalRequired} uploadedRequired={uploadedRequired} totalUploaded={totalUploaded} />
        )}
        {activeTab === 'documents' && <DocumentsTab app={app} />}
        {activeTab === 'timeline' && <TimelineTab app={app} />}
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
              <SummaryRow label="Product Name" value={app.productName} />
              <SummaryRow label="Dosage Form" value={app.dosageForm} />
              <SummaryRow label="Strength" value={app.strength} />
              <SummaryRow label="Pack Size" value={app.packSize} />
              <SummaryRow label="Manufacturer" value={app.manufacturerName} />
              <SummaryRow label="Submission Type" value={app.submissionType} />
              <SummaryRow label="Target Market" value={app.targetMarket} />
              <SummaryRow label="Status" value={<StatusBadge status={app.status} />} />
              <SummaryRow label="Created" value={app.createdAt} />
              <SummaryRow label="Last Updated" value={app.updatedAt} />
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
            {DOCUMENT_CHECKLIST.filter((d) => d.required)
              .filter((d) => !app.documents.find((ud) => ud.docId === d.id)?.uploaded)
              .slice(0, 4)
              .map((doc) => (
                <div key={doc.id} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span className="text-slate-600">Upload {doc.name}</span>
                </div>
              ))}
            {DOCUMENT_CHECKLIST.filter((d) => d.required).filter(
              (d) => !app.documents.find((ud) => ud.docId === d.id)?.uploaded
            ).length === 0 && (
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

      <div className="mb-6 border-2 border-dashed border-slate-300 rounded-xl px-6 py-8 text-center hover:border-brand-400 hover:bg-brand-50 transition-colors cursor-pointer group">
        <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-brand-100 flex items-center justify-center mx-auto mb-3 transition-colors">
          <UploadCloudIcon className="w-6 h-6 text-slate-400 group-hover:text-brand-600" />
        </div>
        <p className="text-sm font-medium text-slate-700 group-hover:text-brand-700">Drop files here or click to upload</p>
        <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX up to 50MB each</p>
      </div>

      <DocumentChecklist documents={app.documents} />
    </div>
  )
}

function TimelineTab({ app }) {
  const events = [
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

  return (
    <div className="max-w-xl">
      <h2 className="section-heading mb-6">Application Timeline</h2>
      <ol className="relative border-l border-slate-200 space-y-8 ml-3">
        {events.map((ev, i) => (
          <li key={i} className="ml-6">
            <div className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white ${
              ev.icon === 'approve' ? 'bg-emerald-500' :
              ev.icon === 'reject' ? 'bg-red-500' :
              ev.icon === 'submit' ? 'bg-blue-500' :
              'bg-brand-500'
            }`}>
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

function SummaryRow({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">{label}</p>
      <div className="text-sm font-medium text-slate-800">{value}</div>
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

function UploadCloudIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338-2.32 5.75 5.75 0 011.822 11.095H6.75z" />
    </svg>
  )
}
