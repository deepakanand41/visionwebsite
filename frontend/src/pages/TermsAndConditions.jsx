import LegalDocumentPage from '../components/LegalDocumentPage';
import { TERMS_AND_CONDITIONS } from '../content/legalDocuments';
import { LEGAL_LINKS } from '../utils/constants';

export default function TermsAndConditions() {
  return (
    <LegalDocumentPage
      document={TERMS_AND_CONDITIONS}
      alternateLink={{ to: LEGAL_LINKS.privacy, label: 'Privacy Policy' }}
    />
  );
}
