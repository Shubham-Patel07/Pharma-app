import { DOCUMENT_CHECKLIST } from '../data/mockData'
import { isDocUploaded } from './documentHelpers'

export function useDocumentProgress(app) {
  const required = DOCUMENT_CHECKLIST.filter((d) => d.required)

  const totalRequired = required.length
  const uploadedRequired = required.filter((d) => isDocUploaded(app.documents, d.id)).length
  const totalUploaded = app.documents.filter((d) => d.uploaded).length

  return { totalRequired, uploadedRequired, totalUploaded }
}
