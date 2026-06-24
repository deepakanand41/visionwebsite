import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaGlobeAmericas, FaUniversity, FaBook, FaCertificate,
  FaMoneyBillWave, FaPassport, FaAward, FaHandshake
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

import { HOME_THEME as T } from '../utils/constants';

const services = [
  {
    icon: FaGlobeAmericas,
    title: 'Study Abroad Counselling',
    description: 'Personalized guidance to help you choose the right country, university, and course aligned with your career goals.',
    color: T.red,
    bg: T.redSoft,
  },
  {
    icon: FaUniversity,
    title: 'University Admissions',
    description: 'End-to-end support for university applications including SOP writing, document preparation and submission.',
    color: T.redDark,
    bg: 'rgba(122,0,0,0.06)',
  },
  {
    icon: FaBook,
    title: 'IELTS Coaching',
    description: 'Expert-led IELTS coaching with mock tests, listening, reading, writing and speaking practice sessions.',
    color: T.red,
    bg: T.redSoft,
    link: '/ielts-training',
  },
  {
    icon: FaCertificate,
    title: 'PTE Coaching',
    description: 'Comprehensive PTE training with AI-scored practice tests and proven strategies to achieve your target score.',
    color: T.redDark,
    bg: 'rgba(122,0,0,0.06)',
    link: '/pte-training',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Education Loans',
    description: 'Hassle-free education loan assistance with top banks and NBFCs offering competitive interest rates.',
    color: T.red,
    bg: T.redSoft,
    link: '/education-loans',
  },
  {
    icon: FaPassport,
    title: 'Visa Assistance',
    description: '98% visa success rate with complete visa documentation, interview preparation and embassy guidance.',
    color: T.redDark,
    bg: 'rgba(122,0,0,0.06)',
  },
  {
    icon: FaAward,
    title: 'Scholarship Guidance',
    description: 'Discover and apply for scholarships worth thousands of dollars to make your education more affordable.',
    color: T.red,
    bg: T.redSoft,
  },
  {
    icon: FaHandshake,
    title: 'Refer & Earn',
    description: 'Refer your friends and family to earn exciting rewards while helping them achieve their study abroad dreams.',
    color: T.redDark,
    bg: 'rgba(122,0,0,0.06)',
    link: '/refer-and-earn',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index}
      whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(165,0,0,0.12)' }}
      className="group bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer transition-all duration-300"
      style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ background: service.bg }}
      >
        <service.icon className="text-2xl" style={{ color: service.color }} />
      </div>
      <h3 className="font-bold text-gray-800 text-lg mb-2">{service.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
      {service.link ? (
        <Link
          to={service.link}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: service.color }}
        >
          Learn More <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <Link
          to="/contact-us"
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
          style={{ color: service.color }}
        >
          Learn More <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="services" className="py-20" style={{ background: T.gradientLight }}>
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
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Everything You Need{' '}
            <span style={{ color: T.red }}>Under One Roof</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From counselling to visa approval — we're with you every step of your study abroad journey.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
