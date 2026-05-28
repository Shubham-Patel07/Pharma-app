export const DMLA_LICENSE_TYPES = [
  { value: 'Form 27', label: 'Form 27 — Manufacturing of Drugs (Allopathic)' },
  { value: 'Form 28', label: 'Form 28 — Manufacturing of Cosmetics' },
  { value: 'Form 29', label: 'Form 29 — Loan License for Drug Manufacturing' },
  { value: 'Form 30', label: 'Form 30 — Repacking of Drugs' },
]

export const DRUG_SCHEDULES = ['Schedule H', 'Schedule H1', 'Schedule X', 'OTC (Non-Scheduled)']

export const GUJARAT_DISTRICTS = [
  'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch',
  'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka',
  'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch',
  'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal',
  'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
  'Tapi', 'Vadodara', 'Valsad',
]

export const DMLA_DOCUMENT_CHECKLIST = [
  // License & Registration
  { id: 'dmla_1', name: 'Drug License Application (Form 27/28/29/30)', required: true, category: 'License & Registration', dmlaFormRef: 'Form 27 — Clause 2(a)' },
  { id: 'dmla_2', name: 'Existing Drug License Copy', required: true, category: 'License & Registration', dmlaFormRef: 'Form 27 — Clause 2(b)' },
  { id: 'dmla_3', name: 'Factory License under Factories Act', required: true, category: 'License & Registration', dmlaFormRef: 'Form 27 — Clause 3' },

  // Premises & Equipment
  { id: 'dmla_4', name: 'Approved Site Plan / Floor Plan', required: true, category: 'Premises & Equipment', dmlaFormRef: 'Schedule M — Part I, Section 3' },
  { id: 'dmla_5', name: 'Equipment List with Make & Model', required: true, category: 'Premises & Equipment', dmlaFormRef: 'Schedule M — Part I, Section 5' },
  { id: 'dmla_6', name: 'Site Inspection Certificate', required: true, category: 'Premises & Equipment', dmlaFormRef: 'Drugs & Cosmetics Act — Rule 76' },

  // Manufacturing Compliance
  { id: 'dmla_7', name: 'GMP Certificate (Schedule M Compliance)', required: true, category: 'Manufacturing Compliance', dmlaFormRef: 'Schedule M — GMP Guidelines' },
  { id: 'dmla_8', name: 'Batch Manufacturing Records (BMR Template)', required: true, category: 'Manufacturing Compliance', dmlaFormRef: 'Schedule M — Part I, Section 11' },
  { id: 'dmla_9', name: 'Standard Operating Procedures (SOPs)', required: true, category: 'Manufacturing Compliance', dmlaFormRef: 'Schedule M — Part I, Section 12' },

  // Technical Staff
  { id: 'dmla_10', name: 'Competent Person / Technical Staff Certificate', required: true, category: 'Technical Staff', dmlaFormRef: 'Drugs & Cosmetics Act — Section 18' },
  { id: 'dmla_11', name: 'Pharmacist Registration Certificate', required: true, category: 'Technical Staff', dmlaFormRef: 'Pharmacy Act 1948 — Section 31' },

  // Product Documentation
  { id: 'dmla_12', name: 'Certificate of Analysis (CoA)', required: true, category: 'Product Documentation', dmlaFormRef: 'Schedule M — Part I, Section 9' },
  { id: 'dmla_13', name: 'Stability Study Data', required: true, category: 'Product Documentation', dmlaFormRef: 'Schedule M — Appendix 2' },
  { id: 'dmla_14', name: 'Raw Material Test Reports', required: true, category: 'Product Documentation', dmlaFormRef: 'Schedule M — Part I, Section 8' },
  { id: 'dmla_15', name: 'Product Specification / Master Formula', required: true, category: 'Product Documentation', dmlaFormRef: 'Schedule M — Part I, Section 7' },

  // Regulatory & Environmental
  { id: 'dmla_16', name: 'Pollution Control NOC (GPCB)', required: true, category: 'Regulatory & Environmental', dmlaFormRef: 'Environment Protection Act — Rule 5' },
  { id: 'dmla_17', name: 'Labeling / Package Insert (Draft)', required: true, category: 'Regulatory & Environmental', dmlaFormRef: 'Drugs & Cosmetics Act — Rule 96' },
  { id: 'dmla_18', name: 'Drug Master File (DMF) Reference', required: false, category: 'Regulatory & Environmental', dmlaFormRef: 'CDSCO DMF Guidelines' },
]

export const DMLA_CHECKLIST_ITEMS = [
  { id: 'gate_1', label: 'Drug license is currently active (not expired or cancelled)', category: 'License Status' },
  { id: 'gate_2', label: 'GMP certificate is valid for the current manufacturing period', category: 'License Status' },
  { id: 'gate_3', label: 'Competent person / technical staff appointment letter is on file', category: 'Technical Staff' },
  { id: 'gate_4', label: 'Site inspection completed within the last 2 years', category: 'Site Compliance' },
  { id: 'gate_5', label: 'Manufacturing address in application matches the licensed site address', category: 'Site Compliance' },
  { id: 'gate_6', label: 'All listed equipment items are calibrated and records are current', category: 'Site Compliance' },
  { id: 'gate_7', label: 'All SOPs are reviewed, approved, and within revision date', category: 'Manufacturing Compliance' },
  { id: 'gate_8', label: 'No pending show-cause notices or legal actions from DMLA / CDSCO', category: 'Regulatory Standing' },
]

export const DMLA_FIELD_MAP = {
  productName: { portalLabel: 'Name of Drug / Formulation', required: true },
  dosageForm: { portalLabel: 'Dosage Form', required: true },
  strength: { portalLabel: 'Strength / Potency', required: true },
  packSize: { portalLabel: 'Pack Size / Presentation', required: true },
  manufacturerName: { portalLabel: 'Name of Licensee / Applicant Firm', required: true },
  submissionType: { portalLabel: 'Application Category (Form Type)', required: true },
  drugSchedule: { portalLabel: 'Drug Schedule Category', required: true },
  district: { portalLabel: 'District (Gujarat)', required: true },
  manufacturingAddress: { portalLabel: 'Address of Manufacturing Premises', required: true },
  competentPersonName: { portalLabel: 'Name of Competent Person / Technical Staff', required: true },
  route: { portalLabel: 'Route of Administration', required: false },
}
