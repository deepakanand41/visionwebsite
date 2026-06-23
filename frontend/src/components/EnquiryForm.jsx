import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiSend, FiLoader } from 'react-icons/fi';
import { FaCheckCircle, FaGlobeAmericas, FaGraduationCap } from 'react-icons/fa';
import { submitEnquiry } from '../services/api';

const destinations = [
  'Canada', 'Australia', 'United Kingdom', 'United States', 'Germany', 'New Zealand', 'Other',
];
const studyLevels = [
  'Diploma', 'Undergraduate (Bachelor\'s)', 'Postgraduate (Master\'s)', 'PhD / Doctoral', 'Foundation / Pre-University',
];
const intakeYears = ['2025 (Jan)', '2025 (Sep)', '2026 (Jan)', '2026 (Sep)', '2027 and beyond'];
const counsellingModes = ['Online (Video Call)', 'In-Person (Visit Office)', 'Phone Call', 'WhatsApp'];
const fundingSources = ['Self-Funded', 'Education Loan', 'Scholarship', 'Sponsor / Family', 'Mix of Above'];

const floatingBenefits = [
  '✓ Free Profile Evaluation',
  '✓ Visa Guidance',
  '✓ Scholarship Support',
  '✓ University Selection',
];

function InputField({ label, id, icon: Icon, error, children, required }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={16} />
          </div>
        )}
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function EnquiryForm() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      destination: data.destination,
      studyLevel: data.studyLevel,
      intake: data.intake,
      counsellingMode: data.counsellingMode,
      fundingSource: data.fundingSource,
      acceptTerms: data.acceptTerms,
      contactPermission: data.contactPermission,
    };

    const toastId = toast.loading('Submitting your enquiry...');
    setLoading(true);
    try {
      const result = await submitEnquiry(payload);
      toast.success(result.message || '🎉 Your enquiry has been submitted!', {
        id: toastId,
        duration: 5000,
      });
      reset();
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50'
    } bg-white text-gray-800`;

  const inputWithIconClass = (hasError) =>
    `w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-50'
    } bg-white text-gray-800`;

  return (
    <section id="enquiry" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(10,61,145,0.08)', color: '#0A3D91' }}
          >
            Free Counselling
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Start Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0A3D91, #F28C28)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Study Abroad Journey
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Fill out the form and our expert counsellor will contact you within 24 hours — completely free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white rounded-3xl p-8 border border-gray-100"
            style={{ boxShadow: '0 8px 40px rgba(10,61,145,0.08)' }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">Get FREE Counselling Today</h3>
              <p className="text-sm text-gray-500 mt-1">Fill out the form and our expert counsellor will contact you.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="First Name" id="firstName" icon={FiUser} error={errors.firstName?.message} required>
                  <input
                    id="firstName"
                    {...register('firstName', { required: 'First name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
                    className={inputWithIconClass(!!errors.firstName)}
                    placeholder="e.g. Rahul"
                  />
                </InputField>
                <InputField label="Last Name" id="lastName" icon={FiUser} error={errors.lastName?.message} required>
                  <input
                    id="lastName"
                    {...register('lastName', { required: 'Last name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
                    className={inputWithIconClass(!!errors.lastName)}
                    placeholder="e.g. Sharma"
                  />
                </InputField>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Email Address" id="email" icon={FiMail} error={errors.email?.message} required>
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' },
                    })}
                    className={inputWithIconClass(!!errors.email)}
                    placeholder="you@email.com"
                  />
                </InputField>
                <InputField label="Mobile Number" id="phone" icon={FiPhone} error={errors.phone?.message} required>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: { value: /^[+]?[0-9\s\-()]{8,15}$/, message: 'Invalid phone number' },
                    })}
                    className={inputWithIconClass(!!errors.phone)}
                    placeholder="+91 98765 43210"
                  />
                </InputField>
              </div>

              {/* Destination & Study Level */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Preferred Destination" id="destination" icon={FaGlobeAmericas} error={errors.destination?.message} required>
                  <select
                    id="destination"
                    {...register('destination', { required: 'Please select a destination' })}
                    className={inputWithIconClass(!!errors.destination)}
                  >
                    <option value="">Select country</option>
                    {destinations.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </InputField>
                <InputField label="Study Level" id="studyLevel" icon={FaGraduationCap} error={errors.studyLevel?.message} required>
                  <select
                    id="studyLevel"
                    {...register('studyLevel', { required: 'Please select study level' })}
                    className={inputWithIconClass(!!errors.studyLevel)}
                  >
                    <option value="">Select level</option>
                    {studyLevels.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </InputField>
              </div>

              {/* Intake & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Intake Year" id="intake" error={errors.intake?.message} required>
                  <select
                    id="intake"
                    {...register('intake', { required: 'Please select intake' })}
                    className={inputClass(!!errors.intake)}
                  >
                    <option value="">Select intake</option>
                    {intakeYears.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </InputField>
                <InputField label="Preferred Counselling Mode" id="counsellingMode" error={errors.counsellingMode?.message} required>
                  <select
                    id="counsellingMode"
                    {...register('counsellingMode', { required: 'Please select a mode' })}
                    className={inputClass(!!errors.counsellingMode)}
                  >
                    <option value="">Select mode</option>
                    {counsellingModes.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </InputField>
              </div>

              {/* Funding */}
              <InputField label="Funding Source" id="fundingSource" error={errors.fundingSource?.message} required>
                <select
                  id="fundingSource"
                  {...register('fundingSource', { required: 'Please select funding source' })}
                  className={inputClass(!!errors.fundingSource)}
                >
                  <option value="">Select funding source</option>
                  {fundingSources.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </InputField>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('acceptTerms', { required: 'You must accept the terms' })}
                    className="mt-0.5 accent-blue-700"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="underline" style={{ color: '#0A3D91' }}>Terms & Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="underline" style={{ color: '#0A3D91' }}>Privacy Policy</a>
                    <span className="text-red-500"> *</span>
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('contactPermission')}
                    className="mt-0.5 accent-blue-700"
                  />
                  <span className="text-sm text-gray-600">
                    I consent to being contacted via phone, email, or WhatsApp regarding my enquiry.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)' }}
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <FiSend /> Avail FREE Counselling
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right info panel — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Main visual card */}
            <div
              className="rounded-3xl overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, #0A3D91 0%, #1a5cb8 100%)',
                minHeight: '300px',
              }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  <circle cx="350" cy="50" r="150" fill="white" />
                  <circle cx="30" cy="280" r="100" fill="white" />
                </svg>
              </div>
              <div className="relative z-10 p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="text-6xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-white mb-2">Free Profile Evaluation</h3>
                <p className="text-blue-200 text-sm mb-6 leading-relaxed">
                  Our experts will assess your academic profile and recommend the best universities and countries for you.
                </p>
                <div className="flex gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black text-white">24hr</div>
                    <div className="text-xs text-blue-200">Response</div>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div>
                    <div className="text-2xl font-black text-white">Free</div>
                    <div className="text-xs text-blue-200">Consultation</div>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div>
                    <div className="text-2xl font-black text-white">100%</div>
                    <div className="text-xs text-blue-200">Confidential</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits list */}
            <div
              className="rounded-3xl p-6 border border-gray-100"
              style={{ background: 'linear-gradient(135deg, #f8faff, #fff8f0)', boxShadow: '0 4px 20px rgba(10,61,145,0.06)' }}
            >
              <h4 className="font-bold text-gray-800 mb-4">What you get for FREE:</h4>
              <div className="space-y-3">
                {floatingBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(10,61,145,0.08)' }}
                    >
                      <FaCheckCircle style={{ color: '#0A3D91' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{benefit.slice(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '15,000+', label: 'Students Placed' },
                { value: '98%', label: 'Visa Success' },
                { value: '500+', label: 'Universities' },
                { value: '10+', label: 'Years Exp.' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="rounded-2xl p-4 text-center border border-gray-100 bg-white"
                  style={{ boxShadow: '0 2px 10px rgba(10,61,145,0.06)' }}
                >
                  <div className="font-black text-xl" style={{ color: '#0A3D91' }}>{b.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{b.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
