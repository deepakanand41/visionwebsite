import { Link } from 'react-router-dom';
import { LEGAL_LINKS, HOME_THEME as T } from '../utils/constants';

const linkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
  className: 'underline hover:opacity-80',
};

export function TermsPrivacyLinks({ color = T.red }) {
  return (
    <>
      <Link to={LEGAL_LINKS.terms} {...linkProps} style={{ color }}>
        Terms &amp; Conditions
      </Link>
      {' '}and{' '}
      <Link to={LEGAL_LINKS.privacy} {...linkProps} style={{ color }}>
        Privacy Policy
      </Link>
    </>
  );
}

export function TermsLink({ label = 'Terms & Conditions', color = T.red }) {
  return (
    <Link to={LEGAL_LINKS.terms} {...linkProps} style={{ color }}>
      {label}
    </Link>
  );
}
