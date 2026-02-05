import { notFound } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import Card from '@/components/Card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);
  return {
    title: `${categoryName} | BiLearn`,
    description: `Tous les articles et tutoriels sur ${categoryName}`,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const posts = getPostsByCategory(params.category);
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" icon={<ArrowLeft className="w-5 h-5" />} className="mb-8">
            Retour
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="text-6xl mb-4">{getCategoryEmoji(categoryName)}</div>
          <h1 className="text-4xl md:text-5xl font-black font-display mb-4">
            <span className="gradient-text">{categoryName}</span>
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} disponible
            {posts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function getCategoryEmoji(category: string): string {
  const emojis: { [key: string]: string } = {
    Linux: '🐧',
    Devops: '🚀',
    Réseaux: '🌐',
    Reseaux: '🌐',
    Sécurité: '🔒',
    Securite: '🔒',
  };
  return emojis[category] || '📚';
}
