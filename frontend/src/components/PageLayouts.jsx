import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';

export function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap mb-6">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {i > 0 && <FiChevronRight size={12} className="text-gray-300" />}
          {item.href ? (
            <Link to={item.href} className="hover:text-blue-700 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({ breadcrumbs, title, subtitle, stats, flag, accentColor, ctaText = 'Avail FREE Counselling', ctaLink = '/contact-us' }) {
  return (
    <section className="pt-28 pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">{subtitle}</p>
            {stats && (
              <div className="flex flex-wrap gap-2 mb-8">
                {stats.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{ borderColor: `${accentColor}30`, background: `${accentColor}08`, color: accentColor }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #0A3D91, #1a5cb8)' }}
            >
              {ctaText}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div
              className="absolute w-72 h-72 rounded-full opacity-20"
              style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
            />
            <div
              className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${accentColor}22, #0A3D9111)`, minHeight: '320px' }}
            >
              <div className="flex flex-col items-center justify-center h-full py-12 px-8 text-center">
                <span className="text-8xl mb-4">{flag}</span>
                <div className="text-2xl font-black" style={{ color: '#0A3D91' }}>
                  Study Abroad
                </div>
                <div className="text-sm text-gray-500 mt-1">Your dream destination awaits</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function TabNavigation({ tabs, activeTab, onTabClick }) {
  return (
    <div className="sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab.id)}
              className="px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors shrink-0"
              style={{
                borderColor: activeTab === tab.id ? '#0A3D91' : 'transparent',
                color: activeTab === tab.id ? '#0A3D91' : '#6b7280',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PromoBanner() {
  return (
    <section className="py-10 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: 'rgba(10,61,145,0.15)', background: 'linear-gradient(135deg, #f0f4ff, #e8f0fe)' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-2 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Attend Vision's Biggest Study Abroad Expo 2026
              </h3>
              <p className="text-sm text-gray-500 mb-1">March – April 2026 | Across India</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Meet university representatives, get on-spot offer letters, and avail exclusive scholarships at India's largest study abroad expo.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Up to 100% Scholarships*', 'Exclusive University Access', 'On-Spot Offer Letters'].map((item) => (
                  <div key={item} className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm text-sm font-medium text-gray-700">
                    <span style={{ color: '#F28C28' }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center items-center text-center" style={{ background: 'rgba(10,61,145,0.06)' }}>
              <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#0A3D91' }}>
                Registrations Now Open
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: '#F28C28' }}>500+</div>
              <div className="text-sm text-gray-600 mb-1">Scholarships Available</div>
              <div className="text-3xl font-black mb-1" style={{ color: '#0A3D91' }}>35+</div>
              <div className="text-sm text-gray-600 mb-5">Universities Participating</div>
              <Link
                to="/contact-us"
                className="px-6 py-3 rounded-full font-semibold text-white text-sm transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0A3D91, #1a5cb8)' }}
              >
                Register for Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContentSection({ section, accentColor }) {
  return (
    <section id={section.id} className="py-12 border-b border-gray-100 scroll-mt-36">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{section.title}</h2>
      <div className="w-16 h-1 rounded-full mb-6" style={{ background: accentColor || '#F28C28' }} />
      {section.highlight && (
        <p className="font-semibold text-gray-700 mb-4 text-sm sm:text-base">{section.highlight}</p>
      )}
      {section.content?.map((para, i) => (
        <p key={i} className="text-gray-600 leading-relaxed mb-4">{para}</p>
      ))}
      {section.bullets && (
        <ul className="space-y-2.5 mt-4">
          {section.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-600 text-sm sm:text-base">
              <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white" style={{ background: '#0A3D91' }}>✓</span>
              {b}
            </li>
          ))}
        </ul>
      )}
      <Link
        to="/contact-us"
        className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
        style={{ background: 'linear-gradient(135deg, #0A3D91, #1a5cb8)' }}
      >
        Help me study abroad
      </Link>
    </section>
  );
}

export function ServiceHero({ badge, title, highlight, subtitle, features, ctaLink = '/contact-us' }) {
  return (
    <section
      className="pt-28 pb-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #051e47 0%, #0A3D91 60%, #1a5cb8 100%)' }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1200 400" className="w-full h-full">
          <circle cx="1000" cy="50" r="200" fill="white" />
          <circle cx="100" cy="350" r="150" fill="white" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: 'rgba(242,140,40,0.2)', color: '#F28C28' }}>
              {badge}
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            {title}{' '}
            {highlight && <span style={{ color: '#F28C28' }}>{highlight}</span>}
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed mb-8">{subtitle}</p>
          {features && (
            <div className="flex flex-wrap gap-4 mb-8">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-blue-100 text-sm">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#F28C28' }} />
                  {f}
                </div>
              ))}
            </div>
          )}
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)', color: 'white' }}
          >
            Book Free Counselling
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function FeatureGrid({ items, columns = 3 }) {
  const gridCols = columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  return (
    <div className={`grid ${gridCols} gap-6`}>
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all"
          style={{ boxShadow: '0 4px 20px rgba(10,61,145,0.06)' }}
        >
          {item.icon && (
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(10,61,145,0.08)' }}>
              <item.icon className="text-xl" style={{ color: '#0A3D91' }} />
            </div>
          )}
          <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
