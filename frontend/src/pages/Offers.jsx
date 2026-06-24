import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGift, FiTag } from 'react-icons/fi';
import { FaLaptop, FaGraduationCap, FaPassport, FaMoneyBillWave } from 'react-icons/fa';
import { fetchOffers } from '../services/api';
import { resolveMediaUrl } from '../utils/mediaUrl';
import { HOME_THEME as T } from '../utils/constants';

const OFFER_TYPES = [
  { id: 'all', label: 'All Offers' },
  { id: 'laptop', label: 'Laptop & Gadgets' },
  { id: 'scholarship', label: 'Scholarships' },
  { id: 'test_prep', label: 'Test Prep' },
  { id: 'visa', label: 'Visa' },
  { id: 'financial', label: 'Loans & Finance' },
  { id: 'gadget', label: 'Gadgets' },
  { id: 'other', label: 'Other' },
];

const TYPE_META = {
  laptop: { label: 'Laptop Offer', icon: FaLaptop, color: '#2563eb' },
  scholarship: { label: 'Scholarship', icon: FaGraduationCap, color: '#7c3aed' },
  test_prep: { label: 'Test Prep', icon: FiTag, color: '#ea580c' },
  visa: { label: 'Visa', icon: FaPassport, color: '#0891b2' },
  financial: { label: 'Financial', icon: FaMoneyBillWave, color: '#059669' },
  gadget: { label: 'Gadget', icon: FaLaptop, color: '#4f46e5' },
  other: { label: 'Special Offer', icon: FiGift, color: T.red },
};

function OfferCard({ offer }) {
  const meta = TYPE_META[offer.offer_type] || TYPE_META.other;
  const Icon = meta.icon;
  const imageSrc = resolveMediaUrl(offer.image_url, { streaming: false });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden h-full"
      style={{ boxShadow: '0 4px 24px rgba(165,0,0,0.07)' }}
    >
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={offer.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2 text-white"
            style={{ background: `linear-gradient(135deg, ${meta.color}, #111111)` }}
          >
            <Icon size={40} />
            <span className="text-sm font-semibold opacity-90">{meta.label}</span>
          </div>
        )}
        {offer.badge_text && (
          <span
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black text-white shadow-lg"
            style={{ background: T.red }}
          >
            {offer.badge_text}
          </span>
        )}
        {offer.is_featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-white/95 text-gray-800">
            Featured
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide mb-2"
          style={{ color: meta.color }}
        >
          <Icon size={12} /> {meta.label}
        </span>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#A50000] transition-colors">
          {offer.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{offer.description}</p>
        {offer.valid_until && (
          <p className="text-xs text-gray-400 mb-3">Valid until: {offer.valid_until}</p>
        )}
        {offer.terms && (
          <p className="text-xs text-gray-400 mb-4 line-clamp-2 border-t border-gray-100 pt-3">
            <span className="font-semibold text-gray-500">T&amp;C: </span>{offer.terms}
          </p>
        )}
        <Link
          to={offer.cta_link?.startsWith('/') ? offer.cta_link : '/contact-us'}
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 mt-auto"
          style={{ background: T.gradientRed }}
        >
          {offer.cta_label || 'Claim Offer'} <FiArrowRight />
        </Link>
      </div>
    </motion.article>
  );
}

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchOffers(filter === 'all' ? null : filter)
      .then(setOffers)
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <main>
      <section className="pt-32 pb-12 text-white" style={{ background: T.gradientHero }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/15"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <FiGift /> Student Offers
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Exclusive <span style={{ color: T.red }}>Offers</span> For You
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Free laptops, scholarships, test prep deals, visa support and more — curated for Vision International students.
          </p>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 lg:top-[7.75rem] z-30">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {OFFER_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === t.id ? T.red : 'white',
                color: filter === t.id ? 'white' : '#4b5563',
                border: filter === t.id ? 'none' : '1px solid #e5e7eb',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-gray-500 py-20">Loading offers...</p>
          ) : !offers.length ? (
            <p className="text-center text-gray-500 py-20">No offers in this category right now. Check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16" style={{ background: T.gradientRed }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Don&apos;t Miss Out</h2>
          <p className="text-gray-200 mb-8">Speak to a counsellor today and find which offers you qualify for.</p>
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white transition-all hover:shadow-xl"
            style={{ color: T.red }}
          >
            Book Free Counselling <FiArrowRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
