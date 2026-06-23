import { ServiceHero, FeatureGrid } from '../components/PageLayouts';
import { FaUniversity, FaHandshake, FaFileInvoiceDollar, FaShieldAlt, FaClock, FaPercent } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Get Your Loan Through Vision?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We simplify the loan process so you can focus on your applications.</p>
          </div>
          <FeatureGrid items={features} />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Loan Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loanTypes.map((loan) => (
              <div key={loan.title} className="rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all" style={{ boxShadow: '0 4px 20px rgba(10,61,145,0.06)' }}>
                <h3 className="font-bold text-gray-800 text-lg mb-4">{loan.title}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-semibold text-gray-800">{loan.amount}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Interest</span><span className="font-semibold" style={{ color: '#0A3D91' }}>{loan.rate}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Collateral</span><span className="font-semibold text-gray-800">{loan.collateral}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tenure</span><span className="font-semibold text-gray-800">{loan.tenure}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Documents Required</h2>
          <ul className="space-y-3">
            {documents.map((doc) => (
              <li key={doc} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: '#0A3D91' }}>✓</span>
                <span className="text-gray-700 text-sm">{doc}</span>
              </li>
            ))}
          </ul>
          <div className="text-center mt-10">
            <Link to="/contact-us" className="inline-flex px-8 py-4 rounded-full font-semibold text-white" style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)' }}>
              Apply for Education Loan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
