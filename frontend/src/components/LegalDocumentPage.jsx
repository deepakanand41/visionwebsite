import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import { LEGAL_LINKS } from '../utils/constants';

function BulletList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function SectionBlock({ section }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="text-gray-600 leading-relaxed">{p}</p>
      ))}
      {section.subsections?.map((sub) => (
        <div key={sub.heading} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">{sub.heading}</h3>
          {sub.paragraphs?.map((p) => (
            <p key={p} className="text-gray-600 leading-relaxed">{p}</p>
          ))}
          <BulletList items={sub.bullets} />
        </div>
      ))}
      <BulletList items={section.bullets} />
      {section.footer?.map((line) => (
        <p key={line} className="text-gray-600 leading-relaxed">{line}</p>
      ))}
    </section>
  );
}

export default function LegalDocumentPage({ document, alternateLink }) {
  return (
    <main className="pt-28 lg:pt-36 pb-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap mb-6">
            <Link to="/" className="hover:text-red-800 transition-colors">Home</Link>
            <FiChevronRight size={12} className="text-gray-300" />
            <span className="text-gray-700 font-medium">{document.title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{document.title}</h1>
          <p className="text-sm text-gray-500 mb-8">Effective Date: {document.effectiveDate}</p>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 mb-10 space-y-3">
            {document.intro.map((p) => (
              <p key={p} className="text-gray-700 leading-relaxed">{p}</p>
            ))}
          </div>

          <div className="space-y-10">
            {document.sections.map((section) => (
              <SectionBlock key={section.title} section={section} />
            ))}
          </div>

          {document.closing && (
            <p className="mt-10 pt-8 border-t border-gray-100 text-gray-700 leading-relaxed font-medium">
              {document.closing}
            </p>
          )}

          {alternateLink && (
            <p className="mt-8 text-sm text-gray-500">
              Also see:{' '}
              <Link to={alternateLink.to} className="font-semibold hover:underline" style={{ color: '#A50000' }}>
                {alternateLink.label}
              </Link>
            </p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
