import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiArrowRight } from 'react-icons/fi';
import { HOME_THEME as T } from '../utils/constants';

export default function SignIn() {
  return (
    <main>
      <section className="pt-32 pb-16 min-h-[70vh] flex items-center" style={{ background: T.gradientLight }}>
        <div className="max-w-md mx-auto px-4 w-full">
          <div
            className="bg-white rounded-3xl border border-gray-100 p-8 text-center"
            style={{ boxShadow: '0 8px 32px rgba(165,0,0,0.08)' }}
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{ background: T.redSoft }}
            >
              <FiUser size={28} style={{ color: T.red }} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Sign In</h1>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Your personal student portal for application tracking, document uploads, and counsellor messages is coming soon.
            </p>
            <div className="space-y-3">
              <Link
                to="/contact-us"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:shadow-lg"
                style={{ background: T.gradientRed }}
              >
                <FiMail size={18} /> Contact Us for Assistance
              </Link>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Back to Home <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
