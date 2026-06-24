import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { submitReferral } from '../services/api';
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiSend, FiLoader,
  FiCheck, FiDollarSign, FiUsers, FiGift, FiAward
} from 'react-icons/fi';
import {
  FaHandshake, FaUserTie, FaGraduationCap, FaChalkboardTeacher,
  FaPlane, FaPassport, FaBriefcase, FaStore, FaWhatsapp,
  FaFacebookF, FaInstagram, FaSchool, FaCheckCircle,
  FaRupeeSign, FaArrowRight, FaStar
} from 'react-icons/fa';

/* ─── Constants ─────────────────────────────────────────── */

const countries = [
  'India', 'Canada', 'Australia', 'United Kingdom', 'United States',
  'Germany', 'New Zealand', 'UAE', 'Singapore', 'Other',
];

const occupations = [
  { value: 'student', label: 'Student', icon: FaGraduationCap },
  { value: 'freelancer', label: 'Freelancer', icon: FaUserTie },
  { value: 'education_consultant', label: 'Education Consultant', icon: FaHandshake },
  { value: 'teacher', label: 'Teacher / Trainer', icon: FaChalkboardTeacher },
  { value: 'travel_agent', label: 'Travel Agent', icon: FaPlane },
  { value: 'immigration_consultant', label: 'Immigration Consultant', icon: FaPassport },
  { value: 'working_professional', label: 'Working Professional', icon: FaBriefcase },
  { value: 'business_owner', label: 'Business Owner', icon: FaStore },
  { value: 'other', label: 'Other', icon: FiUsers },
];

const experienceOptions = ['Fresher', '1-2 Years', '3-5 Years', '5+ Years'];

const referralMethods = [
  { id: 'social_media', label: 'Social Media', icon: FaFacebookF },
  { id: 'friends_family', label: 'Friends & Family', icon: FiUsers },
  { id: 'seminars', label: 'Educational Seminars', icon: FaSchool },
  { id: 'whatsapp', label: 'WhatsApp Groups', icon: FaWhatsapp },
  { id: 'student_network', label: 'Existing Student Network', icon: FaGraduationCap },
  { id: 'coaching', label: 'Coaching Institutes', icon: FaChalkboardTeacher },
  { id: 'other', label: 'Other', icon: FiGift },
];

const monthlyReferralOptions = ['1-5', '5-10', '10-20', '20+'];

const benefits = [
  { icon: FiDollarSign, title: 'Attractive Commissions', desc: 'Earn competitive incentives on every successful student referral across all services.' },
  { icon: FiUsers, title: 'Grow Your Network', desc: 'Build meaningful connections in the overseas education industry with our partner community.' },
  { icon: FiGift, title: 'Bonus Rewards', desc: 'Unlock special bonuses for top referrers each quarter — vouchers, trips and more.' },
  { icon: FiAward, title: 'Official Associate ID', desc: 'Receive your unique Referral Associate ID for transparent tracking of all referrals.' },
];

const services = [
  { label: 'Study Abroad Counselling', color: '#A50000' },
  { label: 'IELTS / PTE Coaching', color: '#A50000' },
  { label: 'University Admissions', color: '#A50000' },
  { label: 'Education Loans', color: '#A50000' },
  { label: 'Visa Assistance', color: '#A50000' },
  { label: 'Scholarship Guidance', color: '#A50000' },
];

const howItWorks = [
  { step: '01', title: 'Register', desc: 'Fill out this form to apply as a Referral Associate.' },
  { step: '02', title: 'Get Approved', desc: 'Our team reviews and onboards you within 24-48 hrs.' },
  { step: '03', title: 'Refer Students', desc: 'Share your unique link or refer directly via our app.' },
  { step: '04', title: 'Earn Rewards', desc: 'Get paid for every successful conversion you bring.' },
];

/* ─── Sub-components ─────────────────────────────────────── */

function SectionTitle({ badge, title, highlight, subtitle, align = 'center' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const alignClass = align === 'left' ? 'text-left' : 'text-center';
  const subtitleClass = align === 'left' ? 'max-w-none' : 'max-w-2xl mx-auto';
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`${alignClass} mb-12`}
    >
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
        style={{ background: 'rgba(165,0,0,0.08)', color: '#A50000' }}
      >
        {badge}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
        {title}{' '}
        {highlight && (
          <span
            style={{
              background: 'linear-gradient(135deg, #A50000, #A50000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && <p className={`text-gray-500 text-lg ${subtitleClass}`}>{subtitle}</p>}
    </motion.div>
  );
}

function FieldWrapper({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

/* ─── Thank You Screen ────────────────────────────────────── */

function ThankYou({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg, #A50000, #C41E3A)' }}
      >
        <FaCheckCircle className="text-white text-4xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-3xl font-black text-gray-800 mb-2">
          Thank You for Joining Vision International! 🎉
        </h3>
        <p className="text-gray-500 text-lg mb-6 max-w-xl mx-auto leading-relaxed">
          Our Partnership Team will review your application and contact you within{' '}
          <strong className="text-gray-700">24–48 hours</strong> with your{' '}
          <strong className="text-gray-700">Referral Associate ID</strong>, commission structure,
          and onboarding details.
        </p>

        <div
          className="inline-block px-6 py-4 rounded-2xl mb-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(165,0,0,0.06), rgba(122,0,0,0.06))', border: '1px solid rgba(165,0,0,0.1)' }}
        >
          <p className="font-bold text-lg" style={{ color: '#A50000' }}>
            Start Referring. Start Earning. Grow With Vision International.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #A50000, #C41E3A)' }}
          >
            Back to Home
          </a>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-all hover:shadow-md"
            style={{ borderColor: '#A50000', color: '#A50000' }}
          >
            Submit Another Application
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */

export default function ReferAndEarn() {
  const [submitted, setSubmitted] = useState(false);
  const [referralMethods_, setReferralMethods_] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { referralMethods: [] } });

  const inputCls = (err) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white text-gray-800 ${
      err
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-red-700 focus:ring-2 focus:ring-red-50'
    }`;

  const withIconCls = (err) =>
    `w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all bg-white text-gray-800 ${
      err
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-red-700 focus:ring-2 focus:ring-red-50'
    }`;

  const toggleReferralMethod = (id) => {
    setReferralMethods_((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      setValue('referralMethods', next, { shouldValidate: true });
      return next;
    });
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading('Submitting your application...');
    try {
      const result = await submitReferral({
        fullName: data.fullName,
        mobile: data.mobile,
        whatsapp: data.whatsapp || null,
        email: data.email,
        dob: data.dob || null,
        city: data.city,
        state: data.state,
        country: data.country,
        occupation: data.occupation,
        organization: data.organization || null,
        experience: data.experience || null,
        referralMethods: referralMethods_,
        monthlyReferrals: data.monthlyReferrals,
        accountHolder: data.accountHolder || null,
        bankName: data.bankName || null,
        upiId: data.upiId || null,
        decAccurate: data.decAccurate,
        decTerms: data.decTerms,
        decContact: data.decContact,
      });
      toast.success(result.message || 'Application submitted!', { id: toastId, duration: 5000 });
      setSubmitted(true);
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.', { id: toastId });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setReferralMethods_([]);
    reset();
  };

  return (
    <>
      {/* ── Left: Hero + How It Works + Benefits + FAQ | Right: Registration ── */}
      <section
        className="pt-28 pb-16"
        style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 items-start">
            {/* Left column — sections 1 to 4 */}
            <div className="space-y-14">
              {/* Section 1 — Hero */}
              <div
                className="relative rounded-3xl overflow-hidden p-8 sm:p-10"
                style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 40%, #7A0000 100%)' }}
              >
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #A50000, transparent)' }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-5"
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#FEE2E2', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <FaHandshake /> Partner Programme
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                    Become a <span style={{ color: '#A50000' }}>Referral Associate</span>
                  </h1>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                    Join Vision International and earn attractive incentives by referring students for
                    Study Abroad, IELTS, PTE, Education Loans, and Visa Services.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: FaRupeeSign, label: 'Earn Per Referral' },
                      { icon: FiUsers, label: 'Unlimited Referrals' },
                      { icon: FiAward, label: 'Official Associate ID' },
                      { icon: FiGift, label: 'Quarterly Bonuses' },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 text-gray-200">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                          <Icon style={{ color: '#A50000' }} />
                        </div>
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Section 2 — How It Works */}
              <div>
                <SectionTitle badge="Simple Process" title="How It" highlight="Works" align="left" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {howItWorks.map((item, i) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="relative bg-white rounded-2xl p-6 text-center border border-gray-100"
                      style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.07)' }}
                    >
                      <div
                        className="text-3xl font-black mb-3"
                        style={{ color: i % 2 === 0 ? '#A50000' : '#A50000' }}
                      >
                        {item.step}
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Section 3 — Benefits */}
              <div>
                <SectionTitle
                  badge="Why Join Us"
                  title="What You"
                  highlight="Earn & Gain"
                  subtitle="Refer students across our services and get rewarded every time."
                  align="left"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {benefits.map((b, i) => (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(165,0,0,0.12)' }}
                      className="rounded-2xl p-6 border border-gray-100 transition-all bg-white"
                      style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: i % 2 === 0 ? 'rgba(165,0,0,0.08)' : 'rgba(122,0,0,0.08)' }}
                      >
                        <b.icon
                          className="text-xl"
                          style={{ color: i % 2 === 0 ? '#A50000' : '#A50000' }}
                        />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{b.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                    Earn on referrals for
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {services.map((s) => (
                      <span
                        key={s.label}
                        className="px-4 py-2 rounded-full text-sm font-medium border"
                        style={{
                          borderColor: `${s.color}30`,
                          background: `${s.color}08`,
                          color: s.color,
                        }}
                      >
                        ✓ {s.label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Section 4 — FAQ */}
              <div>
                <SectionTitle badge="Common Questions" title="Referral Associate" highlight="FAQs" align="left" />
                <div className="space-y-3">
                  {[
                    {
                      q: 'Is there any registration fee to become a Referral Associate?',
                      a: 'No. Becoming a Referral Associate with Vision International is completely free. There are no hidden fees or charges.',
                    },
                    {
                      q: 'When and how do I receive my commission?',
                      a: 'Commissions are processed after a referred student completes enrolment and payment. Payouts are made monthly via bank transfer or UPI.',
                    },
                    {
                      q: 'Is there a limit on how many students I can refer?',
                      a: 'There is no cap. You can refer as many students as you want — more referrals simply mean higher earnings and potential bonus tier rewards.',
                    },
                    {
                      q: 'Can I track my referrals and commissions?',
                      a: 'Yes. Once onboarded, you\'ll receive access to a referral dashboard where you can monitor all your referrals, their status, and your earnings in real time.',
                    },
                  ].map((item, i) => (
                    <FAQMini key={i} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — Registration Form (full height, from top) */}
            <div id="register" className="w-full lg:self-start">
              <SectionTitle
                badge="Registration"
                title="Join as Referral"
                highlight="Associate"
                subtitle="Fill in your details and we'll onboard you within 24-48 hours."
                align="left"
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl"
                style={{ boxShadow: '0 12px 60px rgba(165,0,0,0.12)' }}
              >
            <AnimatePresence mode="wait">
              {submitted ? (
                <ThankYou key="thankyou" onReset={handleReset} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  {/* ── Personal Information ──────────────────── */}
                  <div
                    className="px-8 py-5 border-b border-gray-100"
                    style={{ background: 'linear-gradient(90deg, rgba(165,0,0,0.04), rgba(122,0,0,0.04))' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: '#A50000' }}
                      >
                        <FiUser className="text-white" size={16} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">Personal Information</h3>
                    </div>
                  </div>

                  <div className="px-8 py-6 space-y-5">
                    {/* Full Name */}
                    <FieldWrapper label="Full Name" required error={errors.fullName?.message}>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                        <input
                          {...register('fullName', {
                            required: 'Full name is required',
                            minLength: { value: 3, message: 'Minimum 3 characters' },
                          })}
                          placeholder="e.g. Rahul Sharma"
                          className={withIconCls(errors.fullName)}
                        />
                      </div>
                    </FieldWrapper>

                    {/* Mobile & WhatsApp */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FieldWrapper label="Mobile Number" required error={errors.mobile?.message}>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                          <input
                            type="tel"
                            {...register('mobile', {
                              required: 'Mobile number is required',
                              pattern: { value: /^[+]?[0-9\s\-()]{8,15}$/, message: 'Invalid number' },
                            })}
                            placeholder="+91 98765 43210"
                            className={withIconCls(errors.mobile)}
                          />
                        </div>
                      </FieldWrapper>

                      <FieldWrapper label="WhatsApp Number" error={errors.whatsapp?.message}>
                        <div className="relative">
                          <FaWhatsapp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                          <input
                            type="tel"
                            {...register('whatsapp', {
                              pattern: { value: /^[+]?[0-9\s\-()]{8,15}$/, message: 'Invalid number' },
                            })}
                            placeholder="Same as mobile if same"
                            className={withIconCls(errors.whatsapp)}
                          />
                        </div>
                      </FieldWrapper>
                    </div>

                    {/* Email */}
                    <FieldWrapper label="Email Address" required error={errors.email?.message}>
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
                    </FieldWrapper>

                    {/* DOB */}
                    <FieldWrapper label="Date of Birth" error={errors.dob?.message}>
                      <input
                        type="date"
                        {...register('dob')}
                        className={inputCls(errors.dob)}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </FieldWrapper>

                    {/* City & State */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FieldWrapper label="City" required error={errors.city?.message}>
                        <div className="relative">
                          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                          <input
                            {...register('city', { required: 'City is required' })}
                            placeholder="e.g. Mumbai"
                            className={withIconCls(errors.city)}
                          />
                        </div>
                      </FieldWrapper>
                      <FieldWrapper label="State" required error={errors.state?.message}>
                        <div className="relative">
                          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                          <input
                            {...register('state', { required: 'State is required' })}
                            placeholder="e.g. Maharashtra"
                            className={withIconCls(errors.state)}
                          />
                        </div>
                      </FieldWrapper>
                    </div>

                    {/* Country */}
                    <FieldWrapper label="Country" required error={errors.country?.message}>
                      <select
                        {...register('country', { required: 'Please select your country' })}
                        className={inputCls(errors.country)}
                      >
                        <option value="">Select your country</option>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </FieldWrapper>
                  </div>

                  {/* ── Professional Information ──────────────── */}
                  <div
                    className="px-8 py-5 border-t border-b border-gray-100"
                    style={{ background: 'linear-gradient(90deg, rgba(122,0,0,0.04), rgba(165,0,0,0.04))' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: '#A50000' }}
                      >
                        <FaBriefcase className="text-white" size={14} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">Professional Information</h3>
                    </div>
                  </div>

                  <div className="px-8 py-6 space-y-5">
                    {/* Occupation — card-style selector */}
                    <FieldWrapper label="Occupation" required error={errors.occupation?.message}>
                      <input type="hidden" {...register('occupation', { required: 'Please select your occupation' })} />
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {occupations.map((occ) => {
                          const selected = watch('occupation') === occ.value;
                          return (
                            <button
                              key={occ.value}
                              type="button"
                              onClick={() => setValue('occupation', occ.value, { shouldValidate: true })}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all"
                              style={{
                                borderColor: selected ? '#A50000' : '#e5e7eb',
                                background: selected ? 'rgba(165,0,0,0.06)' : 'white',
                                color: selected ? '#A50000' : '#4b5563',
                              }}
                            >
                              <occ.icon size={14} style={{ color: selected ? '#A50000' : '#9ca3af' }} />
                              {occ.label}
                              {selected && <FiCheck className="ml-auto shrink-0 text-red-800" size={13} />}
                            </button>
                          );
                        })}
                      </div>
                    </FieldWrapper>

                    {/* Org name */}
                    <FieldWrapper label="Organization Name (if applicable)" error={errors.organization?.message}>
                      <input
                        {...register('organization')}
                        placeholder="e.g. ABC Education Institute"
                        className={inputCls(errors.organization)}
                      />
                    </FieldWrapper>

                    {/* Experience */}
                    <FieldWrapper label="Years of Experience" error={errors.experience?.message}>
                      <select {...register('experience')} className={inputCls(errors.experience)}>
                        <option value="">Select experience</option>
                        {experienceOptions.map((e) => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </FieldWrapper>
                  </div>

                  {/* ── Referral Network ──────────────────────── */}
                  <div
                    className="px-8 py-5 border-t border-b border-gray-100"
                    style={{ background: 'linear-gradient(90deg, rgba(165,0,0,0.04), rgba(122,0,0,0.04))' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: '#A50000' }}
                      >
                        <FiUsers className="text-white" size={16} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">Referral Network Information</h3>
                    </div>
                  </div>

                  <div className="px-8 py-6 space-y-5">
                    {/* How to refer — checkbox cards */}
                    <FieldWrapper
                      label="How do you plan to refer students?"
                      required
                      error={errors.referralMethods?.message}
                    >
                      <input
                        type="hidden"
                        {...register('referralMethods', {
                          validate: (v) => (Array.isArray(v) && v.length > 0) || 'Select at least one method',
                        })}
                      />
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                        {referralMethods.map((m) => {
                          const selected = referralMethods_.includes(m.id);
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => toggleReferralMethod(m.id)}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left"
                              style={{
                                borderColor: selected ? '#A50000' : '#e5e7eb',
                                background: selected ? 'rgba(122,0,0,0.07)' : 'white',
                                color: selected ? '#7A0000' : '#4b5563',
                              }}
                            >
                              <div
                                className="w-4 h-4 rounded border-2 flex items-center justify-center shrink-0"
                                style={{
                                  borderColor: selected ? '#A50000' : '#d1d5db',
                                  background: selected ? '#A50000' : 'transparent',
                                }}
                              >
                                {selected && <FiCheck className="text-white" size={10} />}
                              </div>
                              <m.icon size={12} className="shrink-0" />
                              {m.label}
                            </button>
                          );
                        })}
                      </div>
                    </FieldWrapper>

                    {/* Monthly referrals */}
                    <FieldWrapper
                      label="Estimated Referrals Per Month"
                      required
                      error={errors.monthlyReferrals?.message}
                    >
                      <div className="flex flex-wrap gap-2 mt-1">
                        {monthlyReferralOptions.map((opt) => {
                          const selected = watch('monthlyReferrals') === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setValue('monthlyReferrals', opt, { shouldValidate: true })}
                              className="px-5 py-2 rounded-xl border text-sm font-semibold transition-all"
                              style={{
                                borderColor: selected ? '#A50000' : '#e5e7eb',
                                background: selected ? '#A50000' : 'white',
                                color: selected ? 'white' : '#4b5563',
                              }}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="hidden"
                        {...register('monthlyReferrals', { required: 'Please select estimated referrals' })}
                      />
                    </FieldWrapper>
                  </div>

                  {/* ── Bank Details ──────────────────────────── */}
                  <div
                    className="px-8 py-5 border-t border-b border-gray-100"
                    style={{ background: 'linear-gradient(90deg, rgba(122,0,0,0.04), rgba(165,0,0,0.04))' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: '#A50000' }}
                      >
                        <FiDollarSign className="text-white" size={16} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">Bank Details</h3>
                        <p className="text-xs text-gray-400">Optional — can be updated later after onboarding</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FieldWrapper label="Account Holder Name">
                        <input
                          {...register('accountHolder')}
                          placeholder="As per bank records"
                          className={inputCls(false)}
                        />
                      </FieldWrapper>
                      <FieldWrapper label="Bank Name">
                        <input
                          {...register('bankName')}
                          placeholder="e.g. HDFC Bank"
                          className={inputCls(false)}
                        />
                      </FieldWrapper>
                    </div>
                    <FieldWrapper label="UPI ID">
                      <input
                        {...register('upiId')}
                        placeholder="e.g. name@upi"
                        className={inputCls(false)}
                      />
                    </FieldWrapper>
                  </div>

                  {/* ── Declaration ───────────────────────────── */}
                  <div
                    className="px-8 py-5 border-t border-b border-gray-100"
                    style={{ background: 'linear-gradient(90deg, rgba(165,0,0,0.04), rgba(122,0,0,0.04))' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: '#A50000' }}
                      >
                        <FaCheckCircle className="text-white" size={14} />
                      </div>
                      <h3 className="font-bold text-gray-800 text-lg">Declaration</h3>
                    </div>
                  </div>

                  <div className="px-8 py-6 space-y-3">
                    {[
                      {
                        name: 'decAccurate',
                        text: 'I confirm that all information provided is accurate and complete.',
                        required: true,
                        error: errors.decAccurate?.message,
                      },
                      {
                        name: 'decTerms',
                        text: (
                          <>
                            I agree to Vision International's{' '}
                            <a href="#" className="underline" style={{ color: '#A50000' }}>
                              Referral Associate Terms & Conditions
                            </a>.
                          </>
                        ),
                        required: true,
                        error: errors.decTerms?.message,
                      },
                      {
                        name: 'decContact',
                        text: 'I consent to being contacted regarding partnership opportunities and updates.',
                        required: false,
                      },
                    ].map((d) => (
                      <div key={d.name}>
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            {...register(d.name, d.required ? { required: 'This confirmation is required' } : {})}
                            className="mt-0.5 accent-red-700 w-4 h-4 shrink-0"
                          />
                          <span className="text-sm text-gray-600 leading-relaxed">{d.text}</span>
                        </label>
                        {d.error && (
                          <p className="text-red-500 text-xs mt-1 ml-7">⚠ {d.error}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* ── Submit ────────────────────────────────── */}
                  <div className="px-8 pb-8">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all hover:shadow-xl hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #A50000 0%, #C41E3A 50%, #A50000 100%)', backgroundSize: '200%' }}
                    >
                      <FaHandshake size={20} />
                      JOIN AS REFERRAL ASSOCIATE
                      <FaArrowRight size={16} />
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-3">
                      You'll receive your Associate ID and onboarding details within 24-48 hours.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FAQMini({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl border border-gray-200 overflow-hidden"
      style={{ boxShadow: open ? '0 4px 16px rgba(165,0,0,0.08)' : 'none' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
        style={{ background: open ? 'rgba(165,0,0,0.02)' : 'white' }}
      >
        <span className="font-semibold text-gray-800 pr-4 text-sm">{item.q}</span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: open ? '#A50000' : 'rgba(165,0,0,0.08)' }}
        >
          <span className="text-sm font-bold" style={{ color: open ? 'white' : '#A50000' }}>
            {open ? '−' : '+'}
          </span>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
