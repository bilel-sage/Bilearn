import { ArrowLeft, Github, Youtube, Mail, Heart } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/Button';

export const metadata = {
  title: 'À propos | BiLearn',
  description: 'Découvrez BiLearn et son créateur',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" icon={<ArrowLeft className="w-5 h-5" />} className="mb-8">
            Retour
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-display mb-6">
            À propos de <span className="gradient-text">BiLearn</span>
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
            Rendre l'apprentissage de l'informatique accessible à tous
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2>👋 Bonjour !</h2>
          <p>
            Je suis <strong>[Votre Nom]</strong>, passionné d'informatique et formateur DevOps.
            J'ai créé BiLearn pour partager mes connaissances et aider d'autres personnes à 
            progresser dans le monde de l'informatique.
          </p>

          <h2>🎯 La mission de BiLearn</h2>
          <p>
            BiLearn est né d'une conviction simple : <strong>l'éducation technique devrait être 
            accessible à tous, gratuitement</strong>. Trop souvent, les ressources de qualité sont 
            enfouies derrière des paywalls ou noyées dans des contenus peu pédagogiques.
          </p>

          <p>Mon objectif avec ce site est de :</p>
          <ul>
            <li>Proposer des cours <strong>gratuits et de qualité</strong></li>
            <li>Créer des tutoriels <strong>pratiques et concrets</strong></li>
            <li>Accompagner les débutants comme les confirmés</li>
            <li>Partager mon expérience terrain en DevOps et administration système</li>
          </ul>

          <h2>📚 Ce que vous trouverez ici</h2>
          <p>Sur BiLearn, je partage du contenu sur :</p>
          <ul>
            <li><strong>Linux</strong> : Administration système, commandes, scripts</li>
            <li><strong>DevOps</strong> : Ansible, Docker, Kubernetes, CI/CD</li>
            <li><strong>Réseaux</strong> : TCP/IP, DNS, configuration</li>
            <li><strong>Sécurité</strong> : Bonnes pratiques, SSH, pare-feu</li>
          </ul>

          <h2>🎥 YouTube & Contenu Vidéo</h2>
          <p>
            En plus des articles écrits, je crée des <strong>tutoriels vidéo sur YouTube</strong> 
            pour ceux qui préfèrent apprendre en vidéo. Chaque article est généralement accompagné 
            d'une vidéo pour faciliter la compréhension.
          </p>

          <h2>💡 Philosophie</h2>
          <p>
            Ce site est <strong>100% gratuit</strong>, sans publicité invasive, et respecte votre 
            vie privée (pas de cookies de tracking). Je crois en un web plus sain et en un partage 
            de connaissances sans barrières.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl p-8 border border-light-border dark:border-dark-border">
          <h2 className="text-2xl font-bold font-display mb-6 text-center">
            Restons en contact 📬
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/votre-compte"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" icon={<Github className="w-5 h-5" />}>
                GitHub
              </Button>
            </a>
            <a
              href="https://youtube.com/@votre-chaine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" icon={<Youtube className="w-5 h-5" />}>
                YouTube
              </Button>
            </a>
            <a href="mailto:votre@email.com">
              <Button variant="outline" icon={<Mail className="w-5 h-5" />}>
                Email
              </Button>
            </a>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
            Soutenir le projet <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </h3>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
            Si mes cours vous aident, vous pouvez me soutenir en :
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-4 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border">
              ⭐ Star sur GitHub
            </span>
            <span className="px-4 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border">
              👍 Like sur YouTube
            </span>
            <span className="px-4 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border">
              ☕ M'offrir un café
            </span>
            <span className="px-4 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border">
              📢 Partager le site
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
