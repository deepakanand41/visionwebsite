import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceHero, FeatureGrid } from '../components/PageLayouts';
import DemoClassForm from '../components/DemoClassForm';
import {
  FaBook, FaChalkboardTeacher, FaCertificate, FaClock, FaUsers, FaTrophy,
  FaLaptop, FaRobot,
} from 'react-icons/fa';

const ieltsFeatures = [
  { icon: FaChalkboardTeacher, title: 'Expert Trainers', description: 'Certified IELTS trainers with 10+ years of experience and proven track records.' },
  { icon: FaBook, title: 'Comprehensive Material', description: 'Latest Cambridge IELTS books, practice tests, and exclusive study resources.' },
  { icon: FaClock, title: 'Flexible Batches', description: 'Weekday, weekend, and online batches to fit your schedule.' },
  { icon: FaCertificate, title: 'Mock Tests', description: 'Full-length mock tests with detailed band score analysis and feedback.' },
  { icon: FaUsers, title: 'Small Batch Size', description: 'Maximum 15 students per batch for personalized attention.' },
  { icon: FaTrophy, title: 'Proven Results', description: 'Average band score of 7.5+. Many achieve 8.0+ on first attempt.' },
];

const pteFeatures = [
  { icon: FaRobot, title: 'AI-Scored Practice', description: 'AI-powered scoring that mirrors the real PTE exam evaluation system.' },
  { icon: FaLaptop, title: 'Computer-Based Training', description: 'Full computer-based test environment for exam-day confidence.' },
  { icon: FaClock, title: 'Fast Results Strategy', description: 'PTE results in 2–5 days. Strategies to maximize scores quickly.' },
  { icon: FaCertificate, title: 'Unlimited Mock Tests', description: 'Unlimited full-length mocks with detailed performance analytics.' },
  { icon: FaUsers, title: 'Expert Faculty', description: 'PTE-certified trainers with deep scoring algorithm knowledge.' },
  { icon: FaTrophy, title: 'High Success Rate', description: '90%+ students achieve target score within 4 weeks of coaching.' },
];

const ieltsModules = [
  { name: 'Listening', desc: 'Authentic audio, note-completion strategies, accent familiarization.' },
  { name: 'Reading', desc: 'Skimming, scanning, and time management for all question types.' },
  { name: 'Writing', desc: 'Task 1 & 2 structure, vocabulary enhancement, essay feedback.' },
  { name: 'Speaking', desc: 'One-on-one mock interviews, fluency drills, pronunciation coaching.' },
];

const pteScoreGuide = [
  { range: '90', label: 'Expert', desc: 'Equivalent to IELTS 8.5–9.0' },
  { range: '79', label: 'Very Good', desc: 'Equivalent to IELTS 8.0' },
  { range: '65', label: 'Good', desc: 'Equivalent to IELTS 7.0' },
  { range: '58', label: 'Competent', desc: 'Equivalent to IELTS 6.5' },
  { range: '50', label: 'Moderate', desc: 'Equivalent to IELTS 6.0' },
];

const ieltsBatches = [
  { type: 'Regular Batch', duration: '8 Weeks', hours: '2 hrs/day' },
  { type: 'Intensive Batch', duration: '4 Weeks', hours: '3 hrs/day' },
  { type: 'Weekend Batch', duration: '10 Weeks', hours: '4 hrs/Sat-Sun' },
  { type: 'Online Batch', duration: '8 Weeks', hours: '2 hrs/day' },
];

const pteBatches = [
  { type: 'Regular Batch', duration: '4 Weeks', hours: '2 hrs/day' },
  { type: 'Intensive Batch', duration: '2 Weeks', hours: '3 hrs/day' },
  { type: 'Weekend Batch', duration: '6 Weeks', hours: '4 hrs/Sat-Sun' },
  { type: 'Online Batch', duration: '4 Weeks', hours: '2 hrs/day' },
];

function IELTSContent() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="ielts"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3 }}
      >
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Why Choose Our IELTS Coaching?</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Structured program to help you achieve your target band score on the first attempt.</p>
            </div>
            <FeatureGrid items={ieltsFeatures} />
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Four Modules Covered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ieltsModules.map((m, i) => (
                <div key={m.name} className="rounded-2xl p-5 border border-gray-100 text-center" style={{ boxShadow: '0 4px 20px rgba(10,61,145,0.06)' }}>
                  <div className="text-2xl font-black mb-2" style={{ color: i % 2 === 0 ? '#0A3D91' : '#F28C28' }}>0{i + 1}</div>
                  <h3 className="font-bold text-gray-800 mb-1.5">{m.name}</h3>
                  <p className="text-gray-500 text-sm">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Available IELTS Batches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ieltsBatches.map((b) => (
                <div key={b.type} className="bg-white rounded-2xl p-5 border border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">{b.type}</h3>
                    <p className="text-sm text-gray-500">{b.duration} · {b.hours}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(10,61,145,0.08)', color: '#0A3D91' }}>Open</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}

function PTEContent() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="pte"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3 }}
      >
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Why Choose Our PTE Coaching?</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Computer-based training with AI scoring — faster results and unbiased evaluation.</p>
            </div>
            <FeatureGrid items={pteFeatures} />
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">PTE Score Guide</h2>
            <p className="text-gray-500 text-center mb-8">How PTE scores map to IELTS equivalents</p>
            <div className="space-y-3">
              {pteScoreGuide.map((s) => (
                <div key={s.range} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white shrink-0" style={{ background: '#0A3D91' }}>
                    {s.range}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{s.label}</div>
                    <div className="text-sm text-gray-500">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">Available PTE Batches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pteBatches.map((b) => (
                <div key={b.type} className="bg-white rounded-2xl p-5 border border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">{b.type}</h3>
                    <p className="text-sm text-gray-500">{b.duration} · {b.hours}</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(242,140,40,0.1)', color: '#c27020' }}>Open</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}

export default function IELTSPTETraining() {
  const [activeTab, setActiveTab] = useState('ielts');

  return (
    <main>
      <ServiceHero
        badge="Test Preparation"
        title="IELTS / PTE"
        highlight="Training"
        subtitle="Master English proficiency tests with expert coaching, mock tests, and personalized study plans. Choose IELTS or PTE — we'll help you score your best."
        features={['Free Demo Class', 'Expert Trainers', 'Mock Tests Included', 'Online & Offline']}
      />

      {/* Tab Switcher */}
      <section className="sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-2 py-4">
            {[
              { id: 'ielts', label: 'IELTS Training', color: '#0A3D91' },
              { id: 'pte', label: 'PTE Training', color: '#F28C28' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-6 sm:px-10 py-3 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: activeTab === tab.id ? tab.color : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#4b5563',
                  border: activeTab === tab.id ? 'none' : '2px solid #e5e7eb',
                  boxShadow: activeTab === tab.id ? '0 4px 16px rgba(10,61,145,0.2)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'ielts' ? <IELTSContent /> : <PTEContent />}

      {/* Demo Class Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <DemoClassForm examType={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
