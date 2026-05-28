import { DMLA_DOCUMENT_CHECKLIST } from '../data/dmlaData'

export function isDocUploaded(documents, docId) {
  return documents.find((ud) => ud.docId === docId)?.uploaded ?? false
}

export function getMissingRequiredDocs(dmlaDocuments) {
  const docs = dmlaDocuments ?? []
  return DMLA_DOCUMENT_CHECKLIST.filter((d) => d.required && !isDocUploaded(docs, d.id))
}
