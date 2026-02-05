'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Code2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Linux', href: '/category/linux' },
  { name: 'DevOps', href: '/category/devops' },
  { name: 'Réseaux', href: '/category/reseaux' },
  { name: 'Sécurité', href: '/category/securite' },
  { name: 'À propos', href: '/about' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Terminal className="w-8 h-8 text-light-primary dark:text-dark-primary" />
              <motion.div
                className="absolute inset-0 bg-light-primary dark:bg-dark-primary rounded-full blur-md opacity-0 group-hover:opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xl font-bold font-display gradient-text">
              BiLearn
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-all duration-200 font-medium"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-light-text dark:text-dark-text" />
              ) : (
                <Menu className="w-6 h-6 text-light-text dark:text-dark-text" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-surface dark:hover:bg-dark-surface transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
