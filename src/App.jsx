import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './pages/Dashboard'
import { Applications } from './pages/Applications'
import { CreateApplication } from './pages/CreateApplication'
import { ApplicationDetails } from './pages/ApplicationDetails'
import { Placeholder } from './pages/Placeholder'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/new" element={<CreateApplication />} />
        <Route path="/applications/:id" element={<ApplicationDetails />} />
        <Route path="/documents" element={<Placeholder title="Document Library" subtitle="Centralised document storage coming soon" />} />
        <Route path="/analytics" element={<Placeholder title="Analytics" subtitle="Submission pipeline analytics coming soon" />} />
        <Route path="/settings" element={<Placeholder title="Settings" subtitle="Account and workspace settings coming soon" />} />
      </Route>
    </Routes>
  )
}
