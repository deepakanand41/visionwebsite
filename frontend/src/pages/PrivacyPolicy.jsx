import LegalDocumentPage from '../components/LegalDocumentPage';
import { PRIVACY_POLICY } from '../content/legalDocuments';
import { LEGAL_LINKS } from '../utils/constants';

export default function PrivacyPolicy() {
  return (
    <LegalDocumentPage
      document={PRIVACY_POLICY}
      alternateLink={{ to: LEGAL_LINKS.terms, label: 'Terms & Conditions' }}
    />
  );
}
