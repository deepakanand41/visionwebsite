import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { SOCIAL_LINKS, COMPANY, HOME_THEME as T } from '../utils/constants';

const brandSocials = [
  { icon: FaFacebookF, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
  { icon: FaYoutube, href: SOCIAL_LINKS.youtube, label: 'YouTube' },
  { icon: FaLinkedinIn, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
];

const whatsappLink = {
  icon: FaWhatsapp,
  href: SOCIAL_LINKS.whatsapp,
  label: `WhatsApp — ${COMPANY.phoneLabel} ${COMPANY.phone}`,
};

function SocialIconLink({ icon: Icon, href, label, variant = 'brand', className = '' }) {
  const isWhatsapp = variant === 'whatsapp';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`group w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl ${className}`}
      style={
        isWhatsapp
          ? {
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              boxShadow: '0 6px 20px rgba(37,211,102,0.4)',
            }
          : {
              background: T.gradientRed,
              boxShadow: '0 6px 20px rgba(165,0,0,0.35)',
            }
      }
    >
      <Icon
        size={isWhatsapp ? 22 : 18}
        className="sm:w-5 sm:h-5 transition-transform group-hover:scale-110"
      />
    </a>
  );
}

export default function FloatingSocialLinks() {
  return (
    <div
      className="fixed right-3 sm:right-4 bottom-4 sm:bottom-6 z-40 flex flex-col items-center gap-2 sm:gap-2.5"
      aria-label="Social media and WhatsApp helpline"
    >
      {brandSocials.map(({ icon, href, label }) => (
        <SocialIconLink key={label} icon={icon} href={href} label={label} />
      ))}

      <div className="h-2 sm:h-3" aria-hidden="true" />

      <SocialIconLink
        icon={whatsappLink.icon}
        href={whatsappLink.href}
        label={whatsappLink.label}
        variant="whatsapp"
      />
    </div>
  );
}
