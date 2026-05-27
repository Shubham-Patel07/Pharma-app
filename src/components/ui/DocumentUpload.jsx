import React from 'react'
import { UploadCloudIcon } from '../icons/UploadCloudIcon'

export function DocumentUpload() {
  return (
    <div className="mb-6 border-2 border-dashed border-slate-300 rounded-xl px-6 py-8 text-center hover:border-brand-400 hover:bg-brand-50 transition-colors cursor-pointer group">
      <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-brand-100 flex items-center justify-center mx-auto mb-3 transition-colors">
        <UploadCloudIcon className="w-6 h-6 text-slate-400 group-hover:text-brand-600" />
      </div>
      <p className="text-sm font-medium text-slate-700 group-hover:text-brand-700">Drop files here or click to upload</p>
      <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX up to 50MB each</p>
    </div>
  )
}
