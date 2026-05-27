import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '../components/icons/PlusIcon'
import { FolderIcon } from '../components/icons/FolderIcon'
import { ChartIcon } from '../components/icons/ChartIcon'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { StatCard } from '../components/ui/StatCard'
import { ApplicationCard } from '../components/ui/ApplicationCard'
import { QuickAction } from '../components/ui/QuickAction'
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
