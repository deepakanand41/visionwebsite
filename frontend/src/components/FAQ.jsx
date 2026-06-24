import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { HOME_THEME as T } from '../utils/constants';

const faqs = [
  {
    question: 'How do I choose the right country for studying abroad?',
    answer:
      'Choosing the right country depends on factors like your preferred course, budget, career goals, and post-study work rights. Our expert counsellors evaluate your academic profile, financial situation, and career aspirations to recommend the best destinations tailored to your needs. We consider factors like tuition fees, living costs, visa success rates, and employment prospects after graduation.',
  },
  {
    question: 'What are the visa requirements for studying abroad?',
    answer:
      'Visa requirements vary by destination country. Generally, you\'ll need a confirmed university offer letter, proof of financial capability, language proficiency scores (IELTS/PTE/TOEFL), valid passport, and health insurance. Our visa specialists guide you through each country\'s specific requirements and help prepare a strong application to maximize your chances of approval — we maintain a 98% visa success rate.',
  },
  {
    question: 'Can I get scholarships to fund my education abroad?',
    answer:
      'Absolutely! There are thousands of scholarships available for international students — merit-based, need-based, country-specific, and university-offered. Our dedicated scholarship team helps you identify and apply for scholarships worth thousands of dollars. Many of our students have secured scholarships ranging from $5,000 to fully-funded programs.',
  },
  {
    question: 'How long does the entire admission process take?',
    answer:
      'The timeline varies by country and university intake. Generally, the process takes 3–6 months from initial counselling to receiving your visa. We recommend starting 9–12 months before your intended intake for the best university choices and scholarship opportunities. However, some countries like Germany and Canada have faster processing times and can be completed in as little as 4 months.',
  },
  {
    question: 'Which test should I take — IELTS or PTE?',
    answer:
      'Both IELTS and PTE are widely accepted by universities worldwide. The choice depends on your strengths: PTE is computer-based and results come faster (usually within 5 business days), while IELTS offers both computer and paper formats. Our test prep coaches will assess your skills and recommend the test where you\'re more likely to achieve your target score. We offer coaching for both.',
  },
  {
    question: 'What is the cost of studying abroad and how can I manage it?',
    answer:
      'Costs vary significantly by country and university. For example, Canada costs approximately $15,000–$25,000/year, while Germany has minimal tuition fees. We help you plan your finances through scholarship applications, education loan assistance (with our partner banks offering competitive rates), and by recommending cost-effective universities without compromising quality.',
  },
  {
    question: 'Do you offer support after I arrive in the destination country?',
    answer:
      'Yes! Our pre-departure orientation covers accommodation, banking, SIM cards, transportation, and cultural adaptation. We have alumni networks in major cities and stay connected with students after departure. For any issues with accommodation, university enrollment, or part-time work regulations, our team is just a call or message away.',
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="border border-gray-200 rounded-2xl overflow-hidden"
      style={{ boxShadow: open ? '0 4px 20px rgba(165,0,0,0.08)' : 'none' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-50"
        style={{ background: open ? T.redSoft : 'white' }}
      >
        <span className="font-semibold text-gray-800 pr-4 text-sm sm:text-base">{item.question}</span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all"
          style={{ background: open ? T.red : T.redSoft }}
        >
          {open ? (
            <FiMinus className="text-white" size={14} />
          ) : (
            <FiPlus size={14} style={{ color: T.red }} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed pt-4">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="faq" className="py-20" style={{ background: T.gradientLight }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
            style={{ background: T.redSoft, color: T.red }}
          >
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked{' '}
            <span style={{ color: T.red }}>Questions</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Everything you need to know about studying abroad with Vision International.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} item={faq} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10 p-6 rounded-2xl"
          style={{ background: T.redSoft, border: '1px solid rgba(165,0,0,0.1)' }}
        >
          <p className="text-gray-600 mb-3">Still have questions? Talk to our expert counsellors.</p>
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-md hover:-translate-y-0.5"
            style={{ background: T.gradientRed }}
          >
            Book Free Counselling
          </a>
        </motion.div>
      </div>
    </section>
  );
}
