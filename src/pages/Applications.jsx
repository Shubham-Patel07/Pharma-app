import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusIcon } from '../components/icons/PlusIcon'
import { SearchIcon } from '../components/icons/SearchIcon'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { ApplicationCard } from '../components/ui/ApplicationCard'
import { SearchFilter } from '../components/ui/SearchFilter'
import { MOCK_APPLICATIONS } from '../data/mockData'

export function Applications() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = MOCK_APPLICATIONS.filter((app) => {
    const matchesStatus = filter === 'all' || app.status === filter
    const matchesSearch =
      app.productName.toLowerCase().includes(search.toLowerCase()) ||
      app.manufacturerName.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="page-wrapper">
      <TopBar
        title="Applications"
        subtitle={`${MOCK_APPLICATIONS.length} total applications`}
        actions={
          <Button onClick={() => navigate('/applications/new')}>
            <PlusIcon className="w-4 h-4" />
            New Application
          </Button>
        }
      />
      <main className="page-content-sm space-y-5">
        <SearchFilter
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <SearchIcon className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">No applications found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </main>
    </div>
  )
}

