import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { FaGlobe, FaUserGraduate, FaAward, FaCheckCircle } from 'react-icons/fa';

const stats = [
  { icon: FaGlobe, value: '20+', label: 'Countries', color: '#0A3D91' },
  { icon: FaUserGraduate, value: '15,000+', label: 'Students', color: '#F28C28' },
  { icon: FaAward, value: '10+', label: 'Years Exp.', color: '#0A3D91' },
  { icon: FaCheckCircle, value: '98%', label: 'Visa Success', color: '#F28C28' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #fff8f0 100%)' }}
    >
      {/* Background world map SVG */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Simplified world map paths */}
          <path d="M 150 200 Q 200 150 280 180 Q 320 160 340 200 Q 360 230 330 260 Q 300 280 260 270 Q 210 260 180 240 Z" fill="#0A3D91" />
          <path d="M 380 240 Q 440 200 520 220 Q 580 210 600 250 Q 620 290 590 320 Q 550 350 500 340 Q 440 330 410 300 Z" fill="#0A3D91" />
          <path d="M 620 180 Q 680 160 760 170 Q 820 165 860 200 Q 890 230 880 270 Q 860 300 820 310 Q 770 315 730 300 Q 680 280 660 250 Z" fill="#0A3D91" />
          <path d="M 900 200 Q 950 185 1000 195 Q 1040 200 1060 230 Q 1070 255 1050 275 Q 1020 290 980 285 Q 940 275 920 255 Z" fill="#0A3D91" />
          <path d="M 200 320 Q 250 300 290 310 Q 310 330 300 360 Q 280 380 250 375 Q 220 365 210 345 Z" fill="#0A3D91" />
          {/* Flight path arcs */}
          <path d="M 200 250 Q 500 100 850 230" fill="none" stroke="#F28C28" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.4" />
          <path d="M 350 280 Q 600 150 900 260" fill="none" stroke="#0A3D91" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.3" />
          {/* Dots for cities */}
          <circle cx="200" cy="250" r="4" fill="#F28C28" opacity="0.5" />
          <circle cx="500" cy="160" r="4" fill="#F28C28" opacity="0.5" />
          <circle cx="850" cy="230" r="4" fill="#F28C28" opacity="0.5" />
          <circle cx="350" cy="280" r="3" fill="#0A3D91" opacity="0.5" />
          <circle cx="900" cy="260" r="3" fill="#0A3D91" opacity="0.5" />
        </svg>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #F28C28, transparent)' }} />
      <div className="absolute bottom-20 left-5 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #0A3D91, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: 'rgba(10,61,145,0.08)', color: '#0A3D91', border: '1px solid rgba(10,61,145,0.15)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#F28C28' }} />
              Trusted Overseas Education Consultants
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: '#1a1a2e' }}
            >
              Your Global{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0A3D91, #F28C28)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Education Journey
              </span>{' '}
              Starts Here
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl"
            >
              Helping students achieve their dreams of studying abroad with expert guidance, visa assistance, test preparation and university admissions.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#destinations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #0A3D91, #1a5cb8)' }}
              >
                Explore Destinations <FiArrowRight />
              </a>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: '#F28C28', color: '#F28C28', background: 'white' }}
              >
                Book Free Counselling
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-3 rounded-2xl bg-white shadow-md border border-gray-100"
                >
                  <s.icon className="mx-auto mb-1.5 text-xl" style={{ color: s.color }} />
                  <div className="text-xl font-bold" style={{ color: '#1a1a2e' }}>{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            {/* Main image container */}
            <div className="relative w-full max-w-lg mx-auto">
              {/* Background circle */}
              <div
                className="absolute inset-0 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #0A3D91 0%, transparent 70%)' }}
              />

              {/* Student illustration using CSS art + SVG */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #0A3D91 0%, #1a5cb8 50%, #2563eb 100%)',
                  minHeight: '420px',
                }}
              >
                {/* Landmark silhouettes */}
                <svg
                  viewBox="0 0 500 420"
                  className="absolute bottom-0 left-0 right-0 w-full"
                  preserveAspectRatio="xMidYMax meet"
                >
                  {/* Big Ben */}
                  <rect x="30" y="260" width="14" height="80" fill="white" opacity="0.12" />
                  <rect x="27" y="255" width="20" height="12" fill="white" opacity="0.12" />
                  <rect x="32" y="245" width="10" height="12" fill="white" opacity="0.12" />
                  <polygon points="37,225 42,245 32,245" fill="white" opacity="0.12" />
                  {/* Eiffel Tower */}
                  <polygon points="430,260 440,340 450,340 440,260" fill="none" stroke="white" strokeWidth="1.5" opacity="0.12" />
                  <line x1="432" y1="290" x2="448" y2="290" stroke="white" strokeWidth="1.5" opacity="0.12" />
                  <line x1="434" y1="310" x2="446" y2="310" stroke="white" strokeWidth="1.5" opacity="0.12" />
                  {/* Statue of Liberty */}
                  <rect x="130" y="290" width="10" height="50" fill="white" opacity="0.1" />
                  <ellipse cx="135" cy="288" rx="7" ry="10" fill="white" opacity="0.1" />
                  <polygon points="130,278 135,265 140,278" fill="white" opacity="0.1" />
                  {/* Sydney Opera House */}
                  <path d="M 320 340 Q 340 290 360 340" fill="none" stroke="white" strokeWidth="2" opacity="0.1" />
                  <path d="M 340 340 Q 355 300 370 340" fill="none" stroke="white" strokeWidth="2" opacity="0.1" />
                  {/* Horizon line */}
                  <line x1="0" y1="340" x2="500" y2="340" stroke="white" strokeWidth="0.5" opacity="0.15" />
                </svg>

                {/* Student figure */}
                <div className="flex flex-col items-center justify-center h-full pt-10 pb-16 relative z-10 min-h-[420px]">
                  {/* Grad cap */}
                  <div className="relative mb-2">
                    <svg width="80" height="50" viewBox="0 0 80 50" className="mx-auto">
                      <polygon points="40,5 75,22 40,38 5,22" fill="white" opacity="0.95" />
                      <rect x="60" y="22" width="3" height="20" fill="white" opacity="0.9" />
                      <circle cx="61.5" cy="44" r="4" fill="#F28C28" />
                    </svg>
                  </div>
                  {/* Person body illustration */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden mx-auto"
                      style={{ background: 'linear-gradient(135deg, #fde9d1, #fbc89a)' }}>
                      {/* Face */}
                      <svg viewBox="0 0 96 96" className="w-full h-full">
                        <circle cx="48" cy="48" r="48" fill="#fde9d1" />
                        <circle cx="35" cy="44" r="4" fill="#333" />
                        <circle cx="61" cy="44" r="4" fill="#333" />
                        <path d="M 35 62 Q 48 72 61 62" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M 10 30 Q 48 10 86 30 Q 80 15 48 12 Q 16 15 10 30" fill="#3b1f0a" />
                      </svg>
                    </div>
                    {/* Body */}
                    <div className="mt-2 flex justify-center">
                      <div className="w-16 h-20 rounded-2xl" style={{ background: 'rgba(255,255,255,0.15)' }} />
                    </div>
                  </div>
                  <div className="mt-4 px-6 py-2 rounded-full font-bold text-white text-lg"
                    style={{ background: 'rgba(242,140,40,0.8)' }}>
                    Dream. Explore. Achieve.
                  </div>
                </div>

                {/* Flight path overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 420">
                  <path d="M 20 380 Q 250 50 480 380" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="10 6" opacity="0.2" />
                  <text x="200" y="40" fill="white" fontSize="18" opacity="0.5">✈</text>
                </svg>
              </div>

              {/* Floating stat cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -left-6 top-12 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(10,61,145,0.1)' }}>
                  <FaUserGraduate style={{ color: '#0A3D91' }} />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">15,000+</div>
                  <div className="text-xs text-gray-500">Students Placed</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -right-6 bottom-20 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(242,140,40,0.1)' }}>
                  <FaCheckCircle style={{ color: '#F28C28' }} />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">98%</div>
                  <div className="text-xs text-gray-500">Visa Success</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -right-4 top-10 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(10,61,145,0.1)' }}>
                  <FaGlobe style={{ color: '#0A3D91' }} />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">20+</div>
                  <div className="text-xs text-gray-500">Countries</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
