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

  'api-cest-quoi': [
    {
      question: 'Que signifie API ?',
      options: ['Application Programming Interface', 'Advanced Protocol Integration', 'Automated Process Interface', 'Application Process Integration'],
      correctAnswer: 0,
      explanation: 'API signifie Application Programming Interface (Interface de Programmation d\'Applications). C\'est un intermédiaire qui permet à deux logiciels de communiquer.',
    },
    {
      question: 'Quelle méthode HTTP est utilisée pour récupérer des données ?',
      options: ['POST', 'PUT', 'GET', 'DELETE'],
      correctAnswer: 2,
      explanation: 'La méthode GET est utilisée pour lire/récupérer des données depuis un serveur sans les modifier.',
    },
    {
      question: 'Quel format de données est le plus couramment utilisé par les API REST ?',
      options: ['XML', 'CSV', 'JSON', 'YAML'],
      correctAnswer: 2,
      explanation: 'JSON (JavaScript Object Notation) est le format standard des API REST modernes car il est léger et facile à lire.',
    },
    {
      question: 'Quelle méthode HTTP est utilisée pour créer une nouvelle ressource ?',
      options: ['GET', 'POST', 'PATCH', 'OPTIONS'],
      correctAnswer: 1,
      explanation: 'La méthode POST est utilisée pour envoyer des données au serveur et créer une nouvelle ressource.',
    },
    {
      question: 'Quel type d\'API permet la communication en temps réel ?',
      options: ['REST', 'SOAP', 'WebSocket', 'GraphQL'],
      correctAnswer: 2,
      explanation: 'Les API WebSocket permettent une communication bidirectionnelle en temps réel, idéale pour les chats et les jeux en ligne.',
    },
  ],

  'firewall-cest-quoi': [
    {
      question: 'Quel est le rôle principal d\'un firewall ?',
      options: ['Accélérer le réseau', 'Filtrer le trafic réseau', 'Compresser les données', 'Stocker les fichiers'],
      correctAnswer: 1,
      explanation: 'Un firewall filtre le trafic réseau entrant et sortant selon des règles définies pour protéger le réseau.',
    },
    {
      question: 'Sur quels critères un firewall filtre-t-il le trafic ? ',
      options: ['Uniquement l\'adresse IP', 'Uniquement le port', 'IP, port, protocole', 'Uniquement le contenu'],
      correctAnswer: 2,
      explanation: 'Un firewall examine l\'adresse IP source/destination, le port et le protocole pour décider de laisser passer ou bloquer un paquet.',
    },
    {
      question: 'Quel outil simplifie la gestion du firewall iptables sur Ubuntu ?',
      options: ['firewalld', 'UFW', 'nftables', 'pfSense'],
      correctAnswer: 1,
      explanation: 'UFW (Uncomplicated Firewall) est une interface simplifiée pour iptables, très populaire sur Ubuntu.',
    },
    {
      question: 'Quelle est la bonne politique par défaut pour un firewall ?',
      options: ['Tout autoriser', 'Tout bloquer puis autoriser le nécessaire', 'Autoriser le trafic entrant uniquement', 'Désactiver le firewall'],
      correctAnswer: 1,
      explanation: 'La règle d\'or est de tout bloquer par défaut (deny all) puis d\'autoriser uniquement le trafic nécessaire.',
    },
    {
      question: 'Qu\'est-ce qu\'un WAF ?',
      options: ['Un firewall sans fil', 'Un firewall applicatif web', 'Un protocole réseau', 'Un outil de monitoring'],
      correctAnswer: 1,
      explanation: 'WAF signifie Web Application Firewall. Il analyse le trafic au niveau applicatif pour détecter des attaques comme les injections SQL.',
    },
  ],

  'dns-cest-quoi': [
    {
      question: 'Que signifie DNS ?',
      options: ['Dynamic Network Service', 'Domain Name System', 'Data Network Security', 'Digital Name Server'],
      correctAnswer: 1,
      explanation: 'DNS signifie Domain Name System (Système de Noms de Domaine). Il traduit les noms de domaine en adresses IP.',
    },
    {
      question: 'Quel type d\'enregistrement DNS associe un domaine à une adresse IPv4 ?',
      options: ['CNAME', 'MX', 'A', 'TXT'],
      correctAnswer: 2,
      explanation: 'L\'enregistrement de type A (Address) associe un nom de domaine à une adresse IPv4.',
    },
    {
      question: 'Quel serveur DNS est fourni par Cloudflare ?',
      options: ['8.8.8.8', '9.9.9.9', '1.1.1.1', '208.67.222.222'],
      correctAnswer: 2,
      explanation: '1.1.1.1 est le serveur DNS de Cloudflare, connu pour sa rapidité et le respect de la vie privée.',
    },
    {
      question: 'Combien de temps peut prendre la propagation DNS après un changement ?',
      options: ['Instantanée', 'Jusqu\'à 1 heure', 'Jusqu\'à 48 heures', 'Jusqu\'à 1 semaine'],
      correctAnswer: 2,
      explanation: 'La propagation DNS peut prendre jusqu\'à 48 heures car les caches DNS à travers le monde doivent se mettre à jour.',
    },
    {
      question: 'Quel enregistrement DNS est utilisé pour les serveurs de messagerie ?',
      options: ['A', 'CNAME', 'MX', 'NS'],
      correctAnswer: 2,
      explanation: 'L\'enregistrement MX (Mail eXchange) indique quel serveur gère les emails pour un domaine donné.',
    },
  ],

  'ssh-cest-quoi': [
    {
      question: 'Que signifie SSH ?',
      options: ['Secure Socket Host', 'Secure Shell', 'System Shell Handler', 'Safe Server Host'],
      correctAnswer: 1,
      explanation: 'SSH signifie Secure Shell. C\'est un protocole de connexion distante chiffrée.',
    },
    {
      question: 'Quel protocole SSH a-t-il remplacé ?',
      options: ['FTP', 'HTTP', 'Telnet', 'SMTP'],
      correctAnswer: 2,
      explanation: 'SSH a remplacé Telnet car celui-ci transmettait tout en clair (mots de passe inclus), ce qui était un risque de sécurité majeur.',
    },
    {
      question: 'Quel est le port par défaut de SSH ?',
      options: ['21', '22', '80', '443'],
      correctAnswer: 1,
      explanation: 'Le port par défaut de SSH est le port 22. Il est recommandé de le changer pour un port personnalisé en production.',
    },
    {
      question: 'Quelle méthode d\'authentification SSH est la plus sécurisée ?',
      options: ['Mot de passe', 'Clé publique/privée', 'Telnet', 'Connexion anonyme'],
      correctAnswer: 1,
      explanation: 'L\'authentification par clé publique/privée est plus sécurisée car elle ne transmet pas de mot de passe et résiste au brute-force.',
    },
    {
      question: 'Quelle commande permet de copier un fichier via SSH ?',
      options: ['ssh-copy', 'scp', 'sftp-send', 'ssh-transfer'],
      correctAnswer: 1,
      explanation: 'SCP (Secure Copy Protocol) permet de transférer des fichiers de manière sécurisée entre deux machines via SSH.',
    },
  ],

  'vpn-cest-quoi': [
    {
      question: 'Que signifie VPN ?',
      options: ['Virtual Private Network', 'Verified Protected Network', 'Virtual Protocol Node', 'Visual Private Node'],
      correctAnswer: 0,
      explanation: 'VPN signifie Virtual Private Network (Réseau Privé Virtuel). Il crée un tunnel chiffré pour ton trafic Internet.',
    },
    {
      question: 'Quel protocole VPN moderne est recommandé pour ses performances ?',
      options: ['PPTP', 'L2TP', 'WireGuard', 'SSTP'],
      correctAnswer: 2,
      explanation: 'WireGuard est le protocole VPN le plus moderne, offrant d\'excellentes performances et une sécurité de pointe avec un code minimal.',
    },
    {
      question: 'Que peut voir ton FAI quand tu utilises un VPN ?',
      options: ['Tout ton trafic', 'Uniquement que tu es connecté à un VPN', 'Rien du tout', 'Tes mots de passe'],
      correctAnswer: 1,
      explanation: 'Avec un VPN, ton FAI peut voir que tu es connecté à un serveur VPN, mais pas le contenu de ton trafic ni les sites que tu visites.',
    },
    {
      question: 'Dans quel cas un VPN est-il particulièrement recommandé ?',
      options: ['Sur ton réseau domestique', 'Sur un WiFi public', 'En mode avion', 'Sur un réseau Ethernet'],
      correctAnswer: 1,
      explanation: 'Sur un WiFi public (café, aéroport), les données peuvent être interceptées. Le VPN chiffre tout le trafic pour te protéger.',
    },
    {
      question: 'Qu\'est-ce qu\'un VPN NE fait PAS ?',
      options: ['Chiffrer le trafic', 'Masquer ton IP', 'Protéger contre les malwares', 'Contourner les restrictions géo'],
      correctAnswer: 2,
      explanation: 'Un VPN ne protège pas contre les malwares ou les virus. Il chiffre le trafic et masque l\'IP, mais ne remplace pas un antivirus.',
    },
  ],

  'New': [
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
};
