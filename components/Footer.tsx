'use client';

import Link from 'next/link';
import { Github, Youtube, Mail, Heart, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/votre-compte', label: 'GitHub' },
    { icon: Youtube, href: 'https://youtube.com/@votre-chaine', label: 'YouTube' },
    { icon: Mail, href: 'mailto:votre@email.com', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Contenu',
      links: [
        { name: 'Linux', href: '/category/linux' },
        { name: 'DevOps', href: '/category/devops' },
        { name: 'Réseaux', href: '/category/reseaux' },
        { name: 'Sécurité', href: '/category/securite' },
      ],
    },
    {
      title: 'À propos',
      links: [
        { name: 'Qui suis-je ?', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
  ];

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-8 h-8 text-light-primary dark:text-dark-primary" />
              <span className="text-2xl font-bold font-display gradient-text">
                BiLearn
              </span>
            </div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 max-w-md">
              Apprends l'informatique gratuitement avec des cours et tutoriels
              pratiques sur Linux, DevOps, Réseaux et Sécurité.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-light-text dark:text-dark-text mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light-border dark:border-dark-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <p className="flex items-center gap-1">
              © {currentYear} BiLearn. Fait avec{' '}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /> par un passionné
            </p>
            <p className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary text-xs font-semibold">
                Sans cookies 🍪
              </span>
              <span>•</span>
              <span>100% Gratuit</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
