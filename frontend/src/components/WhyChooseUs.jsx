import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { HOME_THEME as T } from '../utils/constants';

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
    <section id="why-us" className="py-20" style={{ background: T.gradientLight }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[460px]">
              <img
                src="/images/hero-students.png"
                alt="Happy international students"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(17,17,17,0.9) 0%, rgba(122,0,0,0.8) 100%)' }}
              />
              <div className="relative z-10 p-10 flex flex-col justify-center h-full min-h-[460px]">
                <div className="text-white mb-8">
                  <div className="text-5xl font-black mb-2">10+</div>
                  <div className="text-gray-300 font-medium">Years of Excellence</div>
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
                      <div className="text-xs text-gray-300 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['#fde9d1', '#ffd9b3', '#ffc9c9', '#f5f5f5'].map((bg, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-bold"
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
              <div className="text-2xl font-black" style={{ color: T.red }}>500+</div>
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
                style={{ background: T.redSoft, color: T.red }}
              >
                Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                Why Students{' '}
                <span style={{ color: T.red }}>Trust Us</span>
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
                    style={{ background: T.redSoft }}
                  >
                    <FaCheckCircle className="text-lg" style={{ color: T.red }} />
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
                style={{ background: T.gradientRed }}
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
