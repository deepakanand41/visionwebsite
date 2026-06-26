import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiSend, FiLoader, FiCalendar } from 'react-icons/fi';
import { submitTouristVisaEnquiry } from '../services/api';

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
}

export default function TouristVisaEnquiryForm({ countrySlug, countryName }) {
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
    const toastId = toast.loading('Submitting your visa enquiry...');
    try {
      const result = await submitTouristVisaEnquiry({
        countrySlug,
        countryName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        travelDate: data.travelDate || null,
        purpose: data.purpose || null,
        message: data.message || null,
        acceptTerms: data.acceptTerms,
        contactPermission: data.contactPermission,
      });
      toast.success(result.message || 'Your visa enquiry has been submitted!', { id: toastId, duration: 5000 });
      reset();
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.', { id: toastId });
    }
  };

  return (
    <div
      id="visa-enquiry-form"
      className="rounded-3xl p-6 sm:p-8 border border-gray-100 bg-white"
      style={{ boxShadow: '0 8px 40px rgba(165,0,0,0.1)' }}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800">Visa Enquiry — {countryName}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Share your travel plans and our visa experts will guide you through documentation and application.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="First Name" required error={errors.firstName}>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input {...register('firstName', { required: 'First name is required' })} className={withIconCls(errors.firstName)} placeholder="First name" />
            </div>
          </Field>
          <Field label="Last Name" required error={errors.lastName}>
            <input {...register('lastName', { required: 'Last name is required' })} className={inputCls(errors.lastName)} placeholder="Last name" />
          </Field>
        </div>

        <Field label="Email" required error={errors.email}>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="email"
              {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' } })}
              className={withIconCls(errors.email)}
              placeholder="you@email.com"
            />
          </div>
        </Field>

        <Field label="Phone" required error={errors.phone}>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              {...register('phone', { required: 'Phone is required', minLength: { value: 8, message: 'Enter a valid phone number' } })}
              className={withIconCls(errors.phone)}
              placeholder="+91 98765 43210"
            />
          </div>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Planned Travel Date" error={errors.travelDate}>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="date" {...register('travelDate')} className={withIconCls(errors.travelDate)} />
            </div>
          </Field>
          <Field label="Purpose of Visit" error={errors.purpose}>
            <select {...register('purpose')} className={inputCls(errors.purpose)} defaultValue="">
              <option value="">Select purpose</option>
              <option value="Tourism">Tourism / Holiday</option>
              <option value="Family Visit">Family Visit</option>
              <option value="Business">Business Trip</option>
              <option value="Other">Other</option>
            </select>
          </Field>
        </div>

        <Field label="Message" error={errors.message}>
          <textarea {...register('message')} rows={3} className={inputCls(errors.message)} placeholder="Tell us about your travel plans or any questions..." />
        </Field>

        <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" {...register('acceptTerms', { required: 'You must accept the terms' })} className="mt-0.5 accent-red-700" />
          <span>I agree to the terms and privacy policy *</span>
        </label>
        {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>}

        <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" {...register('contactPermission')} className="mt-0.5 accent-red-700" />
          <span>I allow Vision International to contact me via phone, WhatsApp, or email</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #A50000, #7A0000)' }}
        >
          {isSubmitting ? <FiLoader className="animate-spin" size={18} /> : <FiSend size={18} />}
          {isSubmitting ? 'Submitting...' : 'Submit Visa Enquiry'}
        </button>
      </form>
    </div>
  );
}
