import type { Metadata } from 'next';
import { JetBrains_Mono, Outfit } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BiLearn - Apprends l\'informatique comme un pro',
  description: 'Cours gratuits, tutoriels vidéo et guides pratiques sur Linux, DevOps, Réseaux et Sécurité. Tout ce dont tu as besoin pour devenir un expert.',
  keywords: ['Linux', 'DevOps', 'Ansible', 'Docker', 'Kubernetes', 'Réseaux', 'Sécurité', 'Tutoriels', 'Cours'],
  authors: [{ name: 'BiLearn' }],
  openGraph: {
    title: 'BiLearn - Apprends l\'informatique comme un pro',
    description: 'Cours gratuits et tutoriels sur Linux, DevOps, Réseaux et Sécurité',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BiLearn - Apprends l\'informatique comme un pro',
    description: 'Cours gratuits et tutoriels sur Linux, DevOps, Réseaux et Sécurité',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
