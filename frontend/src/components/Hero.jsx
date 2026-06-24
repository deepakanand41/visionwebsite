import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FaGlobe, FaUserGraduate, FaAward, FaCheckCircle } from 'react-icons/fa';
import { HOME_THEME as T } from '../utils/constants';

const stats = [
  { icon: FaGlobe, value: '20+', label: 'Countries' },
  { icon: FaUserGraduate, value: '15,000+', label: 'Students' },
  { icon: FaAward, value: '10+', label: 'Years Exp.' },
  { icon: FaCheckCircle, value: '98%', label: 'Visa Success' },
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
      className="relative min-h-screen flex items-center overflow-hidden pt-20 text-white"
      style={{ background: T.gradientHero }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle at 80% 20%, ${T.red}, transparent 55%)` }}
      />
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: T.red }} />
              Vision International Educational Consultants
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Your Global{' '}
              <span style={{ color: T.red }}>Education Journey</span>{' '}
              Starts Here
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl"
            >
              Helping students achieve their dreams of studying abroad with expert guidance, visa assistance, test preparation and university admissions.
            </motion.p>

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
                style={{ background: T.gradientRed }}
              >
                Explore Destinations <FiArrowRight />
              </a>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 transition-all hover:shadow-md hover:-translate-y-0.5 bg-white/5 hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}
              >
                Book Free Counselling
              </Link>
            </motion.div>

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
                  className="text-center p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <s.icon className="mx-auto mb-1.5 text-xl" style={{ color: T.red }} />
                  <div className="text-xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-gray-400 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div
                className="absolute top-4 left-4 sm:top-5 sm:left-5 w-32 h-24 sm:w-36 sm:h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-white hidden sm:block z-30"
              >
                <img
                  src="/images/campus-students.png"
                  alt="Students on university campus"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4"
                style={{ borderColor: T.red }}
              >
                <img
                  src="/images/hero-students.png"
                  alt="International university students celebrating graduation"
                  className="w-full h-[420px] object-cover"
                />
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.35) 45%, transparent 70%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className="text-white font-bold text-lg">Dream. Explore. Achieve.</p>
                  <p className="text-gray-300 text-sm mt-1">Study at top universities worldwide</p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -right-4 top-8 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: T.redSoft }}>
                  <FaUserGraduate style={{ color: T.red }} />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">15,000+</div>
                  <div className="text-xs text-gray-500">Students Placed</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -right-2 bottom-20 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: T.redSoft }}>
                  <FaCheckCircle style={{ color: T.red }} />
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">98%</div>
                  <div className="text-xs text-gray-500">Visa Success</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
