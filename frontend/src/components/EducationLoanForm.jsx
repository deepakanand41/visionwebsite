import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSend, FiLoader } from 'react-icons/fi';
import { submitEducationLoan } from '../services/api';
import { destinationFormGroups } from '../utils/destinationData';

const studyLevels = [
  "Bachelor's Degree",
  "Master's Degree",
  'PhD / Doctorate',
  'Diploma / Certificate',
  'MBA',
  'Other',
];

const loanTypes = [
  'Secured Education Loan',
  'Unsecured Education Loan',
  'International Lender (USD)',
];

const loanAmounts = [
  'Up to ₹10 Lakhs',
  '₹10 – ₹25 Lakhs',
  '₹25 – ₹40 Lakhs',
  '₹40 – ₹75 Lakhs',
  'Above ₹75 Lakhs',
  'Up to $50,000',
  'Above $50,000',
];

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function EducationLoanForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const inputCls = (err) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white text-gray-800 ${
      err ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-red-700 focus:ring-2 focus:ring-red-50'
    }`;

  const withIconCls = (err) =>
    `w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white text-gray-800 ${
      err ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-red-700 focus:ring-2 focus:ring-red-50'
    }`;

  const onSubmit = async (data) => {
    const toastId = toast.loading('Submitting your loan request...');
    try {
      const result = await submitEducationLoan(data);
      toast.success(result.message || 'Your education loan request has been submitted!', {
        id: toastId,
        duration: 5000,
      });
      reset();
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.', { id: toastId });
    }
  };

  return (
    <div
      id="loan-form"
      className="rounded-3xl p-6 sm:p-8 border border-gray-100 bg-white"
      style={{ boxShadow: '0 8px 40px rgba(165,0,0,0.1)' }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800">Request Education Loan</h3>
        <p className="text-sm text-gray-500 mt-1">
          Fill in your details and our loan counsellor will contact you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" required error={errors.fullName?.message}>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                {...register('fullName', { required: 'Full name is required', minLength: { value: 3, message: 'Min 3 characters' } })}
                placeholder="Your full name"
                className={withIconCls(errors.fullName)}
              />
            </div>
          </Field>

          <Field label="Mobile Number" required error={errors.phone?.message}>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone is required',
                  pattern: { value: /^[+]?[0-9\s\-()]{8,15}$/, message: 'Invalid phone number' },
                })}
                placeholder="+91 98765 43210"
                className={withIconCls(errors.phone)}
              />
            </div>
          </Field>
        </div>

        <Field label="Email Address" required error={errors.email?.message}>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              })}
              placeholder="you@email.com"
              className={withIconCls(errors.email)}
            />
          </div>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Study Destination" required error={errors.destination?.message}>
            <select
              {...register('destination', { required: 'Please select destination' })}
              className={inputCls(errors.destination)}
            >
              <option value="">Select country</option>
              {destinationFormGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.items.map((d) => (
                    <option key={d.slug} value={d.name}>{d.flag} {d.name}</option>
                  ))}
                </optgroup>
              ))}
              <option value="Other">Other</option>
            </select>
          </Field>

          <Field label="Study Level" required error={errors.studyLevel?.message}>
            <select
              {...register('studyLevel', { required: 'Please select study level' })}
              className={inputCls(errors.studyLevel)}
            >
              <option value="">Select level</option>
              {studyLevels.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="University / Institution" error={errors.university?.message}>
            <input
              {...register('university')}
              placeholder="e.g. University of Toronto"
              className={inputCls(false)}
            />
          </Field>

          <Field label="Course / Program" required error={errors.courseProgram?.message}>
            <input
              {...register('courseProgram', { required: 'Course is required' })}
              placeholder="e.g. MSc Computer Science"
              className={inputCls(errors.courseProgram)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Loan Type" required error={errors.loanType?.message}>
            <select
              {...register('loanType', { required: 'Please select loan type' })}
              className={inputCls(errors.loanType)}
            >
              <option value="">Select loan type</option>
              {loanTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Loan Amount Required" required error={errors.loanAmount?.message}>
            <select
              {...register('loanAmount', { required: 'Please select loan amount' })}
              className={inputCls(errors.loanAmount)}
            >
              <option value="">Select amount range</option>
              {loanAmounts.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="City" required error={errors.city?.message}>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                {...register('city', { required: 'City is required' })}
                placeholder="Your city"
                className={withIconCls(errors.city)}
              />
            </div>
          </Field>

          <Field label="State" required error={errors.state?.message}>
            <input
              {...register('state', { required: 'State is required' })}
              placeholder="Your state"
              className={inputCls(errors.state)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Co-applicant Name" error={errors.coApplicantName?.message}>
            <input
              {...register('coApplicantName')}
              placeholder="Parent / guardian name"
              className={inputCls(false)}
            />
          </Field>

          <Field label="Co-applicant Monthly Income" error={errors.monthlyIncome?.message}>
            <input
              {...register('monthlyIncome')}
              placeholder="e.g. ₹50,000"
              className={inputCls(false)}
            />
          </Field>
        </div>

        <Field label="Additional Details (Optional)" error={errors.message?.message}>
          <textarea
            {...register('message')}
            rows={3}
            placeholder="Admission status, collateral availability, preferred bank, etc."
            className={`${inputCls(false)} resize-none`}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #A50000, #7A0000)' }}
        >
          {isSubmitting ? (
            <><FiLoader className="animate-spin" /> Submitting...</>
          ) : (
            <><FiSend /> Enquire Now</>
          )}
        </button>
      </form>
    </div>
  );
}
