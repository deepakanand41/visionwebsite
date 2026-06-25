import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTestimonials } from '../hooks/useTestimonials';
import StoryMedia from './StoryMedia';
import { HOME_THEME as T } from '../utils/constants';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { testimonials, loading } = useTestimonials();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  useEffect(() => {
    if (testimonials.length) setCurrent(0);
  }, [testimonials.length]);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-gray-50 text-center text-gray-500">
        Loading testimonials...
      </section>
    );
  }

  if (!testimonials.length) return null;

  const visibleTestimonials = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section id="testimonials" className="py-20" style={{ background: T.gradientLight }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: T.redSoft, color: T.red }}
          >
            Student Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            What Our{' '}
            <span style={{ color: T.red }}>Students Say</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Real stories from real students who achieved their study abroad dreams with Vision International.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop: 3 cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleTestimonials.map((t, idx) => {
                const hasMedia = t.mediaUrl && t.mediaType;
                const isVideo = t.mediaType === 'video';
                return (
                <motion.div
                  key={`${t.id || t.name}-${current}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden ${hasMedia ? '' : 'p-6'}`}
                  style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.07)' }}
                >
                  {hasMedia && (
                    <StoryMedia
                      mediaType={t.mediaType}
                      mediaUrl={t.mediaUrl}
                      variant={isVideo ? 'reel' : 'default'}
                      className={isVideo ? '' : 'aspect-[16/10] w-full'}
                    />
                  )}
                  <div className={hasMedia ? 'p-6 flex flex-col flex-1' : 'flex flex-col flex-1'}>
                  <FaQuoteLeft className="text-2xl mb-4" style={{ color: 'rgba(165,0,0,0.15)' }} />
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">"{t.review}"</p>
                  <div>
                    <StarRating rating={t.rating} />
                    <div className="mt-3 flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ background: t.avatarColor, color: '#333' }}
                      >
                        {t.initial}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.course} · {t.destination}</div>
                        <div className="text-xs font-medium mt-0.5" style={{ color: T.red }}>{t.university}</div>
                      </div>
                    </div>
                  </div>
                  </div>
                </motion.div>
              );})}
            </AnimatePresence>
          </div>

          {/* Mobile: single card */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.35 }}
                className={`bg-white rounded-2xl border border-gray-100 overflow-hidden ${testimonials[current].mediaUrl ? '' : 'p-6'}`}
                style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.07)' }}
              >
                {testimonials[current].mediaUrl && testimonials[current].mediaType && (
                  <StoryMedia
                    mediaType={testimonials[current].mediaType}
                    mediaUrl={testimonials[current].mediaUrl}
                    variant={testimonials[current].mediaType === 'video' ? 'reel' : 'default'}
                    className={testimonials[current].mediaType === 'video' ? '' : 'aspect-[16/10] w-full'}
                  />
                )}
                <div className={testimonials[current].mediaUrl ? 'p-6' : ''}>
                <FaQuoteLeft className="text-2xl mb-4" style={{ color: 'rgba(165,0,0,0.15)' }} />
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{testimonials[current].review}"</p>
                <StarRating rating={testimonials[current].rating} />
                <div className="mt-3 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ background: testimonials[current].avatarColor, color: '#333' }}
                  >
                    {testimonials[current].initial}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{testimonials[current].name}</div>
                    <div className="text-xs text-gray-500">{testimonials[current].course} · {testimonials[current].destination}</div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: T.red }}>{testimonials[current].university}</div>
                  </div>
                </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:shadow-md"
              style={{ borderColor: T.red, color: T.red }}
            >
              <FiChevronLeft />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: i === current ? T.red : '#d1d5db',
                    width: i === current ? '20px' : '8px',
                  }}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all hover:shadow-md"
              style={{ borderColor: T.red, color: T.red }}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
