import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { ServiceHero } from '../components/PageLayouts';
import BookExamForm from '../components/BookExamForm';
import { HOME_THEME as T } from '../utils/constants';

const examContent = {
  ielts: {
    title: 'IELTS',
    highlight: 'Test Booking',
    subtitle:
      'Book your IELTS test with expert guidance on test type, dates, centres, and preparation — all in one place.',
    aboutTitle: 'About the IELTS Exam',
    aboutText:
      'IELTS (International English Language Testing System) is accepted by 11,000+ organisations worldwide. Choose Academic for university admissions or General Training for migration and work visas.',
    details: [
      { label: 'Test Duration', value: '2 hours 45 minutes' },
      { label: 'Modules', value: 'Listening, Reading, Writing, Speaking' },
      { label: 'Result Time', value: '3–5 days (Computer) · 13 days (Paper)' },
      { label: 'Validity', value: '2 years' },
    ],
    formats: [
      'IELTS Academic — for higher education and professional registration',
      'IELTS General Training — for migration, work, and training programs',
      'Computer-delivered IELTS — flexible dates, faster results',
      'Paper-based IELTS — traditional format at select centres',
    ],
    helpPoints: [
      'Guidance on Academic vs General Training selection',
      'Help choosing the right test centre and date',
      'Document checklist for exam registration',
      'Coaching packages if you need preparation support',
    ],
  },
  pte: {
    title: 'PTE',
    highlight: 'Exam Booking',
    subtitle:
      'Book your PTE Academic exam with our team’s support for slot selection, registration, and score-targeted coaching.',
    aboutTitle: 'About the PTE Exam',
    aboutText:
      'PTE Academic is a fully computer-based English test accepted by universities, colleges, and governments globally. Results are typically available within 2–5 business days.',
    details: [
      { label: 'Test Duration', value: '2 hours' },
      { label: 'Modules', value: 'Speaking & Writing, Reading, Listening' },
      { label: 'Result Time', value: 'Usually within 48 hours' },
      { label: 'Validity', value: '2 years' },
    ],
    formats: [
      'PTE Academic — study abroad and visa applications',
      'PTE Core — for work and migration to Canada',
      'Fully computer-based with AI scoring',
      'Flexible test dates at authorised centres',
    ],
    helpPoints: [
      'Help selecting PTE Academic vs PTE Core',
      'Centre and date availability guidance',
      'Registration and ID document support',
      'PTE coaching if you want to improve your score',
    ],
  },
};

function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl p-4 border border-gray-100 bg-white" style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
        <Icon size={14} style={{ color: T.red }} />
        {label}
      </div>
      <p className="font-semibold text-gray-900 text-sm">{value}</p>
    </div>
  );
}

export default function BookExam({ exam = 'ielts' }) {
  const content = examContent[exam] ?? examContent.ielts;

  return (
    <main>
      <ServiceHero
        badge="Test Preparation"
        title={content.title}
        highlight={content.highlight}
        subtitle={content.subtitle}
        features={['Test Registration Help', 'Centre & Date Guidance', 'Expert Counselling', 'Coaching Available']}
      />

      <section className="py-14" style={{ background: T.gradientLight }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{content.aboutTitle}</h2>
                <p className="text-gray-600 leading-relaxed">{content.aboutText}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard icon={FiClock} label="Duration" value={content.details[0].value} />
                <DetailCard icon={FiCalendar} label="Results" value={content.details[2].value} />
                <DetailCard icon={FiMapPin} label="Modules" value={content.details[1].value} />
                <DetailCard icon={FiCheckCircle} label="Validity" value={content.details[3].value} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Exam Formats</h3>
                <ul className="space-y-3">
                  {content.formats.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <FiCheckCircle className="shrink-0 mt-0.5" style={{ color: T.red }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl p-6 border border-gray-100 bg-white"
                style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">How Vision International Helps</h3>
                <ul className="space-y-2.5">
                  {content.helpPoints.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="font-bold" style={{ color: T.red }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="lg:sticky lg:top-28"
            >
              <BookExamForm examType={exam} />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
