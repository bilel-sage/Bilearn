'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag } from 'lucide-react';
import { PostMetadata } from '@/lib/posts';

interface CardProps {
  post: PostMetadata;
  index?: number;
}

export default function Card({ post, index = 0 }: CardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/posts/${post.slug}`}>
        <div className="h-full p-6 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary transition-all duration-300 card-hover">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary border border-light-primary/20 dark:border-dark-primary/20">
              {post.category}
            </span>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-1 text-light-text-secondary dark:text-dark-text-secondary text-xs">
                <Tag className="w-3 h-3" />
                <span>{post.tags[0]}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-light-text dark:text-dark-text group-hover:gradient-text transition-all duration-200">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
            {post.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          {/* Hover Effect Line */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent mt-4"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.article>
  );
}
