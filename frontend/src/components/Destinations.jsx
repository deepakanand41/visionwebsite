import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const destinations = [
  {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    tagline: 'World-class universities & PR pathways',
    description: 'Top-ranked universities, post-study work permits and a clear path to permanent residency.',
    highlights: ['2-Year PGWP', 'Lower Tuition', 'Safe & Multicultural'],
    color: '#c8102e',
    gradient: 'from-red-700 to-red-500',
    bgColor: 'rgba(200, 16, 46, 0.06)',
  },
  {
    slug: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    tagline: 'Top QS-ranked universities',
    description: 'Globally respected degrees, excellent lifestyle, and 2–4 year post-study work rights.',
    highlights: ['PSW Visa 2-4yr', 'Group of 8', 'High Living Standards'],
    color: '#00843D',
    gradient: 'from-green-700 to-green-500',
    bgColor: 'rgba(0, 132, 61, 0.06)',
  },
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    tagline: 'Prestigious degrees in 1–2 years',
    description: 'Shorter programs, world-renowned universities and the new Graduate Route visa.',
    highlights: ['1-2yr Masters', 'Top Russell Group', 'Graduate Route Visa'],
    color: '#012169',
    gradient: 'from-blue-900 to-blue-700',
    bgColor: 'rgba(1, 33, 105, 0.06)',
  },
  {
    slug: 'united-states',
    name: 'United States',
    flag: '🇺🇸',
    tagline: 'Innovation hub & Ivy League excellence',
    description: 'Home to the world\'s top universities with cutting-edge research and diverse programs.',
    highlights: ['3-yr OPT STEM', 'Harvard/MIT/Stanford', 'Rich Campus Life'],
    color: '#3C3B6E',
    gradient: 'from-indigo-900 to-indigo-700',
    bgColor: 'rgba(60, 59, 110, 0.06)',
  },
  {
    slug: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    tagline: 'Free/low-cost education in Europe',
    description: 'Tuition-free public universities, strong engineering programs and booming job market.',
    highlights: ['Low/No Tuition', 'Engineering Hub', '18-month Job Seeker'],
    color: '#FFCE00',
    gradient: 'from-yellow-600 to-yellow-400',
    bgColor: 'rgba(255, 206, 0, 0.08)',
    textColor: '#5a4500',
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    tagline: 'Stunning nature meets top education',
    description: 'Safe and welcoming country with top universities and generous post-study work options.',
    highlights: ['3-yr PSW Visa', 'Safe Country', 'Quality Research'],
    color: '#00274C',
    gradient: 'from-sky-800 to-sky-600',
    bgColor: 'rgba(0, 39, 76, 0.06)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

function DestCard({ dest, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
      whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(10,61,145,0.15)' }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 cursor-pointer"
      style={{ boxShadow: '0 4px 20px rgba(10,61,145,0.07)' }}
    >
      {/* Card header with flag and gradient */}
      <div
        className={`relative h-40 bg-gradient-to-br ${dest.gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 300 160" className="w-full h-full">
            <circle cx="250" cy="20" r="80" fill="white" />
            <circle cx="30" cy="130" r="60" fill="white" />
          </svg>
        </div>
        <span className="text-7xl relative z-10 drop-shadow-lg">{dest.flag}</span>

        {/* Highlights chips */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 px-3 flex-wrap">
          {dest.highlights.map((h) => (
            <span
              key={h}
              className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/25 text-white backdrop-blur-sm"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-800 mb-1">{dest.name}</h3>
        <p className="text-xs font-semibold mb-2" style={{ color: dest.color === '#FFCE00' ? '#b8960a' : dest.color }}>
          {dest.tagline}
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{dest.description}</p>
        <Link
          to={`/study-abroad/${dest.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all"
          style={{ color: '#0A3D91' }}
        >
          Explore <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Destinations() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="destinations" className="py-20 bg-white">
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
            style={{ background: 'rgba(242,140,40,0.1)', color: '#F28C28' }}
          >
            Study Destinations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Popular{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0A3D91, #F28C28)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Study Destinations
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explore top destinations and find the country that perfectly matches your academic and career aspirations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <DestCard key={dest.name} dest={dest} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #0A3D91, #1a5cb8)' }}
          >
            Get Free Destination Guidance <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
