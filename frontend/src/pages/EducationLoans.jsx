import { motion } from 'framer-motion';
import { ServiceHero, FeatureGrid } from '../components/PageLayouts';
import EducationLoanForm from '../components/EducationLoanForm';
import { FaUniversity, FaHandshake, FaFileInvoiceDollar, FaShieldAlt, FaClock, FaPercent } from 'react-icons/fa';

const features = [
  { icon: FaUniversity, title: 'Top Bank Partners', description: 'Tie-ups with HDFC Credila, Avanse, Prodigy Finance, MPOWER, and 15+ NBFCs.' },
  { icon: FaPercent, title: 'Competitive Rates', description: 'Interest rates starting from 9.5% p.a. with flexible repayment options.' },
  { icon: FaFileInvoiceDollar, title: 'Collateral-Free Options', description: 'Unsecured education loans up to ₹40 lakhs for top-ranked universities.' },
  { icon: FaClock, title: 'Fast Processing', description: 'Loan approval within 7–15 working days with dedicated loan counsellor support.' },
  { icon: FaShieldAlt, title: 'Moratorium Period', description: 'No EMI during study period + 6–12 months grace period after graduation.' },
  { icon: FaHandshake, title: 'End-to-End Support', description: 'From application to disbursement — we handle documentation and follow-ups.' },
];

const loanTypes = [
  { title: 'Secured Education Loan', amount: 'Up to ₹1.5 Crore', rate: 'From 9.5% p.a.', collateral: 'Property / FD required', tenure: 'Up to 15 years' },
  { title: 'Unsecured Education Loan', amount: 'Up to ₹40 Lakhs', rate: 'From 11% p.a.', collateral: 'No collateral needed', tenure: 'Up to 12 years' },
  { title: 'International Lender (USD)', amount: 'Up to $100,000', rate: 'From 8.5% p.a.', collateral: 'No collateral for top unis', tenure: 'Up to 15 years' },
];

const documents = [
  'Admission letter from university',
  'Fee structure / cost of attendance',
  'Academic transcripts and certificates',
  'KYC documents (Aadhaar, PAN)',
  'Income proof of co-applicant / guarantor',
  'Bank statements (last 6 months)',
  'Collateral documents (if secured loan)',
];

export default function EducationLoans() {
  return (
    <main>
      <ServiceHero
        badge="Education Loans"
        title="Fund Your Dreams with"
        highlight="Education Loans"
        subtitle="Hassle-free education loan assistance with India's top banks and international lenders. Competitive rates, fast processing, and dedicated support."
        features={['15+ Lender Partners', 'Collateral-Free Options', '7-Day Processing', 'Moratorium Available']}
        ctaLink="/education-loans#loan-form"
        ctaText="Apply for Education Loan"
      />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-14"
        style={{ background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 items-start">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Why Get Your Loan Through Vision?</h2>
                <p className="text-gray-500 mb-8">We simplify the loan process so you can focus on your applications.</p>
                <FeatureGrid items={features} columns={2} />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Loan Options</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                  {loanTypes.map((loan) => (
                    <div
                      key={loan.title}
                      className="rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-all bg-white"
                      style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}
                    >
                      <h3 className="font-bold text-gray-800 text-base mb-3">{loan.title}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Amount</span>
                          <span className="font-semibold text-gray-800 text-right">{loan.amount}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Interest</span>
                          <span className="font-semibold" style={{ color: '#A50000' }}>{loan.rate}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Collateral</span>
                          <span className="font-semibold text-gray-800 text-right">{loan.collateral}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-500">Tenure</span>
                          <span className="font-semibold text-gray-800">{loan.tenure}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full space-y-6">
              <EducationLoanForm />

              <div className="rounded-2xl p-6 border border-gray-100 bg-white" style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Documents Required</h3>
                <ul className="space-y-2.5">
                  {documents.map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
                        style={{ background: '#A50000' }}
                      >
                        ✓
                      </span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
