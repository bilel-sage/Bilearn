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
      options: ['Application Programming Interface', 'Advanced Protocol Integration', 'Automated Process Input', 'Application Process Integration'],
      correctAnswer: 0,
      explanation: 'API signifie Application Programming Interface (Interface de Programmation d\'Applications). C\'est un intermédiaire qui permet à deux logiciels de communiquer.',
    },
    {
      question: 'Quel format de données est le plus couramment utilisé par les API REST ?',
      options: ['XML', 'CSV', 'JSON', 'YAML'],
      correctAnswer: 2,
      explanation: 'JSON (JavaScript Object Notation) est le format standard des API REST modernes. Il est léger, lisible et facile à parser.',
    },
    {
      question: 'Quelle méthode HTTP est utilisée pour récupérer des données depuis une API ?',
      options: ['POST', 'PUT', 'DELETE', 'GET'],
      correctAnswer: 3,
      explanation: 'La méthode GET est utilisée pour lire/récupérer des données. POST crée, PUT met à jour, DELETE supprime.',
    },
    {
      question: 'Quel code HTTP indique que la requête a réussi ?',
      options: ['404', '500', '200', '301'],
      correctAnswer: 2,
      explanation: 'Le code 200 (OK) signifie que la requête a été traitée avec succès. 404 = non trouvé, 500 = erreur serveur, 301 = redirection.',
    },
    {
      question: 'Quelle est la meilleure analogie pour expliquer une API ?',
      options: [
        'Un câble réseau',
        'Un serveur qui traite le menu entre le client et la cuisine',
        'Un disque dur',
        'Un navigateur web',
      ],
      correctAnswer: 1,
      explanation: 'L\'API agit comme un serveur au restaurant : tu passes ta commande (requête), il la transmet à la cuisine (serveur), et te rapporte le plat (réponse).',
    },
  ],

  'dns-cest-quoi': [
    {
      question: 'Que signifie DNS ?',
      options: ['Digital Network System', 'Domain Name System', 'Data Network Service', 'Dynamic Name Server'],
      correctAnswer: 1,
      explanation: 'DNS signifie Domain Name System (Système de Noms de Domaine). Il traduit les noms de domaine en adresses IP.',
    },
    {
      question: 'Quel est le rôle principal du DNS ?',
      options: [
        'Chiffrer les connexions',
        'Traduire les noms de domaine en adresses IP',
        'Stocker des fichiers web',
        'Filtrer le trafic réseau',
      ],
      correctAnswer: 1,
      explanation: 'Le DNS est l\'annuaire d\'Internet : il convertit les noms lisibles (google.com) en adresses IP (142.250.74.238) que les machines comprennent.',
    },
    {
      question: 'Quel type d\'enregistrement DNS pointe un domaine vers une adresse IPv4 ?',
      options: ['CNAME', 'MX', 'A', 'TXT'],
      correctAnswer: 2,
      explanation: 'L\'enregistrement A (Address) associe un nom de domaine à une adresse IPv4. AAAA est pour IPv6, CNAME pour les alias, MX pour les emails.',
    },
    {
      question: 'Quel serveur DNS est interrogé en premier lors d\'une résolution ?',
      options: ['Le serveur racine', 'Le serveur TLD', 'Le résolveur récursif (cache local)', 'Le serveur autoritaire'],
      correctAnswer: 2,
      explanation: 'Le résolveur récursif (souvent le DNS de ton FAI ou 8.8.8.8) est interrogé en premier. Il vérifie son cache avant de remonter la chaîne.',
    },
    {
      question: 'Que se passe-t-il si le serveur DNS ne répond pas ?',
      options: [
        'Le site se charge quand même',
        'Le navigateur affiche une erreur de type "DNS_PROBE_FINISHED_NXDOMAIN"',
        'Le site se charge plus lentement',
        'Le pare-feu bloque la requête',
      ],
      correctAnswer: 1,
      explanation: 'Sans résolution DNS, le navigateur ne peut pas trouver l\'adresse IP du serveur et affiche une erreur DNS. Le site est inaccessible.',
    },
  ],

  'firewall-cest-quoi': [
    {
      question: 'Quel est le rôle principal d\'un firewall ?',
      options: [
        'Accélérer la connexion internet',
        'Filtrer le trafic réseau entrant et sortant',
        'Stocker les mots de passe',
        'Compresser les données',
      ],
      correctAnswer: 1,
      explanation: 'Un firewall (pare-feu) filtre le trafic réseau selon des règles prédéfinies, bloquant les connexions non autorisées et protégeant le réseau.',
    },
    {
      question: 'Quelle est la différence entre un firewall matériel et logiciel ?',
      options: [
        'Il n\'y a aucune différence',
        'Le matériel est un appareil physique, le logiciel est un programme installé sur l\'OS',
        'Le logiciel est plus sécurisé',
        'Le matériel ne filtre que les emails',
      ],
      correctAnswer: 1,
      explanation: 'Un firewall matériel est un équipement dédié (ex: FortiGate). Un firewall logiciel est un programme (ex: iptables, Windows Defender Firewall).',
    },
    {
      question: 'Que signifie une règle firewall "DENY ALL" en entrée ?',
      options: [
        'Tout le trafic est autorisé',
        'Tout le trafic entrant est bloqué par défaut',
        'Seul le trafic HTTP est bloqué',
        'Le firewall est désactivé',
      ],
      correctAnswer: 1,
      explanation: 'Une règle "DENY ALL" en entrée bloque tout le trafic entrant par défaut. On ajoute ensuite des exceptions (ALLOW) pour les ports nécessaires.',
    },
    {
      question: 'Quel port est généralement ouvert pour le trafic HTTPS ?',
      options: ['Port 22', 'Port 80', 'Port 443', 'Port 3306'],
      correctAnswer: 2,
      explanation: 'Le port 443 est le port standard pour HTTPS. Port 80 = HTTP, port 22 = SSH, port 3306 = MySQL.',
    },
    {
      question: 'Quel outil Linux est couramment utilisé comme firewall ?',
      options: ['nginx', 'iptables / ufw', 'apache', 'systemctl'],
      correctAnswer: 1,
      explanation: 'iptables est le firewall classique de Linux, et UFW (Uncomplicated Firewall) est une interface simplifiée par-dessus iptables, populaire sur Ubuntu.',
    },
  ],

  'ssh-cest-quoi': [
    {
      question: 'Que signifie SSH ?',
      options: ['Secure Shell Host', 'Secure Shell', 'System Shell Handler', 'Safe Socket Hub'],
      correctAnswer: 1,
      explanation: 'SSH signifie Secure Shell. C\'est un protocole qui permet de se connecter à un serveur distant de manière chiffrée et sécurisée.',
    },
    {
      question: 'Quel port est utilisé par défaut par SSH ?',
      options: ['Port 21', 'Port 22', 'Port 80', 'Port 443'],
      correctAnswer: 1,
      explanation: 'SSH utilise le port 22 par défaut. Il est recommandé de le changer en production pour réduire les attaques automatisées.',
    },
    {
      question: 'Quelle méthode d\'authentification SSH est la plus sécurisée ?',
      options: ['Mot de passe', 'Clé publique/privée', 'Telnet', 'FTP'],
      correctAnswer: 1,
      explanation: 'L\'authentification par clé publique/privée est plus sécurisée car elle ne transmet jamais de mot de passe sur le réseau et résiste aux attaques brute-force.',
    },
    {
      question: 'Quelle commande génère une paire de clés SSH ?',
      options: ['ssh-key create', 'ssh-keygen', 'ssh-generate', 'ssh-new-key'],
      correctAnswer: 1,
      explanation: 'La commande "ssh-keygen" génère une paire de clés (publique + privée). La clé publique est copiée sur le serveur, la clé privée reste sur ta machine.',
    },
    {
      question: 'Qu\'est-ce qu\'un tunnel SSH ?',
      options: [
        'Un câble réseau physique',
        'Un canal chiffré qui redirige du trafic à travers une connexion SSH',
        'Un type de VPN',
        'Un protocole différent de SSH',
      ],
      correctAnswer: 1,
      explanation: 'Un tunnel SSH permet de rediriger du trafic réseau (ex: accéder à un service distant) à travers une connexion SSH chiffrée, sécurisant les données en transit.',
    },
  ],

  'vpn-cest-quoi': [
    {
      question: 'Que signifie VPN ?',
      options: ['Virtual Private Network', 'Very Protected Network', 'Virtual Protocol Node', 'Verified Private Node'],
      correctAnswer: 0,
      explanation: 'VPN signifie Virtual Private Network (Réseau Privé Virtuel). Il crée un tunnel chiffré entre ton appareil et un serveur distant.',
    },
    {
      question: 'Quel est le principal avantage d\'un VPN ?',
      options: [
        'Accélérer la connexion internet',
        'Chiffrer le trafic et masquer l\'adresse IP',
        'Bloquer les publicités',
        'Augmenter la bande passante',
      ],
      correctAnswer: 1,
      explanation: 'Un VPN chiffre tout le trafic entre ton appareil et le serveur VPN, et masque ton adresse IP réelle en la remplaçant par celle du serveur.',
    },
    {
      question: 'Quel protocole VPN est considéré comme le plus moderne et performant ?',
      options: ['PPTP', 'L2TP', 'OpenVPN', 'WireGuard'],
      correctAnswer: 3,
      explanation: 'WireGuard est le protocole VPN le plus récent, offrant d\'excellentes performances, une sécurité moderne et un code beaucoup plus simple qu\'OpenVPN.',
    },
    {
      question: 'Dans quel cas un VPN ne protège PAS ta vie privée ?',
      options: [
        'Quand tu te connectes en WiFi public',
        'Quand tu te connectes à ton compte Google (le site sait qui tu es)',
        'Quand tu visites un site HTTP',
        'Quand tu télécharges un fichier',
      ],
      correctAnswer: 1,
      explanation: 'Un VPN masque ton IP mais pas ton identité. Si tu te connectes à un service avec ton compte, le service sait qui tu es indépendamment du VPN.',
    },
    {
      question: 'Qu\'est-ce qu\'un "tunnel" VPN ?',
      options: [
        'Un câble physique sous-marin',
        'Une connexion chiffrée entre ton appareil et le serveur VPN',
        'Un type de protocole email',
        'Un logiciel antivirus',
      ],
      correctAnswer: 1,
      explanation: 'Le tunnel VPN est la connexion chiffrée qui encapsule tout ton trafic internet, le rendant illisible pour quiconque l\'intercepterait.',
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
