import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiArrowRight,
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiUpload,
  FiX,
  FiUsers,
  FiTrendingUp,
  FiHeart,
} from 'react-icons/fi';
import { fetchCareers, submitJobApplication } from '../services/api';
import { HOME_THEME as T } from '../utils/constants';
import { JOB_TYPE_FILTERS, jobTypeLabel } from '../utils/jobDesignations';

const EMPLOYMENT_LABELS = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
};

const PERKS = [
  { icon: FiTrendingUp, title: 'Career Growth', desc: 'Structured learning paths and promotion opportunities across branches.' },
  { icon: FiUsers, title: 'Collaborative Culture', desc: 'Work with passionate counsellors, trainers, and operations experts.' },
  { icon: FiHeart, title: 'Meaningful Impact', desc: 'Help students achieve life-changing study abroad dreams every day.' },
];

function parseLines(text) {
  if (!text) return [];
  return text.split('\n').map((line) => line.trim()).filter(Boolean);
}

function ApplyModal({ job, onClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentCity: '',
    currentRole: '',
    experienceYears: '',
    linkedinUrl: '',
    coverMessage: '',
  });
  const [resume, setResume] = useState(null);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error('Please upload your resume (PDF or Word).');
      return;
    }
    if (resume.size > 5 * 1024 * 1024) {
      toast.error('Resume must be smaller than 5MB.');
      return;
    }

    const fd = new FormData();
    fd.append('job_id', String(job.id));
    fd.append('full_name', form.fullName);
    fd.append('email', form.email);
    fd.append('phone', form.phone);
    if (form.currentCity) fd.append('current_city', form.currentCity);
    if (form.currentRole) fd.append('current_role', form.currentRole);
    if (form.experienceYears) fd.append('experience_years', form.experienceYears);
    if (form.linkedinUrl) fd.append('linkedin_url', form.linkedinUrl);
    if (form.coverMessage) fd.append('cover_message', form.coverMessage);
    fd.append('resume', resume);

    setSubmitting(true);
    try {
      const result = await submitJobApplication(fd);
      toast.success(result.message || 'Application submitted!');
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button type="button" className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Close" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between gap-4 z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: T.red }}>Apply Now</p>
            <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input required value={form.fullName} onChange={update('fullName')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input required value={form.phone} onChange={update('phone')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input required type="email" value={form.email} onChange={update('email')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current City</label>
              <input value={form.currentCity} onChange={update('currentCity')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
              <input value={form.experienceYears} onChange={update('experienceYears')} placeholder="e.g. 2 years" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Role / Designation</label>
            <input value={form.currentRole} onChange={update('currentRole')} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
            <input value={form.linkedinUrl} onChange={update('linkedinUrl')} placeholder="https://linkedin.com/in/..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Note</label>
            <textarea rows={3} value={form.coverMessage} onChange={update('coverMessage')} placeholder="Why do you want to join Vision International?" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resume * (PDF or Word, max 5MB)</label>
            <label className="flex flex-col items-center justify-center gap-2 w-full py-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#A50000]/40 cursor-pointer transition-colors bg-gray-50">
              <FiUpload className="text-gray-400" size={24} />
              <span className="text-sm text-gray-600">{resume ? resume.name : 'Click to upload resume'}</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg disabled:opacity-60"
            style={{ background: T.gradientRed }}
          >
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function JobCard({ job, onApply, onExpand, expanded }) {
  const requirements = parseLines(job.requirements).slice(0, 4);

  return (
    <motion.article
      layout
      className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(165,0,0,0.07)' }}
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ background: T.redSoft, color: T.red }}>
              {jobTypeLabel(job.job_type)}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{job.title}</h3>
          </div>
          <button
            type="button"
            onClick={() => onApply(job)}
            className="shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-lg"
            style={{ background: T.gradientRed }}
          >
            Apply Now
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
          <span className="flex items-center gap-1.5"><FiMapPin size={14} style={{ color: T.red }} /> {job.location}</span>
          <span className="flex items-center gap-1.5"><FiBriefcase size={14} style={{ color: T.red }} /> {EMPLOYMENT_LABELS[job.employment_type] || job.employment_type}</span>
          {job.experience_required && (
            <span className="flex items-center gap-1.5"><FiClock size={14} style={{ color: T.red }} /> {job.experience_required}</span>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">{job.description}</p>

        {requirements.length > 0 && (
          <ul className="space-y-2 mb-5">
            {requirements.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: T.red }} />
                {item}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => onExpand(job.id)}
          className="text-sm font-semibold flex items-center gap-1"
          style={{ color: T.red }}
        >
          {expanded ? 'Show less' : 'View full details'} <FiArrowRight className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-gray-100 space-y-5">
                {job.salary_range && (
                  <p className="text-sm"><span className="font-semibold text-gray-800">Compensation: </span>{job.salary_range}</p>
                )}
                {parseLines(job.requirements).length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Requirements</h4>
                    <ul className="space-y-2">
                      {parseLines(job.requirements).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[#A50000] font-bold">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {parseLines(job.responsibilities).length > 0 && (
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Responsibilities</h4>
                    <ul className="space-y-2">
                      {parseLines(job.responsibilities).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-[#A50000] font-bold">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => onApply(job)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                  style={{ background: T.gradientRed }}
                >
                  Apply for this role <FiArrowRight />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [applyJob, setApplyJob] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCareers(filter === 'all' ? null : filter)
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <main>
      <section className="pt-32 lg:pt-36 pb-14 text-white" style={{ background: T.gradientHero }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/15" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <FiBriefcase /> Careers at Vision
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Build Your Career While <span style={{ color: T.red }}>Shaping Futures</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Join Vision International Educational Consultants and work with a team dedicated to guiding students toward world-class education abroad.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {PERKS.map((perk) => (
              <div key={perk.title} className="rounded-2xl p-6 border border-gray-100" style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.05)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: T.redSoft }}>
                  <perk.icon style={{ color: T.red }} size={20} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-b border-gray-100 sticky top-16 lg:top-[7rem] z-30">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
          {JOB_TYPE_FILTERS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFilter(t.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === t.id ? T.red : 'white',
                color: filter === t.id ? 'white' : '#4b5563',
                border: filter === t.id ? 'none' : '1px solid #e5e7eb',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {loading ? (
            <p className="text-center text-gray-500 py-20">Loading openings...</p>
          ) : !jobs.length ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <FiBriefcase className="mx-auto mb-4 text-gray-300" size={40} />
              <p className="text-gray-500">No openings in this category right now. Check back soon or send your resume to our HR team.</p>
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                expanded={expandedId === job.id}
                onExpand={(id) => setExpandedId((prev) => (prev === id ? null : id))}
                onApply={setApplyJob}
              />
            ))
          )}
        </div>
      </section>

      <AnimatePresence>
        {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      </AnimatePresence>
    </main>
  );
}
