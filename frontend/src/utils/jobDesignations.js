/** Job designation slugs and labels — keep in sync with backend/app/job_designations.py */

export const JOB_DESIGNATIONS = [
  { id: 'seo_expert', label: 'SEO Expert' },
  { id: 'smo_expert', label: 'SMO Expert' },
  { id: 'graphic_designer', label: 'Graphic Designer' },
  { id: 'digital_marketing_head', label: 'Digital Marketing Head' },
  { id: 'sales_executive', label: 'Sales Executive' },
  { id: 'sr_sales_executive', label: 'Sr. Sales Executive' },
  { id: 'sales_head', label: 'Sales Head' },
  { id: 'sales_director', label: 'Sales Director' },
  { id: 'operation_executive', label: 'Operation Executive' },
  { id: 'operation_head', label: 'Operation Head' },
  { id: 'operation_director', label: 'Operation Director' },
  { id: 'visa_filler', label: 'Visa Filler' },
  { id: 'tourist_visa_counsellor', label: 'Tourist Visa Counsellor' },
  { id: 'study_visa_counsellor', label: 'Study Visa Counsellor' },
  { id: 'education_loan_expert', label: 'Education Loan Expert' },
  { id: 'receptionist', label: 'Receptionist' },
  { id: 'accountant', label: 'Accountant' },
  { id: 'hr_assistant', label: 'HR Assistant' },
  { id: 'hr_head', label: 'HR Head' },
  { id: 'academic_counsellor', label: 'Academic Counsellor' },
];

export const LEGACY_JOB_TYPES = [
  { id: 'counselling', label: 'Counselling' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'operations', label: 'Operations' },
  { id: 'finance', label: 'Finance' },
  { id: 'hr', label: 'HR' },
  { id: 'it', label: 'IT & Technology' },
  { id: 'test_prep', label: 'Test Prep' },
  { id: 'visa', label: 'Visa & Documentation' },
  { id: 'management', label: 'Management' },
  { id: 'other', label: 'Other' },
];

export const JOB_TYPE_FILTERS = [
  { id: 'all', label: 'All Roles' },
  ...JOB_DESIGNATIONS,
  ...LEGACY_JOB_TYPES.filter(
    (legacy) => !JOB_DESIGNATIONS.some((d) => d.id === legacy.id),
  ),
];

export const TYPE_LABELS = Object.fromEntries(
  [...JOB_DESIGNATIONS, ...LEGACY_JOB_TYPES].map((t) => [t.id, t.label]),
);

export function jobTypeLabel(slug) {
  return TYPE_LABELS[slug] || slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
