import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { Card, CardHeader, CardBody } from '../components/ui/Card'
import { FormField, Input, Select } from '../components/ui/FormField'
import { DOSAGE_FORMS } from '../data/mockData'
import { DMLA_LICENSE_TYPES, DRUG_SCHEDULES, GUJARAT_DISTRICTS } from '../data/dmlaData'
import { CheckIcon } from '../components/icons/CheckIcon'
import { InfoBanner } from '../components/ui/InfoBanner'
import { useApplicationForm } from '../hooks/useApplicationForm'

export function CreateApplication() {
  const navigate = useNavigate()
  const { form, errors, submitted, set, setSubmissionType, handleSubmit, reset } = useApplicationForm()

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
              <Button variant="secondary" onClick={reset}>
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
        subtitle="Fill in the product details to start a Gujarat DMLA filing"
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
                    placeholder="e.g. Paracetamol IP"
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
                      placeholder="e.g. 10 tablets/strip"
                      value={form.packSize}
                      onChange={set('packSize')}
                    />
                  </FormField>
                </div>
              </CardBody>
            </Card>

            {/* Manufacturing & Regulatory */}
            <Card>
              <CardHeader>
                <h2 className="card-heading">Manufacturing & Regulatory</h2>
              </CardHeader>
              <CardBody className="space-y-5">
                <FormField label="Manufacturer Name" required error={errors.manufacturerName}>
                  <Input
                    placeholder="e.g. Gujarat Pharma Industries Pvt. Ltd."
                    value={form.manufacturerName}
                    onChange={set('manufacturerName')}
                  />
                </FormField>

                <FormField label="Submission Type" required error={errors.submissionType}>
                  <Select value={form.submissionType} onChange={setSubmissionType}>
                    <option value="">Select form…</option>
                    {DMLA_LICENSE_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </Select>
                </FormField>
              </CardBody>
            </Card>

            {/* Gujarat DMLA Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <h2 className="card-heading">Gujarat DMLA Details</h2>
                  <span className="text-xs font-medium px-2 py-0.5 bg-brand-50 text-brand-700 rounded border border-brand-200">iDMLA Portal</span>
                </div>
              </CardHeader>
              <CardBody className="space-y-5">
                <FormField label="Drug Schedule" required error={errors.drugSchedule}>
                  <Select value={form.drugSchedule} onChange={set('drugSchedule')}>
                    <option value="">Select schedule…</option>
                    {DRUG_SCHEDULES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField label="District (Gujarat)" required error={errors.district}>
                    <Select value={form.district} onChange={set('district')}>
                      <option value="">Select district…</option>
                      {GUJARAT_DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </Select>
                  </FormField>

                  <FormField label="Competent Person Name" required error={errors.competentPersonName}>
                    <Input
                      placeholder="e.g. Dr. Rajesh Patel (B.Pharm)"
                      value={form.competentPersonName}
                      onChange={set('competentPersonName')}
                    />
                  </FormField>
                </div>

                <FormField label="Manufacturing Address" required error={errors.manufacturingAddress}>
                  <Input
                    placeholder="e.g. 42, GIDC Estate, Phase II, Naroda, Ahmedabad - 382330"
                    value={form.manufacturingAddress}
                    onChange={set('manufacturingAddress')}
                  />
                </FormField>
              </CardBody>
            </Card>

            <InfoBanner>
              After creation, you'll be taken to the application page where you can upload required documents and track your DMLA filing readiness score.
            </InfoBanner>

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
