import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ServiceHero } from '../components/PageLayouts';
import StoryMedia from '../components/StoryMedia';
import { useTestimonials } from '../hooks/useTestimonials';

const stats = [
  { value: '15,000+', label: 'Students Placed' },
  { value: '98%', label: 'Visa Success Rate' },
  { value: '500+', label: 'University Partners' },
  { value: '4.9/5', label: 'Student Rating' },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-200'}>★</span>
      ))}
    </div>
  );
}

export default function SuccessStories() {
  const { testimonials: stories, loading } = useTestimonials();
  const [filter, setFilter] = useState('All');

  const destinations = ['All', ...new Set(stories.map((s) => s.destination?.replace(/[^\w\s]/g, '').trim().split(' ')[0] || s.destination))];
  const filtered = filter === 'All'
    ? stories
    : stories.filter((s) => s.destination?.includes(filter));

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-500 pt-28 lg:pt-36">
        Loading success stories...
      </main>
    );
  }

  return (
    <main>
      <ServiceHero
        badge="Student Stories"
        title="Real Stories,"
        highlight="Real Success"
        subtitle="Hear from students who achieved their study abroad dreams with Vision Overseas Education. Every story is a journey we're proud to be part of."
        features={['15,000+ Happy Students', '20+ Countries', '98% Visa Success', '10+ Years Trust']}
      />

      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black" style={{ color: '#A50000' }}>{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {destinations.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === d ? '#A50000' : 'white',
                color: filter === d ? 'white' : '#4b5563',
                border: filter === d ? 'none' : '1px solid #e5e7eb',
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((story, i) => {
                const hasMedia = story.mediaUrl && story.mediaType;
                const isVideo = story.mediaType === 'video';
                return (
                  <motion.div
                    key={story.id || story.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className={`bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden ${hasMedia ? '' : 'p-6'}`}
                    style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.07)' }}
                  >
                    {hasMedia && (
                      <StoryMedia
                        mediaType={story.mediaType}
                        mediaUrl={story.mediaUrl}
                        variant={isVideo ? 'reel' : 'default'}
                        className={isVideo ? '' : 'aspect-[16/10] w-full'}
                        alt={`${story.name} success story`}
                      />
                    )}

                    <div className={hasMedia ? 'p-6 flex flex-col flex-1' : 'flex flex-col flex-1'}>
                      <FaQuoteLeft className="text-2xl mb-3" style={{ color: 'rgba(165,0,0,0.12)' }} />
                      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">"{story.review}"</p>

                      <div className="px-3 py-1.5 rounded-full text-xs font-semibold mb-4 self-start" style={{ background: 'rgba(122,0,0,0.1)', color: '#7A0000' }}>
                        ✓ {story.highlight || 'Success Story'}
                      </div>

                      <StarRating rating={story.rating} />

                      <div className="mt-3 flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0" style={{ background: story.avatarColor, color: '#333' }}>
                          {story.initial}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{story.name}</div>
                          <div className="text-xs text-gray-500">{story.course}</div>
                          <div className="text-xs font-medium mt-0.5 flex items-center gap-1" style={{ color: '#A50000' }}>
                            <FaGraduationCap size={10} /> {story.university} · {story.destination}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-16" style={{ background: 'linear-gradient(135deg, #A50000, #7A0000)' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Write Your Success Story With Us</h2>
          <p className="text-gray-300 mb-8">Join 15,000+ students who trusted Vision Overseas for their study abroad journey.</p>
          <Link to="/contact-us" className="inline-flex px-8 py-4 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #A50000, #7A0000)' }}>
            Start Your Journey — Free Counselling
          </Link>
        </div>
      </section>
    </main>
  );
}
