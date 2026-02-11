import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WarningBox from '@/components/WarningBox';
import ArticleContent from '@/components/ArticleContent';
import Quiz from '@/components/Quiz';
import PracticalProjects from '@/components/PracticalProjects';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

// Components available in MDX
const components = {
  YouTubeEmbed,
  InfoBox,
  WarningBox,
  pre: CodeBlock,
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.metadata.title} | BiLearn`,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
      tags: post.metadata.tags,
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" icon={<ArrowLeft className="w-5 h-5" />} className="mb-8">
            Retour
          </Button>
        </Link>

        {/* Article Header - centered, same max-width as content */}
        <header className="mb-12 max-w-[1100px]">
          {/* Category Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary border border-light-primary/20 dark:border-dark-primary/20">
              {post.metadata.category}
            </span>
            {post.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black font-display mb-6 leading-tight">
            {post.metadata.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8">
            {post.metadata.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-light-text-secondary dark:text-dark-text-secondary">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={post.metadata.date}>
                {new Date(post.metadata.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.metadata.readingTime}</span>
            </div>
          </div>
        </header>

        {/* YouTube Video if available */}
        {post.metadata.youtubeId && (
          <div className="mb-12">
            <YouTubeEmbed
              videoId={post.metadata.youtubeId}
              title={post.metadata.title}
            />
          </div>
        )}

        {/* Two-column layout: TOC sidebar + Article content */}
        <article>
          <ArticleContent>
            <MDXRemote source={post.content} components={components} options={options} />
          </ArticleContent>
        </article>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-light-border dark:border-dark-border">
          <p className="text-center text-light-text-secondary dark:text-dark-text-secondary">
            Cet article t'a aidé ? Partage-le avec tes amis ! 🚀
          </p>
        </div>

        {/* Quiz Section */}
        <Quiz slug={params.slug} />

        {/* Practical Projects Section */}
        <PracticalProjects slug={params.slug} />
      </div>
    </div>
  );
}
