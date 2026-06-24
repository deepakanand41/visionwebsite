import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { HOME_THEME as T } from '../utils/constants';
import {
  mainDestinations,
  europeDestinations,
  otherDestinations,
} from '../utils/destinationData';

const cardMeta = {
  canada: {
    tagline: 'World-class universities & PR pathways',
    description: 'Top-ranked universities, post-study work permits and a clear path to permanent residency.',
    highlights: ['2-Year PGWP', 'Lower Tuition', 'Safe & Multicultural'],
    color: '#c8102e',
    gradient: 'from-red-700 to-red-500',
  },
  australia: {
    tagline: 'Top QS-ranked universities',
    description: 'Globally respected degrees, excellent lifestyle, and 2–4 year post-study work rights.',
    highlights: ['PSW Visa 2-4yr', 'Group of 8', 'High Living Standards'],
    color: '#00843D',
    gradient: 'from-green-700 to-green-500',
  },
  'united-kingdom': {
    tagline: 'Prestigious degrees in 1–2 years',
    description: 'Shorter programs, world-renowned universities and the new Graduate Route visa.',
    highlights: ['1-2yr Masters', 'Top Russell Group', 'Graduate Route Visa'],
    color: '#012169',
    gradient: 'from-blue-900 to-blue-700',
  },
  'united-states': {
    tagline: 'Innovation hub & Ivy League excellence',
    description: "Home to the world's top universities with cutting-edge research and diverse programs.",
    highlights: ['3-yr OPT STEM', 'Harvard/MIT/Stanford', 'Rich Campus Life'],
    color: '#3C3B6E',
    gradient: 'from-indigo-900 to-indigo-700',
  },
  'new-zealand': {
    tagline: 'Stunning nature meets top education',
    description: 'Safe and welcoming country with top universities and generous post-study work options.',
    highlights: ['3-yr PSW Visa', 'Safe Country', 'Quality Research'],
    color: '#00274C',
    gradient: 'from-sky-800 to-sky-600',
  },
  france: {
    tagline: 'Prestigious European education',
    description: 'Affordable public universities, grandes écoles, and vibrant student life in the heart of Europe.',
    highlights: ['Low Tuition', 'EU Degrees', 'Rich Culture'],
    color: '#002395',
    gradient: 'from-blue-800 to-blue-600',
  },
  germany: {
    tagline: 'Tuition-free European excellence',
    description: 'World-class engineering, minimal public university fees, and strong post-study work options in Europe\'s largest economy.',
    highlights: ['Low/No Tuition', 'Engineering Hub', '18-Month Job Seeker'],
    color: '#FFCE00',
    gradient: 'from-yellow-600 to-amber-500',
  },
  denmark: {
    tagline: 'Innovation & quality of life',
    description: 'English-taught programs, innovative teaching, and one of Europe\'s highest living standards.',
    highlights: ['English Programs', 'Innovation Hub', 'EU Work Rights'],
    color: '#C8102E',
    gradient: 'from-red-800 to-red-600',
  },
  sweden: {
    tagline: 'Research excellence in Scandinavia',
    description: 'Sustainability-focused education, strong tech industries, and globally respected degrees.',
    highlights: ['Research Focus', 'English-Taught', 'Innovation'],
    color: '#006AA7',
    gradient: 'from-sky-900 to-sky-600',
  },
  finland: {
    tagline: 'World-class education system',
    description: 'Affordable tuition, safe environment, and English programs at top Finnish universities.',
    highlights: ['Top Education', 'Affordable Fees', 'Safe & Modern'],
    color: '#003580',
    gradient: 'from-blue-900 to-blue-700',
  },
  latvia: {
    tagline: 'Affordable EU study hub',
    description: 'Cost-effective European degrees with English-taught programs and EU recognition.',
    highlights: ['Affordable EU', 'English Programs', 'Central Europe'],
    color: '#9E3039',
    gradient: 'from-rose-800 to-rose-600',
  },
  lithuania: {
    tagline: 'Growing European destination',
    description: 'Low tuition, EU-aligned education, and a dynamic international student community.',
    highlights: ['Low Tuition', 'EU Recognition', 'English Courses'],
    color: '#006A44',
    gradient: 'from-emerald-800 to-emerald-600',
  },
  singapore: {
    tagline: "Asia's education powerhouse",
    description: 'Top global universities, strong industry links, and excellent graduate employability.',
    highlights: ["Asia's Top Hub", 'Global Unis', 'Safe City'],
    color: '#EF3340',
    gradient: 'from-red-800 to-red-600',
  },
  cyprus: {
    tagline: 'Mediterranean study destination',
    description: 'Affordable EU-aligned degrees with warm climate and English-medium programs.',
    highlights: ['Affordable', 'EU Standards', 'English Programs'],
    color: '#D57800',
    gradient: 'from-amber-700 to-amber-500',
  },
  malta: {
    tagline: 'English-speaking EU island',
    description: 'EU membership benefits, affordable living, and English-medium education by the sea.',
    highlights: ['English Speaking', 'EU Member', 'Island Life'],
    color: '#CF142B',
    gradient: 'from-red-700 to-orange-600',
  },
  mauritius: {
    tagline: 'Tropical study destination',
    description: 'Affordable British-pattern education with English medium and tropical island lifestyle.',
    highlights: ['Affordable Fees', 'English Medium', 'Tropical Island'],
    color: '#EA2839',
    gradient: 'from-orange-700 to-yellow-600',
  },
};

const destinationSections = [
  { title: 'Popular Destinations', items: mainDestinations },
  { title: 'Europe', items: europeDestinations },
  { title: 'Other Destinations', items: otherDestinations },
];

function toCard(dest) {
  const meta = cardMeta[dest.slug];
  return { ...dest, ...meta };
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: 'easeOut' },
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
      whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(165,0,0,0.15)' }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-300 cursor-pointer"
      style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.07)' }}
    >
      <div
        className={`relative h-40 bg-gradient-to-br ${dest.gradient} flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 300 160" className="w-full h-full">
            <circle cx="250" cy="20" r="80" fill="white" />
            <circle cx="30" cy="130" r="60" fill="white" />
          </svg>
        </div>
        <span className="text-7xl relative z-10 drop-shadow-lg">{dest.flag}</span>
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

      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-800 mb-1">{dest.name}</h3>
        <p className="text-xs font-semibold mb-2" style={{ color: dest.color }}>
          {dest.tagline}
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{dest.description}</p>
        <Link
          to={`/study-abroad/${dest.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all"
          style={{ color: T.red }}
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
  let cardIndex = 0;

  return (
    <section id="destinations" className="py-20" style={{ background: T.gradientLight }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Study Destinations
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Popular{' '}
            <span style={{ color: T.red }}>Study Destinations</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explore top destinations across the world and find the country that perfectly matches your academic and career aspirations.
          </p>
        </motion.div>

        <div className="space-y-14">
          {destinationSections.map((section) => {
            const cards = section.items.map(toCard);
            const startIndex = cardIndex;
            cardIndex += cards.length;

            return (
              <div key={section.title}>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <span
                    className="w-1.5 h-7 rounded-full shrink-0"
                    style={{ background: T.red }}
                  />
                  {section.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cards.map((dest, i) => (
                    <DestCard key={dest.slug} dest={dest} index={startIndex + i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ background: T.gradientRed }}
          >
            Get Free Destination Guidance <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
