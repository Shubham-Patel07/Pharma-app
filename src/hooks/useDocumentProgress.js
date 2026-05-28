import { DMLA_DOCUMENT_CHECKLIST } from '../data/dmlaData'

export function useDocumentProgress(app) {
  const required = DMLA_DOCUMENT_CHECKLIST.filter((d) => d.required)
  const docs = app.dmlaDocuments ?? []

  const totalRequired = required.length
  const uploadedRequired = required.filter((d) => docs.find((ud) => ud.docId === d.id)?.uploaded).length
  const totalUploaded = docs.filter((d) => d.uploaded).length

  return { totalRequired, uploadedRequired, totalUploaded }
}
