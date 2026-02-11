'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import Card from './Card';
import { PostMetadata } from '@/lib/posts';

interface CategoryContentProps {
  posts: PostMetadata[];
}

export default function CategoryContent({ posts }: CategoryContentProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [posts, searchQuery]);

  return (
    <>
      {/* Search Filter */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer les articles..."
            className="w-full pl-12 pr-10 py-3 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder:text-light-text-secondary/60 dark:placeholder:text-dark-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            >
              <X className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            </button>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <Card key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto mb-4 text-light-text-secondary/40 dark:text-dark-text-secondary/40" />
          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
            Aucun article trouvé pour &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </>
  );
}
