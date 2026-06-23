import { ServiceHero } from '../components/PageLayouts';
import EnquiryForm from '../components/EnquiryForm';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { COMPANY } from '../utils/constants';

const contactInfo = [
  {
    icon: FiPhone,
    label: COMPANY.phoneLabel,
    value: COMPANY.phone,
    href: `tel:${COMPANY.phoneTel}`,
  },
  { icon: FiMail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: FiMapPin, label: 'Address', value: COMPANY.addressFull, href: null },
  { icon: FiClock, label: 'Working Hours', value: 'Mon – Sat: 9:00 AM – 7:00 PM', href: null },
];

export default function ContactUs() {
  return (
    <main>
      <ServiceHero
        badge="Contact Us"
        title="Get FREE"
        highlight="Counselling Today"
        subtitle="Speak with our expert counsellors about your study abroad plans. We're here to help you every step of the way — completely free."
        features={['24hr Response Time', '100% Confidential', 'Expert Counsellors', 'No Hidden Charges']}
      />

      {/* Contact info cards */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((c) => (
              <div key={c.label} className="rounded-2xl p-5 border border-gray-100 text-center" style={{ boxShadow: '0 4px 20px rgba(10,61,145,0.06)' }}>
                <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(10,61,145,0.08)' }}>
                  <c.icon style={{ color: '#0A3D91' }} />
                </div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{c.label}</div>
                {c.href ? (
                  <a href={c.href} className="text-sm font-medium text-gray-800 hover:text-blue-700 transition-colors">{c.value}</a>
                ) : (
                  <div className="text-sm font-medium text-gray-800">{c.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquiryForm />
    </main>
  );
}
