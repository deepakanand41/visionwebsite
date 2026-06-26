import { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { getDestination } from '../utils/destinationData';
import { fetchTouristVisaCountry } from '../services/api';
import { resolveMediaUrl } from '../utils/mediaUrl';
import { Breadcrumbs, TabNavigation } from '../components/PageLayouts';
import { normalizeQuillHtml } from '../components/ContentPages';
import TouristVisaEnquiryForm from '../components/TouristVisaEnquiryForm';

const TABS = [
  { id: 'visa-process', label: 'Visa Process' },
  { id: 'visa-eligibility', label: 'Visa Eligibility' },
  { id: 'visa-faqs', label: 'FAQs' },
];

function VisaFaqs({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);
  if (!faqs?.length) return null;

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        return (
          <div key={faq.question} className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50"
            >
              <span>{faq.question}</span>
              <FiChevronDown className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function HtmlBlock({ html }) {
  const processed = useMemo(() => (html ? normalizeQuillHtml(html) : ''), [html]);
  if (!processed) return <p className="text-gray-500">Content coming soon.</p>;
  return (
    <div
      className="article-body prose prose-sm sm:prose max-w-none text-gray-700"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}

export default function TouristVisaDetail() {
  const { slug } = useParams();
  const fallback = getDestination(slug);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState('visa-process');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    fetchTouristVisaCountry(slug)
      .then((data) => {
        if (!cancelled) setCountry(data);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    setActiveTab('visa-process');
  }, [slug]);

  if (!fallback && !loading && notFound) return <Navigate to="/" replace />;
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-10 h-10 rounded-full border-4 animate-spin" style={{ borderColor: '#A50000', borderTopColor: 'transparent' }} />
      </div>
    );
  }
  if (notFound) return <Navigate to="/" replace />;

  const accentColor = fallback?.accentColor || '#A50000';
  const flag = country?.flag || fallback?.flag || '';
  const name = country?.country_name || fallback?.name || slug;
  const heroTitle = country?.hero_title || `Tourist Visa for ${name}`;
  const heroSubtitle = country?.hero_subtitle || `Expert tourist visa assistance for ${name}.`;
  const heroImage = resolveMediaUrl(country?.hero_image_url);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const el = document.getElementById(tabId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Tourist Visa', href: '/tourist-visa/canada' },
    { label: `${name} Visa` },
  ];

  return (
    <main>
      <section className="pt-28 lg:pt-36 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Breadcrumbs items={breadcrumbs} />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {heroTitle}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{heroSubtitle}</p>

              <div className="relative w-full max-w-xl mt-2">
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-2"
                  style={{ borderColor: `${accentColor}55` }}
                >
                  <img
                    src={heroImage || '/images/hero-students.png'}
                    alt={`Tourist visa for ${name}`}
                    className="w-full h-56 sm:h-72 object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, rgba(17,17,17,0.88) 0%, ${accentColor}22 45%, transparent 100%)` }}
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg">
                    <span className="text-4xl leading-none">{flag}</span>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tourist Visa</div>
                      <div className="font-bold text-gray-900 text-sm sm:text-base">{name}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TouristVisaEnquiryForm countrySlug={slug} countryName={name} />
            </motion.div>
          </div>
        </div>
      </section>

      <TabNavigation tabs={TABS} activeTab={activeTab} onTabClick={handleTabClick} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        <section id="visa-process">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span style={{ color: accentColor }}>●</span> Visa Process
          </h2>
          <HtmlBlock html={country?.visa_process} />
        </section>

        <section id="visa-eligibility">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span style={{ color: accentColor }}>●</span> Visa Eligibility
          </h2>
          <HtmlBlock html={country?.visa_eligibility} />
        </section>

        <section id="visa-faqs">
          <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span style={{ color: accentColor }}>●</span> Frequently Asked Questions
          </h2>
          <VisaFaqs faqs={country?.faqs} />
        </section>
      </div>

      <section className="py-16" style={{ background: 'linear-gradient(135deg, #A50000, #7A0000)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Visit {name}? {flag}
          </h2>
          <p className="text-gray-300 mb-8">
            Our visa team will help you with documentation, application filing, and interview preparation.
          </p>
          <a
            href="#visa-enquiry-form"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5 text-white border border-white/30"
          >
            Enquire Now
          </a>
        </div>
      </section>
    </main>
  );
}
