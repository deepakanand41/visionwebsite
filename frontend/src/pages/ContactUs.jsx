import { motion } from 'framer-motion';
import { EnquiryFormCard } from '../components/EnquiryForm';
import { FiPhone, FiMail, FiMapPin, FiUser } from 'react-icons/fi';
import { COMPANY, BRANCHES, CORPORATE_OFFICE_IMAGE, HOME_THEME as T } from '../utils/constants';

function CorporateOfficePanel() {
  return (
    <div
      className="rounded-3xl overflow-hidden border border-gray-100 bg-white"
      style={{ boxShadow: '0 8px 32px rgba(165,0,0,0.08)' }}
    >
      <h2 className="text-lg font-bold text-gray-900 px-5 pt-5 pb-3">Corporate Office</h2>
      <div className="relative h-48 sm:h-56 bg-gray-100">
        <img
          src={CORPORATE_OFFICE_IMAGE}
          alt="Vision International Corporate Office, Karnal"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.45) 0%, transparent 60%)' }}
        />
      </div>
      <div className="p-5 space-y-3">
        <p className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
          <FiMapPin className="shrink-0 mt-0.5" style={{ color: T.red }} size={16} />
          <span>{COMPANY.address}</span>
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <FiPhone className="shrink-0" style={{ color: T.red }} size={16} />
          <a href={`tel:${COMPANY.phoneTel}`} className="hover:underline" style={{ color: T.red }}>
            091435-40000
          </a>
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          <FiMail className="shrink-0" style={{ color: T.red }} size={16} />
          <a href={`mailto:${COMPANY.email}`} className="hover:underline" style={{ color: T.red }}>
            {COMPANY.email}
          </a>
        </p>
      </div>
    </div>
  );
}

function BranchCard({ branch, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-2xl p-5 border border-gray-100 bg-gray-50 min-h-[180px]"
      style={{ boxShadow: '0 2px 12px rgba(165,0,0,0.04)' }}
    >
      <h3 className="font-bold text-gray-900 text-base mb-3">{branch.name}</h3>
      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-start gap-2">
          <FiUser className="shrink-0 mt-0.5" style={{ color: T.red }} size={14} />
          <span>{branch.contact}</span>
        </p>
        <p className="flex items-start gap-2">
          <FiPhone className="shrink-0 mt-0.5" style={{ color: T.red }} size={14} />
          <span className="font-medium text-gray-800">{branch.phone}</span>
        </p>
        <p className="flex items-start gap-2">
          <FiMapPin className="shrink-0 mt-0.5" style={{ color: T.red }} size={14} />
          <span className="leading-relaxed">{branch.address}</span>
        </p>
      </div>
    </motion.div>
  );
}

export default function ContactUs() {
  return (
    <main>
      <section className="pt-28 lg:pt-36 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left — intro + corporate office */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{ background: T.redSoft, color: T.red }}
                >
                  Contact Us
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Get FREE{' '}
                  <span style={{ color: T.red }}>Counselling Today</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Speak with our expert counsellors about your study abroad plans. We&apos;re here to help you
                  every step of the way — completely free.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['24hr Response Time', '100% Confidential', 'Expert Counsellors', 'No Hidden Charges'].map((f) => (
                    <span
                      key={f}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                      style={{ borderColor: 'rgba(165,0,0,0.2)', background: T.redSoft, color: T.red }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <CorporateOfficePanel />
            </motion.div>

            {/* Right — counselling form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="w-full lg:sticky lg:top-24"
            >
              <EnquiryFormCard
                title="Get FREE Counselling Today"
                subtitle="Fill out the form and our expert counsellor will contact you within 24 hours."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Branches */}
      <section className="py-14" style={{ background: T.gradientLight }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">Our Branches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRANCHES.map((branch, index) => (
              <BranchCard key={branch.name} branch={branch} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
