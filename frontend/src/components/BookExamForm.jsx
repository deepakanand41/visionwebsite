import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiSend, FiLoader } from 'react-icons/fi';
import { submitEnquiry } from '../services/api';
import { HOME_THEME as T } from '../utils/constants';

const examCities = [
  'Karnal', 'Delhi', 'Chandigarh', 'Ambala', 'Panipat', 'Kurukshetra', 'Online / Any City', 'Other',
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

export default function BookExamForm({ examType }) {
  const isIelts = examType === 'ielts';
  const examLabel = isIelts ? 'IELTS' : 'PTE';

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
    const toastId = toast.loading('Submitting your enquiry...');
    try {
      const result = await submitEnquiry({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        destination: `${examLabel} Exam Booking`,
        studyLevel: data.notes
          ? `${data.examFormat} | Notes: ${data.notes}`
          : data.examFormat,
        intake: data.examDate,
        counsellingMode: data.preferredCity,
        fundingSource: 'Self-Funded',
        acceptTerms: data.acceptTerms,
        contactPermission: data.contactPermission,
      });
      toast.success(result.message || `Your ${examLabel} exam enquiry has been submitted!`, {
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
      id="book-exam-form"
      className="rounded-3xl p-6 sm:p-8 border border-gray-100 bg-white"
      style={{ boxShadow: '0 8px 40px rgba(165,0,0,0.1)' }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800">Book {examLabel} Exam</h3>
        <p className="text-sm text-gray-500 mt-1">
          Share your details and our team will help you with exam registration, slot selection, and preparation guidance.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" required error={errors.firstName?.message}>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                {...register('firstName', { required: 'First name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
                placeholder="First name"
                className={withIconCls(errors.firstName)}
              />
            </div>
          </Field>
          <Field label="Last Name" required error={errors.lastName?.message}>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                {...register('lastName', { required: 'Last name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
                placeholder="Last name"
                className={withIconCls(errors.lastName)}
              />
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <Field label="Exam Type" required error={errors.examFormat?.message}>
          <select
            {...register('examFormat', { required: 'Please select exam type' })}
            className={inputCls(errors.examFormat)}
          >
            <option value="">Select exam type</option>
            {isIelts ? (
              <>
                <option value="IELTS Academic - Computer">IELTS Academic (Computer)</option>
                <option value="IELTS Academic - Paper">IELTS Academic (Paper)</option>
                <option value="IELTS General - Computer">IELTS General Training (Computer)</option>
                <option value="IELTS General - Paper">IELTS General Training (Paper)</option>
                <option value="IELTS UKVI">IELTS UKVI</option>
              </>
            ) : (
              <>
                <option value="PTE Academic">PTE Academic</option>
                <option value="PTE Core">PTE Core</option>
                <option value="PTE UKVI">PTE UKVI</option>
              </>
            )}
          </select>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Preferred Exam Date" required error={errors.examDate?.message}>
            <input
              type="date"
              {...register('examDate', { required: 'Please select preferred date' })}
              min={new Date().toISOString().split('T')[0]}
              className={inputCls(errors.examDate)}
            />
          </Field>
          <Field label="Preferred Test City" required error={errors.preferredCity?.message}>
            <select
              {...register('preferredCity', { required: 'Please select a city' })}
              className={inputCls(errors.preferredCity)}
            >
              <option value="">Select city</option>
              {examCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Additional Notes (Optional)" error={errors.notes?.message}>
          <textarea
            {...register('notes')}
            rows={3}
            placeholder="Passport details, target university deadline, or any special request..."
            className={`${inputCls(false)} resize-none`}
          />
        </Field>

        <div className="space-y-2.5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('acceptTerms', { required: 'You must accept the terms' })}
              className="mt-0.5 accent-red-700"
            />
            <span className="text-sm text-gray-600">
              I agree to the Terms &amp; Conditions and Privacy Policy
              <span className="text-red-500"> *</span>
            </span>
          </label>
          {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>}

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" {...register('contactPermission')} className="mt-0.5 accent-red-700" />
            <span className="text-sm text-gray-600">
              I consent to being contacted via phone, email, or WhatsApp regarding my exam booking enquiry.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: T.gradientRed }}
        >
          {isSubmitting ? (
            <><FiLoader className="animate-spin" /> Submitting...</>
          ) : (
            <><FiSend /> Enquire to Book Exam</>
          )}
        </button>
      </form>
    </div>
  );
}
