import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { ArrowLeft, Star, Rocket, Flame } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';

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

export async function generateStaticParams() {
  const params: { slug: string; index: string }[] = [];
  for (const slug of Object.keys(projects)) {
    projects[slug].forEach((_, index) => {
      params.push({ slug, index: String(index) });
    });
  }
  return params;
}

export async function generateMetadata({ params }: { params: { slug: string; index: string } }) {
  const projectList = projects[params.slug];
  if (!projectList) return {};
  const idx = parseInt(params.index, 10);
  const project = projectList[idx];
  if (!project) return {};

  return {
    title: `${project.title} | Projet Pratique | BiLearn`,
    description: project.description,
  };
}

function renderMarkdown(content: string) {
  // Split content into segments: text and code blocks
  const segments: { type: 'text' | 'code'; content: string; lang?: string }[] = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    segments.push({ type: 'code', content: match[2], lang: match[1] || undefined });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    segments.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return segments.map((segment, i) => {
    if (segment.type === 'code') {
      return (
        <div key={i} className="relative my-4">
          {segment.lang && (
            <span className="absolute top-3 right-3 text-xs font-mono text-[var(--text-secondary)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
              {segment.lang}
            </span>
          )}
          <pre className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 overflow-x-auto">
            <code className="text-sm font-mono leading-relaxed text-[var(--text)]">
              {segment.content}
            </code>
          </pre>
        </div>
      );
    }

    // Render text with inline formatting
    const lines = segment.content.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join('\n').trim();
        if (text) {
          elements.push(
            <p key={`p-${elements.length}`} className="mb-4 text-[1.0625rem] leading-relaxed">
              {renderInlineMarkdown(text)}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed === '') {
        flushParagraph();
      } else if (trimmed.startsWith('- **') || trimmed.startsWith('- `')) {
        flushParagraph();
        elements.push(
          <li key={`li-${elements.length}`} className="ml-6 mb-2 list-disc text-[1.0625rem]">
            {renderInlineMarkdown(trimmed.slice(2))}
          </li>
        );
      } else if (trimmed.startsWith('- ')) {
        flushParagraph();
        elements.push(
          <li key={`li-${elements.length}`} className="ml-6 mb-2 list-disc text-[1.0625rem]">
            {renderInlineMarkdown(trimmed.slice(2))}
          </li>
        );
      } else {
        currentParagraph.push(line);
      }
    }
    flushParagraph();

    return <div key={i}>{elements}</div>;
  });
}

function renderInlineMarkdown(text: string) {
  // Handle bold (**text**), inline code (`code`), and links
  const parts: (string | JSX.Element)[] = [];
  const inlineRegex = /(\*\*(.+?)\*\*)|(`(.+?)`)/g;
  let lastIdx = 0;
  let inlineMatch;

  while ((inlineMatch = inlineRegex.exec(text)) !== null) {
    if (inlineMatch.index > lastIdx) {
      parts.push(text.slice(lastIdx, inlineMatch.index));
    }
    if (inlineMatch[1]) {
      // Bold
      parts.push(
        <strong key={`b-${inlineMatch.index}`} className="font-semibold">
          {inlineMatch[2]}
        </strong>
      );
    } else if (inlineMatch[3]) {
      // Inline code
      parts.push(
        <code
          key={`c-${inlineMatch.index}`}
          className="bg-[var(--surface)] text-[var(--primary)] px-1.5 py-0.5 rounded text-[0.9em] font-mono font-medium border border-[var(--border)]"
        >
          {inlineMatch[4]}
        </code>
      );
    }
    lastIdx = inlineMatch.index + inlineMatch[0].length;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }

  return <>{parts}</>;
}

export default function ProjectPage({ params }: { params: { slug: string; index: string } }) {
  const projectList = projects[params.slug];
  if (!projectList) notFound();

  const idx = parseInt(params.index, 10);
  const project = projectList[idx];
  if (!project) notFound();

  const config = difficultyConfig[project.difficulty];
  const Icon = config.icon;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-[850px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href={`/posts/${params.slug}`}>
          <Button variant="ghost" icon={<ArrowLeft className="w-5 h-5" />} className="mb-8">
            Retour à l&apos;article
          </Button>
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.badgeClass}`}>
              <Icon className="w-3.5 h-3.5" />
              {config.label}
            </span>
            <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Projet pratique
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black font-display mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Steps */}
        <div className="space-y-10">
          {project.steps.map((step, stepIndex) => (
            <section
              key={stepIndex}
              className="relative pl-10 border-l-2 border-light-border dark:border-dark-border"
            >
              {/* Step number */}
              <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-light-primary dark:bg-dark-primary flex items-center justify-center text-white dark:text-black font-bold text-sm">
                {stepIndex + 1}
              </div>

              <div className="pt-1">
                <h2 className="text-xl font-bold font-display mb-4">
                  {step.title}
                </h2>

                <div className="prose max-w-none">
                  {renderMarkdown(step.content)}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Bottom navigation */}
        <div className="mt-16 pt-8 border-t border-light-border dark:border-dark-border">
          <Link href={`/posts/${params.slug}`}>
            <Button variant="ghost" icon={<ArrowLeft className="w-5 h-5" />}>
              Retour à l&apos;article
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
