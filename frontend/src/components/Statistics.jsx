import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaUserGraduate, FaUniversity, FaGlobe, FaPassport, FaAward } from 'react-icons/fa';

const stats = [
  { icon: FaUserGraduate, value: 15000, suffix: '+', label: 'Students Placed', description: 'Across the globe' },
  { icon: FaUniversity, value: 500, suffix: '+', label: 'University Partners', description: 'Worldwide tie-ups' },
  { icon: FaGlobe, value: 20, suffix: '+', label: 'Countries', description: 'We cover globally' },
  { icon: FaPassport, value: 98, suffix: '%', label: 'Visa Approval', description: 'Industry-leading rate' },
  { icon: FaAward, value: 10, suffix: '+', label: 'Years Experience', description: 'Trusted expertise' },
];

function useCountUp(target, inView, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}

function StatItem({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(stat.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="text-center group"
    >
      <div
        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <stat.icon className="text-2xl" style={{ color: '#F28C28' }} />
      </div>
      <div className="text-4xl sm:text-5xl font-black text-white mb-1">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-lg font-semibold text-white mb-1">{stat.label}</div>
      <div className="text-sm text-blue-200">{stat.description}</div>
    </motion.div>
  );
}

export default function Statistics() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="stats"
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A3D91 0%, #072d6b 50%, #051e47 100%)' }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 1200 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {[...Array(12)].map((_, i) => (
            <circle key={i} cx={i * 110} cy="250" r="180" fill="none" stroke="white" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F28C28, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1a5cb8, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(242,140,40,0.15)', color: '#F28C28', border: '1px solid rgba(242,140,40,0.2)' }}
          >
            Our Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Numbers That{' '}
            <span style={{ color: '#F28C28' }}>Speak for Themselves</span>
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Over a decade of excellence in overseas education consultancy.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-blue-200 mb-4">Ready to become part of our success story?</p>
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)', color: 'white' }}
          >
            Start Your Journey Today
          </a>
        </motion.div>
      </div>
    </section>
  );
}
