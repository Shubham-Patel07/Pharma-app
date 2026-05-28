import { useState } from 'react'
import { INITIAL_FORM, REQUIRED_FIELDS } from '../data/formData'

export function useApplicationForm() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  function validate() {
    const errs = {}
    REQUIRED_FIELDS.forEach((f) => {
      if (!form[f]?.trim()) errs[f] = 'This field is required'
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

  function reset() {
    setForm(INITIAL_FORM)
    setErrors({})
    setSubmitted(false)
  }

  return { form, errors, submitted, set, handleSubmit, reset }
}
