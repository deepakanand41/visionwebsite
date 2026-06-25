import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { COMPANY, SOCIAL_LINKS } from '../utils/constants';

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/' },
    { label: 'News & Articles', to: '/news' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/careers' },
    { label: 'Offers', to: '/offers' },
    { label: 'Success Stories', to: '/success-stories' },
    { label: 'Refer & Earn', to: '/refer-and-earn' },
    { label: 'Contact Us', to: '/contact-us' },
  ],
  Services: [
    { label: 'Study Abroad Counselling', to: '/contact-us' },
    { label: 'IELTS Coaching', to: '/ielts-training' },
    { label: 'PTE Coaching', to: '/pte-training' },
    { label: 'Education Loans', to: '/education-loans' },
    { label: 'Visa Assistance', to: '/contact-us' },
  ],
  Destinations: [
    { label: '🇨🇦 Canada', to: '/study-abroad/canada' },
    { label: '🇦🇺 Australia', to: '/study-abroad/australia' },
    { label: '🇬🇧 United Kingdom', to: '/study-abroad/united-kingdom' },
    { label: '🇺🇸 United States', to: '/study-abroad/united-states' },
    { label: '🇳🇿 New Zealand', to: '/study-abroad/new-zealand' },
    { label: '🇫🇷 France', to: '/study-abroad/france' },
    { label: '🇸🇬 Singapore', to: '/study-abroad/singapore' },
  ],
};

const socials = [
  { icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: FaYoutube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
  { icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(180deg, #111111 0%, #1a1a1a 100%)' }} className="text-white">
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
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              Helping students achieve their dreams of studying abroad with expert guidance, visa assistance, test preparation and university admissions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href={`tel:${COMPANY.phoneTel}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
                <FiPhone className="shrink-0" style={{ color: '#A50000' }} />
                <span>
                  <span className="block text-xs text-gray-400">{COMPANY.phoneLabel}</span>
                  {COMPANY.phone}
                </span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors">
                <FiMail className="shrink-0" style={{ color: '#A50000' }} />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <FiMapPin className="shrink-0 mt-0.5" style={{ color: '#A50000' }} />
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
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Vision International Education Consultants. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition-all"
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
