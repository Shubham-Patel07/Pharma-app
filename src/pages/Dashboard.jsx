import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '../components/icons/PlusIcon'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { StatCard } from '../components/ui/StatCard'
import { ApplicationCard } from '../components/ui/ApplicationCard'
import { MOCK_APPLICATIONS, STATS } from '../data/mockData'

export function Dashboard() {
  const navigate = useNavigate()
  const recent = MOCK_APPLICATIONS.slice(0, 4)

  return (
    <div className="page-wrapper">
      <TopBar
        title="Dashboard"
        subtitle="Welcome back, Shubham — here's a snapshot of your pipeline."
        actions={
          <Button onClick={() => navigate('/applications/new')}>
            <PlusIcon className="w-4 h-4" />
            New Application
          </Button>
        }
      />
      <main className="page-content space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Applications" value={STATS.totalApplications} sub="All time" />
          <StatCard label="Submitted" value={STATS.submitted} sub="Pending FDA review" colorClass="text-blue-600" />
          <StatCard label="Approved" value={STATS.approved} sub="Successfully cleared" colorClass="text-emerald-600" />
          <StatCard label="Avg Readiness" value={`${STATS.avgReadiness}%`} sub="Across all drafts" colorClass="text-brand-600" />
        </div>

        {/* Recent Applications */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-heading">Recent Applications</h2>
            <button
              onClick={() => navigate('/applications')}
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recent.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="section-heading mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <QuickAction
              icon={<PlusIcon className="w-5 h-5" />}
              title="Start New Filing"
              desc="Create an ANDA or NDA application"
              color="bg-brand-50 text-brand-600"
              onClick={() => navigate('/applications/new')}
            />
            <QuickAction
              icon={<FolderIcon className="w-5 h-5" />}
              title="Upload Documents"
              desc="Add documents to existing applications"
              color="bg-violet-50 text-violet-600"
              onClick={() => navigate('/applications')}
            />
            <QuickAction
              icon={<ChartIcon className="w-5 h-5" />}
              title="Review Analytics"
              desc="Track submission trends and timelines"
              color="bg-amber-50 text-amber-600"
              onClick={() => navigate('/analytics')}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

function QuickAction({ icon, title, desc, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className="card px-5 py-4 text-left hover:shadow-md hover:border-brand-200 transition-all flex items-start gap-4"
    >
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-800 text-sm">{title}</p>
        <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
      </div>
    </button>
  )
}

function FolderIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  )
}

function ChartIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}
