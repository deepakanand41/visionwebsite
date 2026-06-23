import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const features = [
  {
    title: 'Expert Counsellors',
    description: 'Certified overseas education consultants with 10+ years of experience in guiding students.',
  },
  {
    title: 'Personalized Guidance',
    description: 'One-on-one counselling sessions tailored to your academic background and career goals.',
  },
  {
    title: 'High Visa Success Rate',
    description: '98% visa approval rate backed by thorough documentation and interview preparation.',
  },
  {
    title: 'University Partnerships',
    description: 'Direct partnerships with 500+ universities for faster admissions and exclusive scholarships.',
  },
  {
    title: 'End-to-End Support',
    description: 'From shortlisting universities to pre-departure orientation — we\'re with you throughout.',
  },
  {
    title: 'Scholarship Assistance',
    description: 'Dedicated scholarship team to help you access merit and need-based funding opportunities.',
  },
];

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why-us" className="py-20" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main illustration card */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #0A3D91 0%, #1a5cb8 60%, #2563eb 100%)',
                minHeight: '460px',
              }}
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 400 460" className="w-full h-full">
                  <circle cx="350" cy="50" r="150" fill="white" />
                  <circle cx="50" cy="400" r="120" fill="white" />
                  {/* Grid pattern */}
                  {[...Array(8)].map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 60} x2="400" y2={i * 60} stroke="white" strokeWidth="0.5" />
                  ))}
                  {[...Array(7)].map((_, i) => (
                    <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="460" stroke="white" strokeWidth="0.5" />
                  ))}
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 p-10 flex flex-col justify-center h-full min-h-[460px]">
                <div className="text-white mb-8">
                  <div className="text-5xl font-black mb-2">10+</div>
                  <div className="text-blue-200 font-medium">Years of Excellence</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '15K+', label: 'Students Placed' },
                    { value: '500+', label: 'University Partners' },
                    { value: '20+', label: 'Countries' },
                    { value: '98%', label: 'Visa Success' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center"
                    >
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-blue-200 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['#fde9d1', '#d4e8ff', '#ffd9b3', '#c8e6c9'].map((bg, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-blue-700 flex items-center justify-center text-xs font-bold"
                        style={{ background: bg, color: '#333' }}
                      >
                        {['S', 'P', 'A', 'R'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Our Happy Students</div>
                    <div className="flex text-yellow-400 text-xs">★★★★★</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -right-6 top-12 bg-white rounded-2xl shadow-xl p-4 text-center"
              style={{ minWidth: '120px' }}
            >
              <div className="text-2xl font-black" style={{ color: '#F28C28' }}>500+</div>
              <div className="text-xs text-gray-500 font-medium">University<br/>Partners</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5 }}
              className="absolute -left-6 bottom-16 bg-white rounded-2xl shadow-xl px-4 py-3"
            >
              <div className="text-sm font-bold text-gray-800">🏆 #1 Rated Consultancy</div>
              <div className="flex text-yellow-400 text-sm mt-0.5">★★★★★</div>
            </motion.div>
          </motion.div>

          {/* Right - Features */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
                style={{ background: 'rgba(10,61,145,0.08)', color: '#0A3D91' }}
              >
                Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                Why Students{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0A3D91, #F28C28)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Trust Us
                </span>
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                We combine expertise, technology and genuine care to make your study abroad journey seamless and successful.
              </p>
            </motion.div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="space-y-4"
            >
              {features.map((feature) => (
                <motion.li
                  key={feature.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(10,61,145,0.08)' }}
                  >
                    <FaCheckCircle className="text-lg" style={{ color: '#0A3D91' }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-0.5">{feature.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)' }}
              >
                Start Your Journey <FiArrowRight />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
