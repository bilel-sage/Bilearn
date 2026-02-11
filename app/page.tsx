import Hero from '@/components/Hero';
import Card from '@/components/Card';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar';
import { getAllPosts, getAllCategories } from '@/lib/posts';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 6);
  const categories = getAllCategories();

  return (
    <>
      <Hero />

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8 relative z-20">
        <SearchBar posts={allPosts} />
      </section>

      {/* Latest Posts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold font-display mb-2">
              Derniers <span className="gradient-text">articles</span>
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Les tutoriels les plus récents pour progresser
            </p>
          </div>
          <Link href="/posts">
            <Button variant="outline" icon={<ArrowRight className="w-5 h-5" />}>
              Voir tout
            </Button>
          </Link>
        </div>

        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map((post, index) => (
              <Card key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
              Pas encore d'articles. Revenez bientôt !
            </p>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="bg-light-surface dark:bg-dark-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-display mb-2">
              Explore par <span className="gradient-text">catégorie</span>
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Trouve exactement ce que tu cherches
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Linux', 'DevOps', 'Réseaux', 'Glossaire'].map((category, index) => {
              const categorySlug = category.toLowerCase().replace('é', 'e');
              const postCount = allPosts.filter(
                (post) => post.category.toLowerCase() === categorySlug
              ).length;

              return (
                <Link key={category} href={`/category/${categorySlug}`}>
                  <div className="p-6 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border hover:border-light-primary dark:hover:border-dark-primary transition-all duration-300 card-hover text-center group">
                    <div className="text-4xl mb-3">{getCategoryEmoji(category)}</div>
                    <h3 className="font-bold text-lg mb-2 group-hover:gradient-text transition-all">
                      {category}
                    </h3>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {postCount} {postCount === 1 ? 'article' : 'articles'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-2xl bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Prêt à devenir un expert ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Commence ton apprentissage dès maintenant, c'est 100% gratuit !
            </p>
            <Link href="/category/linux">
              <Button
                size="lg"
                variant="secondary"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Commencer maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function getCategoryEmoji(category: string): string {
  const emojis: { [key: string]: string } = {
    Linux: '🐧',
    DevOps: '🚀',
    Réseaux: '🌐',
    Glossaire: '📖',
  };
  return emojis[category] || '📚';
}
