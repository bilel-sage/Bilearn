'use client';

import { motion } from 'framer-motion';
import { Rocket, Star, Flame, ArrowRight, FolderOpen } from 'lucide-react';
import { projects } from '@/data/projects';
import Link from 'next/link';

interface PracticalProjectsProps {
  slug: string;
}

const difficultyConfig = {
  debutant: {
    label: 'Débutant',
    icon: Star,
    badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
  },
  intermediaire: {
    label: 'Intermédiaire',
    icon: Rocket,
    badgeClass: 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30',
  },
  difficile: {
    label: 'Difficile',
    icon: Flame,
    badgeClass: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30',
  },
};

export default function PracticalProjects({ slug }: PracticalProjectsProps) {
  const projectList = projects[slug];

  if (!projectList || projectList.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-light-primary/10 dark:bg-dark-primary/10">
          <FolderOpen className="w-6 h-6 text-light-primary dark:text-dark-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-display">Projets pratiques</h2>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Mets en pratique ce que tu as appris
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projectList.map((project, index) => {
          const config = difficultyConfig[project.difficulty];
          const Icon = config.icon;

          return (
            <Link key={index} href={`/projects/${slug}/${index}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group relative p-6 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface transition-all duration-300 card-hover h-full cursor-pointer"
              >
                {/* Difficulty Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.badgeClass}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {config.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-3 group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-light-primary dark:text-dark-primary">
                  Voir les étapes
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}
