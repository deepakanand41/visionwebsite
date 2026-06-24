import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import {
  mainDestinations,
  europeDestinations,
  otherDestinations,
} from '../utils/destinationData';
import Logo from './Logo';

const navLinks = [
  { label: 'Education Loans', to: '/education-loans' },
  { label: 'Refer & Earn', to: '/refer-and-earn', highlight: true },
  { label: 'Success Stories', to: '/success-stories' },
  { label: 'Contact Us', to: '/contact-us' },
];

const testPrepLinks = [
  { label: 'IELTS Training', to: '/ielts-training' },
  { label: 'PTE Training', to: '/pte-training' },
  { label: 'Book IELTS exam', href: 'https://ieltsidpindia.com/', external: true },
  { label: 'Book PTE exam', href: 'https://ptebazaar.com/', external: true },
];

function TestPrepMenuItem({ link, pathname, onClick, className = '' }) {
  const active = link.to && pathname === link.to;
  const itemClass = `block px-4 py-3 text-sm transition-colors ${className} ${
    active
      ? 'font-semibold text-[#A50000] bg-red-50'
      : 'text-gray-700 hover:bg-red-50 hover:text-red-800'
  }`;

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={itemClass}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link to={link.to} onClick={onClick} className={itemClass}>
      {link.label}
    </Link>
  );
}

function destPath(slug) {
  return `/study-abroad/${slug}`;
}

function DestLink({ dest, active, onClick, className = '' }) {
  return (
    <Link
      to={destPath(dest.slug)}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${className} ${
        active
          ? 'font-semibold text-[#A50000] bg-red-50'
          : 'text-gray-700 hover:bg-red-50 hover:text-red-800'
      }`}
    >
      <span className="text-lg">{dest.flag}</span>
      {dest.name}
    </Link>
  );
}

function DestGroupFlyout({ label, open, onOpen, onClose, active, items, pathname, onNavigate }) {
  return (
    <div
      className="relative border-t border-gray-100"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        onClick={onOpen}
        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${
          active || open
            ? 'text-[#A50000] bg-red-50'
            : 'text-gray-800 hover:bg-red-50 hover:text-red-800'
        }`}
      >
        <span>{label}</span>
        <FiChevronRight size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.12 }}
            className="absolute left-full top-0 pl-1.5 z-50"
          >
            <div className="w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {items.map((d) => (
                <DestLink
                  key={d.slug}
                  dest={d}
                  active={pathname === destPath(d.slug)}
                  onClick={onNavigate}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [europeOpen, setEuropeOpen] = useState(false);
  const [otherOpen, setOtherOpen] = useState(false);
  const [mobileEuropeOpen, setMobileEuropeOpen] = useState(false);
  const [mobileOtherOpen, setMobileOtherOpen] = useState(false);
  const [testPrepOpen, setTestPrepOpen] = useState(false);
  const dropdownRef = useRef(null);
  const testPrepRef = useRef(null);
  const location = useLocation();

  const europeSlugs = europeDestinations.map((d) => d.slug);
  const otherSlugs = otherDestinations.map((d) => d.slug);
  const isEuropeActive = europeSlugs.some((s) => location.pathname === destPath(s));
  const isOtherActive = otherSlugs.some((s) => location.pathname === destPath(s));
  const isTestPrepActive = testPrepLinks.some((link) => link.to && location.pathname === link.to);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDestOpen(false);
    setEuropeOpen(false);
    setOtherOpen(false);
    setMobileEuropeOpen(false);
    setMobileOtherOpen(false);
    setTestPrepOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isEuropeActive) {
      setEuropeOpen(true);
      setMobileEuropeOpen(true);
    }
    if (isOtherActive) {
      setOtherOpen(true);
      setMobileOtherOpen(true);
    }
  }, [isEuropeActive, isOtherActive]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDestOpen(false);
        setEuropeOpen(false);
        setOtherOpen(false);
      }
      if (testPrepRef.current && !testPrepRef.current.contains(e.target)) {
        setTestPrepOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isDestinationsActive = location.pathname.startsWith('/study-abroad');

  const closeDestDropdown = () => {
    setDestOpen(false);
    setEuropeOpen(false);
    setOtherOpen(false);
  };

  const openEuropeMenu = () => {
    setEuropeOpen(true);
    setOtherOpen(false);
  };

  const openOtherMenu = () => {
    setOtherOpen(true);
    setEuropeOpen(false);
  };

  const closeEuropeMenu = () => setEuropeOpen(false);
  const closeOtherMenu = () => setOtherOpen(false);

  const linkClass = (highlight, active) =>
    `flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap ${
      highlight
        ? `font-semibold ${active ? 'bg-red-50' : 'hover:opacity-90'}`
        : active
          ? 'font-semibold text-[#A50000] bg-red-50'
          : 'font-medium text-gray-700 hover:text-red-800 hover:bg-red-50'
    }`;

  const mobileLinkClass = (highlight, active) =>
    `flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg ${
      highlight
        ? `font-semibold ${active ? 'bg-red-50' : ''}`
        : active
          ? 'font-semibold text-[#A50000] bg-red-50'
          : 'font-medium text-gray-700 hover:bg-red-50'
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
                    ? 'font-semibold text-[#A50000] bg-red-50'
                    : 'font-medium text-gray-700 hover:text-red-800 hover:bg-red-50'
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
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-visible z-50"
                  >
                    {mainDestinations.map((d) => (
                      <DestLink
                        key={d.slug}
                        dest={d}
                        active={location.pathname === destPath(d.slug)}
                        onClick={closeDestDropdown}
                      />
                    ))}

                    <DestGroupFlyout
                      label="Europe"
                      open={europeOpen}
                      onOpen={openEuropeMenu}
                      onClose={closeEuropeMenu}
                      active={isEuropeActive}
                      items={europeDestinations}
                      pathname={location.pathname}
                      onNavigate={closeDestDropdown}
                    />

                    <DestGroupFlyout
                      label="Other Destinations"
                      open={otherOpen}
                      onOpen={openOtherMenu}
                      onClose={closeOtherMenu}
                      active={isOtherActive}
                      items={otherDestinations}
                      pathname={location.pathname}
                      onNavigate={closeDestDropdown}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" ref={testPrepRef}>
              <button
                onClick={() => setTestPrepOpen(!testPrepOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                  isTestPrepActive
                    ? 'font-semibold text-[#A50000] bg-red-50'
                    : 'font-medium text-gray-700 hover:text-red-800 hover:bg-red-50'
                }`}
              >
                Test Preparation
                <FiChevronDown className={`transition-transform duration-200 ${testPrepOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {testPrepOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    {testPrepLinks.map((link) => (
                      <TestPrepMenuItem
                        key={link.to || link.href}
                        link={link}
                        pathname={location.pathname}
                        onClick={() => setTestPrepOpen(false)}
                      />
                    ))}
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
                  style={link.highlight ? { color: '#A50000' } : {}}
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
              style={{ background: 'linear-gradient(135deg, #A50000, #7A0000)' }}
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
              <div
                className={`font-medium text-sm px-3 py-2 ${
                  isDestinationsActive ? 'text-[#A50000] font-semibold' : 'text-gray-500'
                }`}
              >
                Study Destinations
              </div>

              {mainDestinations.map((d) => (
                <DestLink
                  key={d.slug}
                  dest={d}
                  active={location.pathname === destPath(d.slug)}
                  onClick={() => setMobileOpen(false)}
                />
              ))}

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setMobileEuropeOpen(!mobileEuropeOpen)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-lg ${
                    isEuropeActive ? 'text-[#A50000] bg-red-50' : 'text-gray-800 hover:bg-red-50'
                  }`}
                >
                  Europe
                  <FiChevronRight className={`transition-transform ${mobileEuropeOpen ? 'rotate-90' : ''}`} size={16} />
                </button>
                <AnimatePresence>
                  {mobileEuropeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {europeDestinations.map((d) => (
                        <DestLink
                          key={d.slug}
                          dest={d}
                          active={location.pathname === destPath(d.slug)}
                          onClick={() => setMobileOpen(false)}
                          className="pl-8"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setMobileOtherOpen(!mobileOtherOpen)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-lg ${
                    isOtherActive ? 'text-[#A50000] bg-red-50' : 'text-gray-800 hover:bg-red-50'
                  }`}
                >
                  Other Destinations
                  <FiChevronRight className={`transition-transform ${mobileOtherOpen ? 'rotate-90' : ''}`} size={16} />
                </button>
                <AnimatePresence>
                  {mobileOtherOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {otherDestinations.map((d) => (
                        <DestLink
                          key={d.slug}
                          dest={d}
                          active={location.pathname === destPath(d.slug)}
                          onClick={() => setMobileOpen(false)}
                          className="pl-8"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={`font-medium text-sm px-3 py-2 ${isTestPrepActive ? 'text-[#A50000] font-semibold' : 'text-gray-500'}`}>
                Test Preparation
              </div>
              {testPrepLinks.map((link) => (
                <TestPrepMenuItem
                  key={link.to || link.href}
                  link={link}
                  pathname={location.pathname}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg py-2.5"
                />
              ))}

              <div className="border-t border-gray-100 my-2" />
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={mobileLinkClass(link.highlight, active)}
                    style={link.highlight ? { color: '#A50000' } : {}}
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
                  style={{ background: 'linear-gradient(135deg, #A50000, #7A0000)' }}
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
