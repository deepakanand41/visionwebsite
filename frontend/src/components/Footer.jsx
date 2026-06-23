import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { COMPANY } from '../utils/constants';

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/' },
    { label: 'Success Stories', to: '/success-stories' },
    { label: 'Refer & Earn', to: '/refer-and-earn' },
    { label: 'Contact Us', to: '/contact-us' },
  ],
  Services: [
    { label: 'Study Abroad Counselling', to: '/contact-us' },
    { label: 'IELTS / PTE Coaching', to: '/ielts-pte-training' },
    { label: 'Education Loans', to: '/education-loans' },
    { label: 'Visa Assistance', to: '/contact-us' },
  ],
  Destinations: [
    { label: '🇨🇦 Canada', to: '/study-abroad/canada' },
    { label: '🇦🇺 Australia', to: '/study-abroad/australia' },
    { label: '🇬🇧 United Kingdom', to: '/study-abroad/united-kingdom' },
    { label: '🇺🇸 United States', to: '/study-abroad/united-states' },
    { label: '🇩🇪 Germany', to: '/study-abroad/germany' },
    { label: '🇳🇿 New Zealand', to: '/study-abroad/new-zealand' },
  ],
};

const socials = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ backgroundColor: '#0A3D91' }} className="text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/footer-logo.png"
                alt="Vision International Educational Consultants"
                className="h-14 sm:h-16 w-auto max-w-full object-contain rounded-lg"
                draggable={false}
              />
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-5">
              Helping students achieve their dreams of studying abroad with expert guidance, visa assistance, test preparation and university admissions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href={`tel:${COMPANY.phoneTel}`} className="flex items-center gap-3 text-sm text-blue-200 hover:text-white transition-colors">
                <FiPhone className="shrink-0" style={{ color: '#F28C28' }} />
                <span>
                  <span className="block text-xs text-blue-300">{COMPANY.phoneLabel}</span>
                  {COMPANY.phone}
                </span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-blue-200 hover:text-white transition-colors">
                <FiMail className="shrink-0" style={{ color: '#F28C28' }} />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-blue-200">
                <FiMapPin className="shrink-0 mt-0.5" style={{ color: '#F28C28' }} />
                <span>
                  {COMPANY.contactName}
                  <br />
                  {COMPANY.address}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-blue-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-white mb-1">Subscribe to our newsletter</h4>
              <p className="text-sm text-blue-200">Get the latest updates on study abroad opportunities.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              {subscribed ? (
                <div className="px-4 py-2 bg-green-500/20 text-green-300 rounded-xl text-sm">
                  ✓ Subscribed successfully!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300 text-sm focus:outline-none focus:border-orange-400 flex-1 md:w-64"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl font-medium text-white flex items-center gap-2 text-sm transition-all hover:opacity-90"
                    style={{ background: '#F28C28' }}
                  >
                    <FiSend size={14} /> Subscribe
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-200">
            © {new Date().getFullYear()} Vision International Education & Visa Services. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-blue-200 hover:bg-orange-500 hover:text-white transition-all"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
