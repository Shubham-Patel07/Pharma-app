import React from 'react'
import { DMLA_DOCUMENT_CHECKLIST } from '../../data/dmlaData'
import { CheckIcon } from '../icons/CheckIcon'
import { UploadIcon } from '../icons/UploadIcon'

export function DMLAChecklist({ dmlaDocuments = [] }) {
  const docMap = Object.fromEntries(dmlaDocuments.map((d) => [d.docId, d]))
  const categories = [...new Set(DMLA_DOCUMENT_CHECKLIST.map((d) => d.category))]

  return (
    <div className="space-y-6">
      {categories.map((cat) => {
        const items = DMLA_DOCUMENT_CHECKLIST.filter((d) => d.category === cat)
        const uploadedCount = items.filter((d) => docMap[d.id]?.uploaded).length
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide px-2 py-0.5 bg-slate-100 rounded">
                {cat}
              </span>
              <span className="text-xs text-slate-400">{uploadedCount}/{items.length} uploaded</span>
            </div>
            <div className="space-y-2">
              {items.map((doc) => {
                const upload = docMap[doc.id]
                const uploaded = upload?.uploaded
                return (
                  <div
                    key={doc.id}
                    className={`flex items-start gap-3 px-4 py-3 rounded-lg border text-sm ${
                      uploaded ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${uploaded ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                      {uploaded
                        ? <CheckIcon className="w-3 h-3 text-white" />
                        : <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium ${uploaded ? 'text-slate-800' : 'text-slate-600'}`}>
                          {doc.name}
                        </span>
                        {!doc.required && (
                          <span className="text-xs text-slate-400">(Optional)</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{doc.dmlaFormRef}</p>
                      {uploaded && upload.fileName && (
                        <p className="text-xs text-emerald-600 mt-0.5 truncate">{upload.fileName}</p>
                      )}
                    </div>
                    {!uploaded && (
                      <label
                        htmlFor={`dmla-upload-${doc.id}`}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <UploadIcon className="w-3.5 h-3.5" />
                        Upload
                        <input id={`dmla-upload-${doc.id}`} type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => { e.target.value = '' }} />
                      </label>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
