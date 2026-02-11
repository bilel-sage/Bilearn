'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';

interface SearchBarProps {
  posts: PostMetadata[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query, posts]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Recherche un cours, un outil, un sujet..."
          className="w-full pl-12 pr-10 py-4 rounded-2xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder:text-light-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all text-base"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors"
          >
            <X className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 top-full mt-2 w-full rounded-2xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border shadow-xl overflow-hidden"
          >
            {results.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto">
                {results.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                  >
                    <div className="p-4 hover:bg-light-bg dark:hover:bg-dark-bg transition-colors border-b border-light-border/50 dark:border-dark-border/50 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary">
                          {post.category}
                        </span>
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 text-xs text-light-text-secondary dark:text-dark-text-secondary"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{post.title}</h4>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary line-clamp-1">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('fr-FR', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-8 h-8 mx-auto mb-3 text-light-text-secondary/40 dark:text-dark-text-secondary/40" />
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Aucun résultat pour &quot;{query}&quot;
                </p>
                <p className="text-xs text-light-text-secondary/60 dark:text-dark-text-secondary/60 mt-1">
                  Essaie avec d&apos;autres mots-clés
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
