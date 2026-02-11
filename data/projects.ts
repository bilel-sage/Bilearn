export interface Project {
  title: string;
  description: string;
  difficulty: 'debutant' | 'intermediaire' | 'difficile';
  link: string;
}

export interface ProjectsData {
  [slug: string]: Project[];
}

export const projects: ProjectsData = {
  'docker-pour-debutants': [
    {
      title: 'Conteneuriser une app Node.js',
      description: 'Crée un Dockerfile pour une application Node.js simple avec Express, puis lance-la dans un conteneur Docker.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Stack LAMP avec Docker Compose',
      description: 'Déploie une stack complète (Linux, Apache, MySQL, PHP) avec Docker Compose et des volumes persistants.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Pipeline CI/CD avec Docker',
      description: 'Mets en place un pipeline CI/CD complet qui build, teste et déploie une application multi-conteneurs automatiquement.',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'commandes-linux-essentielles': [
    {
      title: 'Script de backup automatique',
      description: 'Écris un script Bash qui sauvegarde automatiquement un dossier avec la date du jour et supprime les backups de plus de 7 jours.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Monitoring système avec Bash',
      description: 'Crée un tableau de bord terminal qui affiche en temps réel l\'utilisation CPU, RAM, disque et les processus les plus gourmands.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Serveur web sécurisé from scratch',
      description: 'Configure un serveur Linux complet avec Nginx, pare-feu UFW, fail2ban, et certificat SSL Let\'s Encrypt.',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'cest-quoi-ansible': [
    {
      title: 'Configurer un serveur web avec Ansible',
      description: 'Écris un playbook Ansible qui installe et configure Nginx sur un serveur distant avec une page d\'accueil personnalisée.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Déploiement multi-serveurs',
      description: 'Crée un inventaire avec plusieurs groupes de serveurs et un playbook qui déploie une application différente sur chaque groupe.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Infrastructure complète avec rôles Ansible',
      description: 'Développe une collection de rôles Ansible pour provisionner une infrastructure complète : load balancer, app servers, base de données.',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'tcp-ip-explique': [
    {
      title: 'Analyseur de paquets simple',
      description: 'Utilise Wireshark ou tcpdump pour capturer et analyser le trafic réseau de ta machine. Identifie les différents protocoles.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Chat réseau en Python',
      description: 'Programme un chat client-serveur en Python avec des sockets TCP. Gère plusieurs clients simultanément avec le threading.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Simulateur de réseau virtuel',
      description: 'Crée un réseau virtuel complet avec GNS3 ou Mininet : routeurs, switches, VLAN, et règles de pare-feu entre sous-réseaux.',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'api-cest-quoi': [
    {
      title: 'Consommer une API publique',
      description: 'Utilise fetch ou axios pour récupérer des données depuis une API publique (comme OpenWeatherMap) et les afficher dans une page web.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Créer ta propre API REST',
      description: 'Construis une API REST simple avec Node.js et Express qui gère un CRUD (Create, Read, Update, Delete) sur une collection de données.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'API avec authentification JWT',
      description: 'Développe une API sécurisée avec authentification JWT, middleware de validation, et documentation Swagger automatique.',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'firewall-cest-quoi': [
    {
      title: 'Configurer UFW sur un serveur',
      description: 'Installe et configure UFW sur une machine Linux. Autorise uniquement SSH, HTTP et HTTPS, et bloque tout le reste.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Script de règles iptables',
      description: 'Écris un script Bash qui configure des règles iptables complètes : filtrage par IP, limitation de débit, et logging des tentatives bloquées.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Déployer pfSense en VM',
      description: 'Installe pfSense dans une machine virtuelle et configure un firewall complet avec NAT, VPN, et détection d\'intrusions (Snort/Suricata).',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'dns-cest-quoi': [
    {
      title: 'Interroger le DNS avec dig',
      description: 'Utilise les commandes nslookup et dig pour explorer les enregistrements DNS de différents sites web. Documente tes découvertes.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Configurer un domaine complet',
      description: 'Achète un nom de domaine et configure tous les enregistrements DNS (A, CNAME, MX, TXT) pour pointer vers ton serveur et activer les emails.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Monter ton propre serveur DNS',
      description: 'Installe et configure BIND9 ou Pi-hole comme serveur DNS local avec filtrage de publicités et résolution personnalisée.',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'ssh-cest-quoi': [
    {
      title: 'Première connexion SSH',
      description: 'Génère une paire de clés SSH, copie la clé publique sur un serveur distant, et connecte-toi sans mot de passe.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Fichier config SSH avancé',
      description: 'Configure ~/.ssh/config pour gérer plusieurs serveurs avec des alias, ports personnalisés et clés spécifiques par hôte.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Bastion SSH et tunnel sécurisé',
      description: 'Mets en place un serveur bastion SSH avec ProxyJump, port forwarding, et fail2ban pour sécuriser l\'accès à une infrastructure.',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'vpn-cest-quoi': [
    {
      title: 'Installer WireGuard sur Linux',
      description: 'Installe WireGuard sur une machine Linux, génère les clés, et configure un tunnel VPN basique entre deux machines.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'VPN site-to-site avec WireGuard',
      description: 'Configure un VPN WireGuard reliant deux réseaux distants avec routage automatique et persistance de connexion.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Serveur VPN complet avec gestion des clients',
      description: 'Déploie un serveur OpenVPN ou WireGuard avec interface web de gestion, certificats par client, et monitoring du trafic.',
      difficulty: 'difficile',
      link: '#',
    },
  ],

  'terraform-guide': [
    {
      title: 'Déployer une VM dans le cloud',
      description: 'Utilise Terraform pour provisionner une machine virtuelle sur AWS (EC2) ou GCP avec un fichier de configuration simple.',
      difficulty: 'debutant',
      link: '#',
    },
    {
      title: 'Infrastructure réseau complète',
      description: 'Crée un VPC avec sous-réseaux publics/privés, tables de routage, NAT Gateway et Security Groups avec Terraform.',
      difficulty: 'intermediaire',
      link: '#',
    },
    {
      title: 'Cluster Kubernetes avec Terraform',
      description: 'Déploie un cluster EKS/GKE complet avec Terraform, incluant auto-scaling, monitoring et gestion des secrets.',
      difficulty: 'difficile',
      link: '#',
    },
  ],
};
