import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import { FormField, Input, Select } from '../components/ui/FormField'
import { DOSAGE_FORMS } from '../data/mockData'
import { INITIAL_FORM, REQUIRED_FIELDS } from '../data/formData'
import { CheckIcon } from '../components/icons/CheckIcon'
import { InfoIcon } from '../components/icons/InfoIcon'

export function CreateApplication() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  function validate() {
    const errs = {}
    REQUIRED_FIELDS.forEach((f) => {
      if (!form[f].trim()) errs[f] = 'This field is required'
    })
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-wrapper">
        <TopBar title="Create Application" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
              <CheckIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Application Created</h2>
            <p className="text-slate-500 text-sm mb-6">
              <span className="font-semibold text-slate-700">{form.productName}</span> has been added to your pipeline as a draft.
              Begin uploading required documents to improve your readiness score.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" onClick={() => { setForm(INITIAL_FORM); setSubmitted(false); setErrors({}) }}>
                Create Another
              </Button>
              <Button onClick={() => navigate('/applications')}>
                View Applications
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <TopBar
        title="New Application"
        subtitle="Fill in the product details to start a regulatory filing"
        actions={
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        }
      />
      <main className="page-content">
        <form onSubmit={handleSubmit} noValidate>
          <div className="max-w-2xl space-y-6">
            {/* Product Information */}
            <Card>
              <CardHeader>
                <h2 className="card-heading">Product Information</h2>
              </CardHeader>
              <CardBody className="space-y-5">
                <FormField label="Product Name" required error={errors.productName}>
                  <Input
                    placeholder="e.g. Metformin HCl"
                    value={form.productName}
                    onChange={set('productName')}
                  />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Dosage Form" required error={errors.dosageForm}>
                    <Select value={form.dosageForm} onChange={set('dosageForm')}>
                      <option value="">Select form…</option>
                      {DOSAGE_FORMS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </Select>
                  </FormField>

                  <FormField label="Route of Administration" error={errors.route}>
                    <Select value={form.route} onChange={set('route')}>
                      <option value="">Select route…</option>
                      <option value="Oral">Oral</option>
                      <option value="Topical">Topical</option>
                      <option value="Inhalation">Inhalation</option>
                      <option value="Injection">Injection</option>
                      <option value="Rectal">Rectal</option>
                      <option value="Transdermal">Transdermal</option>
                    </Select>
                  </FormField>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Strength" required error={errors.strength}>
                    <Input
                      placeholder="e.g. 500 mg"
                      value={form.strength}
                      onChange={set('strength')}
                    />
                  </FormField>

                  <FormField label="Pack Size" required error={errors.packSize}>
                    <Input
                      placeholder="e.g. 100 tablets/bottle"
                      value={form.packSize}
                      onChange={set('packSize')}
                    />
                  </FormField>
                </div>
              </CardBody>
            </Card>

            {/* Manufacturing */}
            <Card>
              <CardHeader>
                <h2 className="card-heading">Manufacturing & Regulatory</h2>
              </CardHeader>
              <CardBody className="space-y-5">
                <FormField label="Manufacturer Name" required error={errors.manufacturerName}>
                  <Input
                    placeholder="e.g. BioGen Pharmaceuticals Ltd."
                    value={form.manufacturerName}
                    onChange={set('manufacturerName')}
                  />
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Submission Type" required error={errors.submissionType}>
                    <Select value={form.submissionType} onChange={set('submissionType')}>
                      <option value="">Select type…</option>
                      <option value="ANDA">ANDA (Generic)</option>
                      <option value="NDA">NDA (New Drug)</option>
                      <option value="BLA">BLA (Biologics)</option>
                      <option value="505(b)(2)">505(b)(2)</option>
                    </Select>
                  </FormField>

                  <FormField label="Target Market" required error={errors.targetMarket}>
                    <Select value={form.targetMarket} onChange={set('targetMarket')}>
                      <option value="">Select market…</option>
                      <option value="US FDA">US FDA</option>
                      <option value="EU EMA">EU EMA</option>
                      <option value="UK MHRA">UK MHRA</option>
                      <option value="Health Canada">Health Canada</option>
                      <option value="TGA Australia">TGA Australia</option>
                    </Select>
                  </FormField>
                </div>
              </CardBody>
            </Card>

            {/* Info banner */}
            <div className="flex gap-3 px-4 py-3.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700">
              <InfoIcon className="w-5 h-5 shrink-0 mt-0.5" />
              <p>After creation, you'll be taken to the application page where you can upload required documents and track your readiness score.</p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" size="lg">
                Create Application
              </Button>
              <Button type="button" variant="secondary" size="lg" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
