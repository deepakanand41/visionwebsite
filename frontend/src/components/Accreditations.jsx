import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useAccreditations } from '../hooks/useAccreditations';
import { resolveMediaUrl } from '../utils/mediaUrl';
import { HOME_THEME as T } from '../utils/constants';

const AUTO_ADVANCE_MS = 5000;
const VISIBLE_COUNT = 3;

function getVisibleItems(items, start) {
  if (!items.length) return [];
  const count = Math.min(VISIBLE_COUNT, items.length);
  return Array.from({ length: count }, (_, i) => items[(start + i) % items.length]);
}

export default function Accreditations() {
  const { accreditations, loading } = useAccreditations();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  useEffect(() => {
    if (accreditations.length) setCurrent(0);
  }, [accreditations.length]);

  useEffect(() => {
    if (accreditations.length <= VISIBLE_COUNT) return undefined;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % accreditations.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [accreditations.length]);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % accreditations.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + accreditations.length) % accreditations.length);
  };

  if (loading) return null;
  if (!accreditations.length) return null;

  const visibleItems = getVisibleItems(accreditations, current);
  const showControls = accreditations.length > VISIBLE_COUNT;

  return (
    <section id="accreditations" className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: T.redSoft, color: T.red }}
          >
            Trusted &amp; Recognized
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Our Accreditations &amp;{' '}
            <span style={{ color: T.red }}>Global Certifications</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Official partnerships and certifications that reflect our commitment to quality education consulting.
          </p>
        </motion.div>

        <div className="relative">
          {/* Desktop & tablet: 3 logos */}
          <div className="hidden sm:block">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-3 gap-4 lg:gap-6"
              >
                {visibleItems.map((item, idx) => {
                  const src = resolveMediaUrl(item.image_url, { streaming: false });
                  return (
                    <div
                      key={`${item.id}-${current}-${idx}`}
                      className="accreditation-card flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5"
                      style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}
                    >
                      <img
                        src={src}
                        alt={item.title || 'Accreditation'}
                        className="accreditation-logo object-contain"
                        loading="lazy"
                      />
                      {item.title && (
                        <p className="mt-3 text-xs sm:text-sm font-medium text-gray-600 text-center line-clamp-2">
                          {item.title}
                        </p>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile: still show 3 in a row, smaller */}
          <div className="sm:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 24 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-3 gap-2"
              >
                {visibleItems.map((item) => {
                  const src = resolveMediaUrl(item.image_url, { streaming: false });
                  return (
                    <div
                      key={item.id}
                      className="accreditation-card accreditation-card--compact flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-2"
                    >
                      <img
                        src={src}
                        alt={item.title || 'Accreditation'}
                        className="accreditation-logo object-contain"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {showControls && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:shadow-md"
                style={{ borderColor: T.red, color: T.red }}
                aria-label="Previous accreditations"
              >
                <FiChevronLeft />
              </button>
              <div className="flex gap-2">
                {accreditations.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to accreditation ${i + 1}`}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: i === current ? '20px' : '8px',
                      background: i === current ? T.red : '#d1d5db',
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:shadow-md"
                style={{ borderColor: T.red, color: T.red }}
                aria-label="Next accreditations"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 sm:mt-14 text-center max-w-4xl mx-auto"
        >
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
            Vision International is backed by globally recognized accreditations and trusted education
            partnerships. These certifications reflect our commitment to ethical counselling, trained advisors,
            and helping students pursue study abroad opportunities with confidence and transparency.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '15,000+', label: 'Students Guided' },
              { value: '98%', label: 'Visa Success Rate' },
              { value: '500+', label: 'University Partners' },
              { value: '10+', label: 'Years of Trust' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl px-4 py-5 border border-gray-100 bg-gray-50"
                style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.05)' }}
              >
                <div className="text-2xl sm:text-3xl font-black" style={{ color: T.red }}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
