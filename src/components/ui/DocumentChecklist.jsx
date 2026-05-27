import React from 'react'
import { DOCUMENT_CHECKLIST } from '../../data/mockData'
import { CategoryBadge } from './Badge'

export function DocumentChecklist({ documents }) {
  const docMap = Object.fromEntries(documents.map((d) => [d.docId, d]))

  const categories = [...new Set(DOCUMENT_CHECKLIST.map((d) => d.category))]

  return (
    <div className="space-y-6">
      {categories.map((cat) => {
        const items = DOCUMENT_CHECKLIST.filter((d) => d.category === cat)
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <CategoryBadge category={cat} />
              <span className="text-xs text-slate-400">
                {items.filter((d) => docMap[d.id]?.uploaded).length}/{items.length} uploaded
              </span>
            </div>
            <div className="space-y-2">
              {items.map((doc) => {
                const upload = docMap[doc.id]
                const uploaded = upload?.uploaded
                return (
                  <div
                    key={doc.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm ${
                      uploaded
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${uploaded ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                      {uploaded ? (
                        <CheckIcon className="w-3 h-3 text-white" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`font-medium ${uploaded ? 'text-slate-800' : 'text-slate-600'}`}>
                        {doc.name}
                      </span>
                      {!doc.required && (
                        <span className="ml-2 text-xs text-slate-400">(Optional)</span>
                      )}
                      {uploaded && upload.fileName && (
                        <p className="text-xs text-emerald-600 mt-0.5 truncate">{upload.fileName}</p>
                      )}
                    </div>
                    {!uploaded && (
                      <UploadButton docId={doc.id} />
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

function UploadButton({ docId }) {
  return (
    <label
      htmlFor={`upload-${docId}`}
      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 cursor-pointer transition-colors"
    >
      <UploadIcon className="w-3.5 h-3.5" />
      Upload
      <input
        id={`upload-${docId}`}
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        onChange={(e) => {
          /* placeholder — no backend yet */
          e.target.value = ''
        }}
      />
    </label>
  )
}

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function UploadIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  )
}
