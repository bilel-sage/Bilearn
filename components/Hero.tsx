'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Terminal, Zap } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

export default function Hero() {
  const features = [
    { icon: Terminal, text: 'Linux & DevOps' },
    { icon: Code2, text: 'Tutoriels pratiques' },
    { icon: Zap, text: '100% Gratuit' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        {/* Floating shapes */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-light-primary/10 dark:bg-dark-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 border border-light-primary/20 dark:border-dark-primary/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-light-primary dark:bg-dark-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-light-primary dark:bg-dark-primary"></span>
            </span>
            <span className="text-sm font-medium text-light-primary dark:text-dark-primary">
              Site 100% gratuit • Sans cookies 🍪
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black font-display mb-6 leading-tight"
          >
            Apprends l'informatique
            <br />
            <span className="gradient-text">comme un pro</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-light-text-secondary dark:text-dark-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Cours gratuits, tutoriels vidéo et guides pratiques sur Linux, DevOps, 
            Réseaux et Sécurité. Tout ce dont tu as besoin pour devenir un expert.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
              >
                <feature.icon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/category/linux">
              <Button size="lg" glow icon={<ArrowRight className="w-5 h-5" />}>
                Commencer avec Linux
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                En savoir plus
              </Button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary"
            >
              <span className="text-sm font-medium">Découvre nos cours</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-current rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
