export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizData {
  [slug: string]: QuizQuestion[];
}

export const quizzes: QuizData = {
  'docker-pour-debutants': [
    {
      question: 'Quelle commande permet de lister les conteneurs Docker en cours d\'exécution ?',
      options: ['docker list', 'docker ps', 'docker show', 'docker containers'],
      correctAnswer: 1,
      explanation: 'La commande "docker ps" affiche tous les conteneurs en cours d\'exécution. Ajoutez -a pour voir aussi les conteneurs arrêtés.',
    },
    {
      question: 'Quel fichier est utilisé pour définir une image Docker personnalisée ?',
      options: ['docker-compose.yml', 'Dockerfile', 'docker.config', 'image.yaml'],
      correctAnswer: 1,
      explanation: 'Le Dockerfile contient les instructions pour construire une image Docker personnalisée, couche par couche.',
    },
    {
      question: 'Quelle est la différence principale entre une image et un conteneur Docker ?',
      options: [
        'Il n\'y a pas de différence',
        'Une image est un modèle en lecture seule, un conteneur est une instance en exécution',
        'Un conteneur est plus léger qu\'une image',
        'Une image ne peut pas être partagée',
      ],
      correctAnswer: 1,
      explanation: 'Une image Docker est un modèle immuable (lecture seule) qui sert de base pour créer des conteneurs, qui sont des instances en cours d\'exécution.',
    },
    {
      question: 'Quelle commande permet de construire une image à partir d\'un Dockerfile ?',
      options: ['docker create', 'docker build', 'docker make', 'docker compile'],
      correctAnswer: 1,
      explanation: 'La commande "docker build" lit le Dockerfile et construit l\'image étape par étape. On utilise souvent -t pour lui donner un nom.',
    },
    {
      question: 'Quel est le rôle de Docker Compose ?',
      options: [
        'Compiler du code dans un conteneur',
        'Gérer des applications multi-conteneurs',
        'Surveiller les performances des conteneurs',
        'Créer des images Docker automatiquement',
      ],
      correctAnswer: 1,
      explanation: 'Docker Compose permet de définir et gérer des applications multi-conteneurs via un fichier docker-compose.yml, simplifiant l\'orchestration.',
    },
  ],

  'commandes-linux-essentielles': [
    {
      question: 'Quelle commande permet de changer de répertoire dans le terminal Linux ?',
      options: ['mv', 'cd', 'cp', 'dir'],
      correctAnswer: 1,
      explanation: 'La commande "cd" (change directory) permet de naviguer entre les répertoires du système de fichiers.',
    },
    {
      question: 'Comment afficher le contenu d\'un fichier sans l\'ouvrir dans un éditeur ?',
      options: ['open fichier', 'cat fichier', 'show fichier', 'read fichier'],
      correctAnswer: 1,
      explanation: 'La commande "cat" affiche le contenu d\'un fichier directement dans le terminal. Pour les gros fichiers, préférez "less" ou "more".',
    },
    {
      question: 'Quelle commande permet de rechercher des fichiers dans le système ?',
      options: ['search', 'find', 'locate', 'find et locate sont tous deux corrects'],
      correctAnswer: 3,
      explanation: 'Les commandes "find" et "locate" permettent toutes deux de rechercher des fichiers. "find" cherche en temps réel, "locate" utilise une base de données indexée.',
    },
    {
      question: 'Que fait la commande "chmod 755 script.sh" ?',
      options: [
        'Supprime le fichier',
        'Donne les droits rwx au propriétaire et rx aux autres',
        'Rend le fichier invisible',
        'Change le propriétaire du fichier',
      ],
      correctAnswer: 1,
      explanation: '755 signifie : propriétaire = rwx (7), groupe = r-x (5), autres = r-x (5). Le fichier est lisible et exécutable par tous, modifiable uniquement par le propriétaire.',
    },
    {
      question: 'Quelle commande permet de voir les processus en cours d\'exécution ?',
      options: ['top', 'ps', 'proc', 'top et ps sont tous deux corrects'],
      correctAnswer: 3,
      explanation: '"top" affiche les processus en temps réel (interactif) et "ps" affiche un instantané des processus. Les deux sont des outils essentiels d\'administration.',
    },
  ],

  'cest-quoi-ansible': [
    {
      question: 'Quel langage est utilisé pour écrire les playbooks Ansible ?',
      options: ['JSON', 'XML', 'YAML', 'TOML'],
      correctAnswer: 2,
      explanation: 'Les playbooks Ansible sont écrits en YAML (Yet Another Markup Language), un format lisible par l\'humain, facile à comprendre et à maintenir.',
    },
    {
      question: 'Quel est l\'avantage principal d\'Ansible par rapport à d\'autres outils de configuration ?',
      options: [
        'Il est plus rapide',
        'Il est agentless (sans agent)',
        'Il supporte plus de langages',
        'Il est uniquement pour le cloud',
      ],
      correctAnswer: 1,
      explanation: 'Ansible est agentless : il n\'a pas besoin d\'installer de logiciel sur les machines cibles. Il utilise SSH pour se connecter et exécuter les tâches.',
    },
    {
      question: 'Comment s\'appelle le fichier qui liste les machines gérées par Ansible ?',
      options: ['hosts.yml', 'inventory', 'machines.conf', 'targets.yaml'],
      correctAnswer: 1,
      explanation: 'L\'inventaire (inventory) est le fichier qui liste toutes les machines cibles, organisées par groupes. Par défaut, il se trouve dans /etc/ansible/hosts.',
    },
    {
      question: 'Qu\'est-ce qu\'un "rôle" dans Ansible ?',
      options: [
        'Un utilisateur avec des permissions spéciales',
        'Un ensemble organisé de tâches, variables et fichiers réutilisables',
        'Un type de connexion SSH',
        'Un module de monitoring',
      ],
      correctAnswer: 1,
      explanation: 'Un rôle Ansible est une structure organisée qui regroupe des tâches, handlers, variables, templates et fichiers pour une fonction spécifique, favorisant la réutilisabilité.',
    },
    {
      question: 'Quelle propriété garantit qu\'exécuter un playbook plusieurs fois produit toujours le même résultat ?',
      options: ['Réversibilité', 'Idempotence', 'Persistance', 'Convergence'],
      correctAnswer: 1,
      explanation: 'L\'idempotence signifie qu\'appliquer la même opération plusieurs fois produit le même résultat. Ansible ne modifie que ce qui doit l\'être.',
    },
  ],

  'tcp-ip-explique': [
    {
      question: 'Combien de couches comporte le modèle TCP/IP ?',
      options: ['3 couches', '4 couches', '5 couches', '7 couches'],
      correctAnswer: 1,
      explanation: 'Le modèle TCP/IP comporte 4 couches : Application, Transport, Internet et Accès réseau. Le modèle OSI, lui, en comporte 7.',
    },
    {
      question: 'Quel protocole de la couche Transport garantit la livraison fiable des données ?',
      options: ['UDP', 'TCP', 'IP', 'ICMP'],
      correctAnswer: 1,
      explanation: 'TCP (Transmission Control Protocol) assure une livraison fiable grâce à l\'établissement de connexion (handshake), l\'acquittement et la retransmission.',
    },
    {
      question: 'Quelle est la fonction principale du protocole IP ?',
      options: [
        'Chiffrer les données',
        'Acheminer les paquets vers leur destination',
        'Compresser les fichiers',
        'Gérer les noms de domaine',
      ],
      correctAnswer: 1,
      explanation: 'Le protocole IP (Internet Protocol) est responsable de l\'adressage et du routage des paquets à travers le réseau, de la source à la destination.',
    },
    {
      question: 'Qu\'est-ce que le "three-way handshake" en TCP ?',
      options: [
        'Un mécanisme de chiffrement',
        'Le processus d\'établissement de connexion en 3 étapes (SYN, SYN-ACK, ACK)',
        'Une méthode de compression',
        'Un protocole de routage',
      ],
      correctAnswer: 1,
      explanation: 'Le three-way handshake est le processus en 3 étapes (SYN → SYN-ACK → ACK) qui permet d\'établir une connexion TCP fiable entre deux hôtes.',
    },
    {
      question: 'Quel protocole est utilisé pour résoudre les noms de domaine en adresses IP ?',
      options: ['HTTP', 'FTP', 'DNS', 'SMTP'],
      correctAnswer: 2,
      explanation: 'Le DNS (Domain Name System) traduit les noms de domaine lisibles (ex: google.com) en adresses IP numériques utilisées par les machines.',
    },
  ],

  'terraform-guide': [
    {
      question: 'Quel langage de configuration est utilisé par Terraform ?',
      options: ['YAML', 'JSON', 'HCL (HashiCorp Configuration Language)', 'XML'],
      correctAnswer: 2,
      explanation: 'Terraform utilise HCL (HashiCorp Configuration Language), un langage déclaratif conçu pour être lisible et expressif pour définir l\'infrastructure.',
    },
    {
      question: 'Quelle commande Terraform permet de prévisualiser les changements avant de les appliquer ?',
      options: ['terraform apply', 'terraform plan', 'terraform preview', 'terraform check'],
      correctAnswer: 1,
      explanation: '"terraform plan" génère un plan d\'exécution qui montre les ressources à créer, modifier ou supprimer, sans rien appliquer.',
    },
    {
      question: 'Qu\'est-ce que le "state" (état) dans Terraform ?',
      options: [
        'Le code source du projet',
        'Un fichier qui mappe les ressources réelles à la configuration',
        'Un log des erreurs',
        'La documentation du projet',
      ],
      correctAnswer: 1,
      explanation: 'Le state Terraform est un fichier (terraform.tfstate) qui garde la correspondance entre les ressources définies dans le code et les ressources réelles dans le cloud.',
    },
    {
      question: 'Quel concept Terraform permet de réutiliser des blocs de configuration ?',
      options: ['Variables', 'Modules', 'Providers', 'Backends'],
      correctAnswer: 1,
      explanation: 'Les modules Terraform sont des conteneurs réutilisables de configuration. Ils permettent d\'organiser et de partager des blocs d\'infrastructure.',
    },
    {
      question: 'Quelle commande permet d\'appliquer les changements d\'infrastructure ?',
      options: ['terraform deploy', 'terraform apply', 'terraform push', 'terraform run'],
      correctAnswer: 1,
      explanation: '"terraform apply" exécute les changements nécessaires pour atteindre l\'état souhaité défini dans les fichiers de configuration.',
    },
  ],
};
