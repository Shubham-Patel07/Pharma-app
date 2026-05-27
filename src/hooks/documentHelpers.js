import { DOCUMENT_CHECKLIST } from '../data/mockData'

export function isDocUploaded(documents, docId) {
  return documents.find((ud) => ud.docId === docId)?.uploaded ?? false
}

export function getMissingRequiredDocs(documents) {
  return DOCUMENT_CHECKLIST.filter((d) => d.required && !isDocUploaded(documents, d.id))
}
