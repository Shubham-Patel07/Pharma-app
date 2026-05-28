import { DMLA_DOCUMENT_CHECKLIST, DMLA_FIELD_MAP } from '../data/dmlaData'

export function useFilingReadiness(app) {
  // 1. Field completeness — required DMLA fields that have a non-empty value
  const requiredFields = Object.entries(DMLA_FIELD_MAP).filter(([, v]) => v.required).map(([k]) => k)
  const filledFields = requiredFields.filter((f) => app[f]?.toString().trim())
  const fieldScore = Math.round((filledFields.length / requiredFields.length) * 100)
  const missingFields = requiredFields
    .filter((f) => !app[f]?.toString().trim())
    .map((f) => ({ key: f, portalLabel: DMLA_FIELD_MAP[f].portalLabel }))

  // 2. Document completeness — required DMLA docs uploaded
  const dmlaDocuments = app.dmlaDocuments ?? []
  const requiredDmla = DMLA_DOCUMENT_CHECKLIST.filter((d) => d.required)
  const uploadedRequired = requiredDmla.filter(
    (d) => dmlaDocuments.find((ud) => ud.docId === d.id)?.uploaded
  )
  const documentScore = Math.round((uploadedRequired.length / requiredDmla.length) * 100)
  const missingDocs = requiredDmla.filter(
    (d) => !dmlaDocuments.find((ud) => ud.docId === d.id)?.uploaded
  )

  // 3. Gate checklist completeness
  const dmlaChecklist = app.dmlaChecklist ?? []
  const checkedItems = dmlaChecklist.filter((i) => i.checked)
  const checklistScore = dmlaChecklist.length
    ? Math.round((checkedItems.length / dmlaChecklist.length) * 100)
    : 0
  const failedChecks = dmlaChecklist
    .filter((i) => !i.checked)
    .map((i) => i.itemId)

  // 4. Weighted composite: docs 40%, fields 35%, checklist 25%
  const overallScore = Math.round(documentScore * 0.4 + fieldScore * 0.35 + checklistScore * 0.25)

  return {
    fieldScore,
    documentScore,
    checklistScore,
    overallScore,
    missingFields,
    missingDocs,
    failedChecks,
    isFilingReady: overallScore === 100,
  }
}
