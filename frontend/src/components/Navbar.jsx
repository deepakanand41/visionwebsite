import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import { destinationsList } from '../utils/destinationData';
import Logo from './Logo';

const navLinks = [
  { label: 'IELTS / PTE', to: '/ielts-pte-training' },
  { label: 'Education Loans', to: '/education-loans' },
  { label: 'Refer & Earn', to: '/refer-and-earn', highlight: true },
  { label: 'Success Stories', to: '/success-stories' },
  { label: 'Contact Us', to: '/contact-us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDestOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isDestinationsActive = location.pathname.startsWith('/study-abroad');

  const linkClass = (highlight, active) =>
    `flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap ${
      highlight
        ? `font-semibold ${active ? 'bg-orange-50' : 'hover:opacity-90'}`
        : active
          ? 'font-semibold text-[#0A3D91] bg-blue-50'
          : 'font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50'
    }`;

  const mobileLinkClass = (highlight, active) =>
    `flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg ${
      highlight
        ? `font-semibold ${active ? 'bg-orange-50' : ''}`
        : active
          ? 'font-semibold text-[#0A3D91] bg-blue-50'
          : 'font-medium text-gray-700 hover:bg-blue-50'
    }`;

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          <Link to="/" className="flex items-center shrink-0">
            <Logo className="h-12 sm:h-[3.6rem] w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDestOpen(!destOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isDestinationsActive
                    ? 'font-semibold text-[#0A3D91] bg-blue-50'
                    : 'font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                }`}
              >
                Study Destinations
                <FiChevronDown className={`transition-transform duration-200 ${destOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {destOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    {destinationsList.map((d) => {
                      const destActive = location.pathname === `/study-abroad/${d.slug}`;
                      return (
                      <Link
                        key={d.slug}
                        to={`/study-abroad/${d.slug}`}
                        onClick={() => setDestOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                          destActive
                            ? 'font-semibold text-[#0A3D91] bg-blue-50'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                      >
                        <span className="text-lg">{d.flag}</span>
                        {d.name}
                      </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
              <Link
                key={link.label}
                to={link.to}
                className={linkClass(link.highlight, active)}
                style={link.highlight ? { color: '#F28C28' } : {}}
              >
                {link.highlight && <FaHandshake size={13} />}
                {link.label}
              </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/contact-us"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)' }}
            >
              Book Free Counselling
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <div className={`font-medium text-sm px-3 py-2 ${isDestinationsActive ? 'text-[#0A3D91] font-semibold' : 'text-gray-500'}`}>
                Study Destinations
              </div>
              {destinationsList.map((d) => {
                const destActive = location.pathname === `/study-abroad/${d.slug}`;
                return (
                <Link
                  key={d.slug}
                  to={`/study-abroad/${d.slug}`}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg ${
                    destActive ? 'font-semibold text-[#0A3D91] bg-blue-50' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <span>{d.flag}</span> {d.name}
                </Link>
                );
              })}
              <div className="border-t border-gray-100 my-2" />
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={mobileLinkClass(link.highlight, active)}
                  style={link.highlight ? { color: '#F28C28' } : {}}
                >
                  {link.highlight && <FaHandshake size={14} />}
                  {link.label}
                </Link>
                );
              })}
              <div className="pt-2">
                <Link
                  to="/contact-us"
                  className="block text-center px-5 py-3 text-sm font-semibold text-white rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #F28C28, #d4751a)' }}
                >
                  Book Free Counselling
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
