import { useState } from 'react'
import { MOCK_APPLICATIONS } from '../data/mockData'

export function useFilteredApplications() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = MOCK_APPLICATIONS.filter((app) => {
    const matchesStatus = filter === 'all' || app.status === filter
    const matchesSearch =
      app.productName.toLowerCase().includes(search.toLowerCase()) ||
      app.manufacturerName.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return { search, setSearch, filter, setFilter, filtered }
}
