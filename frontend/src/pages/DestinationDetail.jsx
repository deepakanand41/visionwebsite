import { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getDestination } from '../utils/destinationData';
import { PageHero, TabNavigation, PromoBanner, ContentSection } from '../components/PageLayouts';

export default function DestinationDetail() {
  const { slug } = useParams();
  const destination = getDestination(slug);
  const [activeTab, setActiveTab] = useState(destination?.tabs[0]?.id || '');

  useEffect(() => {
    if (destination) setActiveTab(destination.tabs[0].id);
  }, [slug, destination]);

  if (!destination) return <Navigate to="/" replace />;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const el = document.getElementById(tabId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Study Destinations', href: '/#destinations' },
    { label: `Study in ${destination.name}` },
  ];

  return (
    <main>
      <PageHero
        breadcrumbs={breadcrumbs}
        title={destination.heroTitle}
        subtitle={destination.heroSubtitle}
        stats={destination.stats}
        flag={destination.flag}
        accentColor={destination.accentColor}
      />

      <TabNavigation tabs={destination.tabs} activeTab={activeTab} onTabClick={handleTabClick} />

      <PromoBanner />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {destination.sections.map((section) => (
          <ContentSection key={section.id} section={section} accentColor={destination.accentColor} />
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0A3D91, #072d6b)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Study in {destination.name}? {destination.flag}
          </h2>
          <p className="text-blue-200 mb-8">
            Our expert counsellors will guide you through university selection, applications, visa, and pre-departure — completely free.
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)', color: 'white' }}
          >
            Avail FREE Counselling
          </Link>
        </div>
      </section>
    </main>
  );
}
