import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { SOCIAL_LINKS, HOME_THEME as T } from '../utils/constants';

const socialItems = [
  { icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: FaYoutube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
  { icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
];

export default function FloatingSocialLinks() {
  return (
    <div
      className="fixed right-3 sm:right-4 bottom-4 sm:bottom-6 z-40 flex flex-col gap-2 sm:gap-2.5"
      aria-label="Social media links"
    >
      {socialItems.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="group w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          style={{
            background: T.gradientRed,
            boxShadow: '0 6px 20px rgba(165,0,0,0.35)',
          }}
        >
          <Icon size={18} className="sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
        </a>
      ))}
    </div>
  );
}
