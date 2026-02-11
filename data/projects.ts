export interface ProjectStep {
  title: string;
  content: string;
}

export interface Project {
  title: string;
  description: string;
  difficulty: 'debutant' | 'intermediaire' | 'difficile';
  link: string;
  steps: ProjectStep[];
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
      steps: [
        {
          title: 'Créer l\'application Express',
          content: `Commence par initialiser un projet Node.js et installer Express :

\`\`\`bash
mkdir mon-app-docker && cd mon-app-docker
npm init -y
npm install express
\`\`\`

Crée ensuite un fichier \`app.js\` :

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello depuis Docker !' });
});

app.listen(PORT, () => {
  console.log(\`Serveur lancé sur le port \${PORT}\`);
});
\`\`\``,
        },
        {
          title: 'Écrire le Dockerfile',
          content: `Crée un fichier \`Dockerfile\` à la racine du projet :

\`\`\`dockerfile
# Image de base
FROM node:18-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "app.js"]
\`\`\`

Crée aussi un fichier \`.dockerignore\` pour exclure les fichiers inutiles :

\`\`\`
node_modules
npm-debug.log
\`\`\``,
        },
        {
          title: 'Builder et lancer le conteneur',
          content: `Construis l'image Docker puis lance un conteneur :

\`\`\`bash
# Construire l'image
docker build -t mon-app-node .

# Lancer le conteneur
docker run -d -p 3000:3000 --name mon-app mon-app-node
\`\`\`

Vérifie que tout fonctionne en ouvrant \`http://localhost:3000\` dans ton navigateur. Tu devrais voir le message JSON.`,
        },
        {
          title: 'Gérer le conteneur',
          content: `Apprends les commandes essentielles pour gérer ton conteneur :

\`\`\`bash
# Voir les conteneurs actifs
docker ps

# Voir les logs
docker logs mon-app

# Arrêter le conteneur
docker stop mon-app

# Supprimer le conteneur
docker rm mon-app

# Supprimer l'image
docker rmi mon-app-node
\`\`\`

Bravo ! Tu as conteneurisé ta première application Node.js. Tu peux maintenant la déployer n'importe où grâce à Docker.`,
        },
      ],
    },
    {
      title: 'Stack LAMP avec Docker Compose',
      description: 'Déploie une stack complète (Linux, Apache, MySQL, PHP) avec Docker Compose et des volumes persistants.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Structurer le projet',
          content: `Crée l'arborescence suivante pour organiser ta stack LAMP :

\`\`\`bash
mkdir lamp-docker && cd lamp-docker
mkdir -p www mysql
\`\`\`

Structure finale :

\`\`\`
lamp-docker/
├── docker-compose.yml
├── www/
│   └── index.php
└── mysql/
\`\`\`

Le dossier \`www\` contiendra ton code PHP, et \`mysql\` stockera les données persistantes de la base.`,
        },
        {
          title: 'Écrire le docker-compose.yml',
          content: `Crée le fichier \`docker-compose.yml\` qui définit les 3 services :

\`\`\`yaml
version: '3.8'

services:
  apache:
    image: php:8.2-apache
    ports:
      - "8080:80"
    volumes:
      - ./www:/var/www/html
    depends_on:
      - mysql
    restart: unless-stopped

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: myapp
      MYSQL_USER: user
      MYSQL_PASSWORD: userpass
    volumes:
      - ./mysql:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: unless-stopped

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    ports:
      - "8081:80"
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
    depends_on:
      - mysql
    restart: unless-stopped
\`\`\``,
        },
        {
          title: 'Créer la page PHP de test',
          content: `Crée le fichier \`www/index.php\` pour vérifier que tout fonctionne :

\`\`\`php
<?php
$host = 'mysql';
$db   = 'myapp';
$user = 'user';
$pass = 'userpass';

echo "<h1>Stack LAMP avec Docker</h1>";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    echo "<p style='color: green;'>Connexion MySQL réussie !</p>";
} catch (PDOException $e) {
    echo "<p style='color: red;'>Erreur : " . $e->getMessage() . "</p>";
}

phpinfo();
?>
\`\`\``,
        },
        {
          title: 'Lancer et tester la stack',
          content: `Lance l'ensemble de la stack avec Docker Compose :

\`\`\`bash
# Lancer tous les services
docker-compose up -d

# Vérifier que tout tourne
docker-compose ps

# Voir les logs
docker-compose logs -f
\`\`\`

Teste les différents services :
- **Apache + PHP** : \`http://localhost:8080\`
- **phpMyAdmin** : \`http://localhost:8081\`

Pour arrêter la stack :

\`\`\`bash
docker-compose down
\`\`\`

Les données MySQL sont persistantes grâce au volume \`./mysql\`, elles survivent aux redémarrages.`,
        },
      ],
    },
    {
      title: 'Pipeline CI/CD avec Docker',
      description: 'Mets en place un pipeline CI/CD complet qui build, teste et déploie une application multi-conteneurs automatiquement.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Préparer le projet avec tests',
          content: `Crée un projet Node.js avec des tests automatisés :

\`\`\`bash
mkdir cicd-docker && cd cicd-docker
npm init -y
npm install express
npm install --save-dev jest supertest
\`\`\`

Crée \`app.js\` :

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.json({ status: 'ok' }));
app.get('/health', (req, res) => res.json({ healthy: true }));

module.exports = app;
\`\`\`

Crée \`app.test.js\` :

\`\`\`javascript
const request = require('supertest');
const app = require('./app');

test('GET / retourne status ok', async () => {
  const res = await request(app).get('/');
  expect(res.body.status).toBe('ok');
});

test('GET /health retourne healthy', async () => {
  const res = await request(app).get('/health');
  expect(res.body.healthy).toBe(true);
});
\`\`\``,
        },
        {
          title: 'Dockerfile multi-stage',
          content: `Crée un \`Dockerfile\` multi-stage pour optimiser l'image :

\`\`\`dockerfile
# Stage 1 : Tests
FROM node:18-alpine AS test
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm test

# Stage 2 : Production
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

Crée \`server.js\` :

\`\`\`javascript
const app = require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`Serveur sur le port \${PORT}\`));
\`\`\`

Ainsi, si les tests échouent, l'image ne sera pas construite.`,
        },
        {
          title: 'Configurer GitHub Actions',
          content: `Crée le fichier \`.github/workflows/ci-cd.yml\` :

\`\`\`yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build et test
        run: docker build --target test -t app-test .

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Login Docker Hub
        run: echo "\${{ secrets.DOCKER_PASSWORD }}" |
             docker login -u "\${{ secrets.DOCKER_USERNAME }}" --password-stdin
      - name: Build et push
        run: |
          docker build -t monuser/monapp:latest .
          docker push monuser/monapp:latest
\`\`\``,
        },
        {
          title: 'Déploiement automatique',
          content: `Ajoute un job de déploiement au workflow. Exemple avec un serveur via SSH :

\`\`\`yaml
  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Déployer sur le serveur
        uses: appleboy/ssh-action@v1
        with:
          host: \${{ secrets.SERVER_HOST }}
          username: \${{ secrets.SERVER_USER }}
          key: \${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull monuser/monapp:latest
            docker stop monapp || true
            docker rm monapp || true
            docker run -d -p 3000:3000 --name monapp monuser/monapp:latest
\`\`\`

Le pipeline complet fait maintenant : **push → tests → build image → push registry → déploiement serveur**, le tout automatiquement à chaque push sur \`main\`.`,
        },
      ],
    },
  ],

  'commandes-linux-essentielles': [
    {
      title: 'Script de backup automatique',
      description: 'Écris un script Bash qui sauvegarde automatiquement un dossier avec la date du jour et supprime les backups de plus de 7 jours.',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Créer le script de base',
          content: `Crée un fichier \`backup.sh\` :

\`\`\`bash
#!/bin/bash

# Configuration
SOURCE_DIR="/home/user/documents"
BACKUP_DIR="/home/user/backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_NAME="backup_$DATE.tar.gz"

# Créer le dossier de backup s'il n'existe pas
mkdir -p "$BACKUP_DIR"

echo "Début du backup : $DATE"
\`\`\`

Rends le script exécutable :

\`\`\`bash
chmod +x backup.sh
\`\`\``,
        },
        {
          title: 'Ajouter la compression et l\'archivage',
          content: `Ajoute la logique de compression avec \`tar\` :

\`\`\`bash
# Créer l'archive compressée
tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$(dirname "$SOURCE_DIR")" "$(basename "$SOURCE_DIR")"

# Vérifier la taille du backup
SIZE=$(du -h "$BACKUP_DIR/$BACKUP_NAME" | cut -f1)
echo "Backup créé : $BACKUP_NAME ($SIZE)"
\`\`\`

L'option \`-czf\` signifie : **c**réer, compresser avec g**z**ip, dans le **f**ichier spécifié.`,
        },
        {
          title: 'Supprimer les anciens backups',
          content: `Ajoute la rotation automatique pour supprimer les backups de plus de 7 jours :

\`\`\`bash
# Supprimer les backups de plus de 7 jours
echo "Nettoyage des anciens backups..."
find "$BACKUP_DIR" -name "backup_*.tar.gz" -type f -mtime +7 -delete

# Compter les backups restants
COUNT=$(ls -1 "$BACKUP_DIR"/backup_*.tar.gz 2>/dev/null | wc -l)
echo "Backups restants : $COUNT"
echo "Backup terminé avec succès !"
\`\`\`

La commande \`find\` avec \`-mtime +7\` sélectionne les fichiers modifiés il y a plus de 7 jours, et \`-delete\` les supprime.`,
        },
        {
          title: 'Automatiser avec cron',
          content: `Planifie l'exécution automatique avec cron :

\`\`\`bash
# Ouvrir l'éditeur cron
crontab -e

# Ajouter cette ligne pour un backup quotidien à 2h du matin
0 2 * * * /home/user/backup.sh >> /home/user/backups/backup.log 2>&1
\`\`\`

Format cron : \`minute heure jour mois jour_semaine commande\`

Exemples courants :
- \`0 2 * * *\` → tous les jours à 2h
- \`0 2 * * 0\` → tous les dimanches à 2h
- \`0 */6 * * *\` → toutes les 6 heures

Le \`>> backup.log 2>&1\` redirige la sortie standard et les erreurs vers un fichier de log.`,
        },
      ],
    },
    {
      title: 'Monitoring système avec Bash',
      description: 'Crée un tableau de bord terminal qui affiche en temps réel l\'utilisation CPU, RAM, disque et les processus les plus gourmands.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Récupérer les métriques système',
          content: `Crée un fichier \`monitor.sh\` avec les fonctions de collecte :

\`\`\`bash
#!/bin/bash

get_cpu_usage() {
  top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1
}

get_memory_usage() {
  free -m | awk 'NR==2{printf "%.1f%% (%sMB / %sMB)", $3*100/$2, $3, $2}'
}

get_disk_usage() {
  df -h / | awk 'NR==2{printf "%s (%s / %s)", $5, $3, $2}'
}

get_uptime() {
  uptime -p | sed 's/up //'
}
\`\`\``,
        },
        {
          title: 'Créer l\'affichage du dashboard',
          content: `Ajoute la fonction d'affichage avec des couleurs :

\`\`\`bash
# Couleurs
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[0;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color
BOLD='\\033[1m'

display_dashboard() {
  clear
  echo -e "\${BOLD}\${BLUE}╔══════════════════════════════════════╗\${NC}"
  echo -e "\${BOLD}\${BLUE}║     MONITORING SYSTÈME EN TEMPS RÉEL  ║\${NC}"
  echo -e "\${BOLD}\${BLUE}╚══════════════════════════════════════╝\${NC}"
  echo ""
  echo -e " \${GREEN}▸ CPU\${NC}     : $(get_cpu_usage)%"
  echo -e " \${YELLOW}▸ RAM\${NC}     : $(get_memory_usage)"
  echo -e " \${RED}▸ Disque\${NC}  : $(get_disk_usage)"
  echo -e " \${BLUE}▸ Uptime\${NC}  : $(get_uptime)"
}
\`\`\``,
        },
        {
          title: 'Ajouter les top processus',
          content: `Ajoute l'affichage des processus les plus gourmands :

\`\`\`bash
display_top_processes() {
  echo ""
  echo -e "\${BOLD}── Top 5 processus (CPU) ──\${NC}"
  ps aux --sort=-%cpu | head -6 | awk '
    NR==1 {printf "  %-10s %-6s %-6s %s\\n", "USER", "CPU%", "MEM%", "COMMAND"}
    NR>1  {printf "  %-10s %-6s %-6s %s\\n", $1, $3, $4, $11}
  '
  echo ""
  echo -e "\${BOLD}── Top 5 processus (RAM) ──\${NC}"
  ps aux --sort=-%mem | head -6 | awk '
    NR==1 {printf "  %-10s %-6s %-6s %s\\n", "USER", "CPU%", "MEM%", "COMMAND"}
    NR>1  {printf "  %-10s %-6s %-6s %s\\n", $1, $3, $4, $11}
  '
}
\`\`\``,
        },
        {
          title: 'Boucle de rafraîchissement',
          content: `Ajoute la boucle principale qui rafraîchit l'affichage :

\`\`\`bash
# Intervalle de rafraîchissement (en secondes)
INTERVAL=\${1:-3}

echo "Démarrage du monitoring (rafraîchissement : \${INTERVAL}s)"
echo "Appuie sur Ctrl+C pour quitter"
sleep 2

# Boucle infinie
while true; do
  display_dashboard
  display_top_processes
  echo ""
  echo -e "\${BOLD}Rafraîchissement dans \${INTERVAL}s... (Ctrl+C pour quitter)\${NC}"
  sleep "$INTERVAL"
done
\`\`\`

Lance le script :

\`\`\`bash
chmod +x monitor.sh
./monitor.sh       # rafraîchissement par défaut (3s)
./monitor.sh 5     # rafraîchissement toutes les 5s
\`\`\``,
        },
      ],
    },
    {
      title: 'Serveur web sécurisé from scratch',
      description: 'Configure un serveur Linux complet avec Nginx, pare-feu UFW, fail2ban, et certificat SSL Let\'s Encrypt.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Préparer le serveur et installer Nginx',
          content: `Commence par mettre à jour le serveur et installer Nginx :

\`\`\`bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Nginx
sudo apt install nginx -y

# Démarrer et activer Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Vérifier le statut
sudo systemctl status nginx
\`\`\`

Crée ta page web dans \`/var/www/html/index.html\` et vérifie que le serveur répond sur \`http://ton-ip\`.`,
        },
        {
          title: 'Configurer le pare-feu UFW',
          content: `Installe et configure UFW (Uncomplicated Firewall) :

\`\`\`bash
# Installer UFW
sudo apt install ufw -y

# Règles de base : autoriser SSH et HTTP/HTTPS
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# Activer le pare-feu
sudo ufw enable

# Vérifier les règles
sudo ufw status verbose
\`\`\`

La politique \`default deny incoming\` bloque tout le trafic entrant sauf ce qui est explicitement autorisé (SSH, HTTP, HTTPS).`,
        },
        {
          title: 'Installer et configurer fail2ban',
          content: `Protège ton serveur contre les attaques brute-force :

\`\`\`bash
# Installer fail2ban
sudo apt install fail2ban -y

# Créer la config locale
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
\`\`\`

Édite \`/etc/fail2ban/jail.local\` :

\`\`\`ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
\`\`\`

\`\`\`bash
# Redémarrer fail2ban
sudo systemctl restart fail2ban
sudo fail2ban-client status
\`\`\``,
        },
        {
          title: 'Certificat SSL avec Let\'s Encrypt',
          content: `Installe Certbot et génère un certificat SSL gratuit :

\`\`\`bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx -y

# Générer le certificat (remplace par ton domaine)
sudo certbot --nginx -d mondomaine.com -d www.mondomaine.com

# Vérifier le renouvellement automatique
sudo certbot renew --dry-run
\`\`\`

Certbot configure automatiquement Nginx pour rediriger HTTP vers HTTPS. Vérifie dans \`/etc/nginx/sites-available/default\` que les directives SSL sont bien ajoutées.

Ton serveur est maintenant sécurisé avec : pare-feu, protection anti brute-force et chiffrement HTTPS !`,
        },
      ],
    },
  ],

  'cest-quoi-ansible': [
    {
      title: 'Configurer un serveur web avec Ansible',
      description: 'Écris un playbook Ansible qui installe et configure Nginx sur un serveur distant avec une page d\'accueil personnalisée.',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Installer Ansible et configurer l\'inventaire',
          content: `Installe Ansible sur ta machine de contrôle :

\`\`\`bash
# Sur Ubuntu/Debian
sudo apt update
sudo apt install ansible -y

# Vérifier l'installation
ansible --version
\`\`\`

Crée un fichier \`inventory.ini\` :

\`\`\`ini
[webservers]
serveur1 ansible_host=192.168.1.100 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa
\`\`\`

Teste la connexion :

\`\`\`bash
ansible webservers -i inventory.ini -m ping
\`\`\``,
        },
        {
          title: 'Écrire le playbook Nginx',
          content: `Crée le fichier \`setup-nginx.yml\` :

\`\`\`yaml
---
- name: Configurer un serveur web Nginx
  hosts: webservers
  become: yes

  tasks:
    - name: Mettre à jour le cache apt
      apt:
        update_cache: yes
        cache_valid_time: 3600

    - name: Installer Nginx
      apt:
        name: nginx
        state: present

    - name: Démarrer et activer Nginx
      service:
        name: nginx
        state: started
        enabled: yes
\`\`\`

Chaque tâche utilise un module Ansible (\`apt\`, \`service\`) qui gère l'idempotence automatiquement.`,
        },
        {
          title: 'Ajouter une page d\'accueil personnalisée',
          content: `Crée un dossier \`templates/\` et un fichier \`index.html.j2\` :

\`\`\`html
<!DOCTYPE html>
<html>
<head><title>{{ server_name }}</title></head>
<body>
  <h1>Bienvenue sur {{ server_name }}</h1>
  <p>Serveur configuré par Ansible</p>
  <p>Hostname: {{ ansible_hostname }}</p>
</body>
</html>
\`\`\`

Ajoute les tâches au playbook :

\`\`\`yaml
    - name: Déployer la page d'accueil
      template:
        src: templates/index.html.j2
        dest: /var/www/html/index.html
        owner: www-data
        group: www-data
      notify: Redémarrer Nginx

  vars:
    server_name: "Mon Serveur Web"

  handlers:
    - name: Redémarrer Nginx
      service:
        name: nginx
        state: restarted
\`\`\``,
        },
        {
          title: 'Exécuter et vérifier',
          content: `Lance le playbook :

\`\`\`bash
# Exécuter le playbook
ansible-playbook -i inventory.ini setup-nginx.yml

# Mode verbose pour le debug
ansible-playbook -i inventory.ini setup-nginx.yml -v

# Simuler sans appliquer (dry-run)
ansible-playbook -i inventory.ini setup-nginx.yml --check
\`\`\`

Résultat attendu :

\`\`\`
PLAY RECAP
serveur1 : ok=5  changed=3  unreachable=0  failed=0
\`\`\`

Ouvre \`http://192.168.1.100\` dans ton navigateur pour voir ta page personnalisée déployée par Ansible.`,
        },
      ],
    },
    {
      title: 'Déploiement multi-serveurs',
      description: 'Crée un inventaire avec plusieurs groupes de serveurs et un playbook qui déploie une application différente sur chaque groupe.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Créer l\'inventaire multi-groupes',
          content: `Crée un fichier \`inventory.ini\` avec des groupes distincts :

\`\`\`ini
[webservers]
web1 ansible_host=192.168.1.10
web2 ansible_host=192.168.1.11

[dbservers]
db1 ansible_host=192.168.1.20

[monitoring]
monitor1 ansible_host=192.168.1.30

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/.ssh/id_rsa
\`\`\`

Teste la connectivité par groupe :

\`\`\`bash
ansible webservers -i inventory.ini -m ping
ansible dbservers -i inventory.ini -m ping
\`\`\``,
        },
        {
          title: 'Playbook pour les serveurs web',
          content: `Crée \`deploy-all.yml\` avec un play par groupe :

\`\`\`yaml
---
# Play 1 : Serveurs web
- name: Configurer les serveurs web
  hosts: webservers
  become: yes
  tasks:
    - name: Installer Nginx
      apt:
        name: nginx
        state: present
        update_cache: yes

    - name: Copier la configuration Nginx
      template:
        src: templates/nginx.conf.j2
        dest: /etc/nginx/sites-available/default
      notify: Reload Nginx

    - name: Déployer l'application
      copy:
        src: app/
        dest: /var/www/html/
        owner: www-data

  handlers:
    - name: Reload Nginx
      service:
        name: nginx
        state: reloaded
\`\`\``,
        },
        {
          title: 'Playbook pour la base de données',
          content: `Ajoute le play pour les serveurs de base de données :

\`\`\`yaml
# Play 2 : Base de données
- name: Configurer les serveurs de base de données
  hosts: dbservers
  become: yes
  vars:
    mysql_root_password: "SecurePass123!"
    app_db_name: "monapp"
  tasks:
    - name: Installer MySQL
      apt:
        name:
          - mysql-server
          - python3-pymysql
        state: present
        update_cache: yes

    - name: Démarrer MySQL
      service:
        name: mysql
        state: started
        enabled: yes

    - name: Créer la base de données
      mysql_db:
        name: "{{ app_db_name }}"
        state: present
        login_unix_socket: /var/run/mysqld/mysqld.sock
\`\`\``,
        },
        {
          title: 'Exécuter le déploiement complet',
          content: `Lance le déploiement sur tous les groupes :

\`\`\`bash
# Déployer sur tous les serveurs
ansible-playbook -i inventory.ini deploy-all.yml

# Déployer uniquement sur les serveurs web
ansible-playbook -i inventory.ini deploy-all.yml --limit webservers

# Déployer avec des variables personnalisées
ansible-playbook -i inventory.ini deploy-all.yml -e "app_version=2.0"
\`\`\`

Utilise \`--limit\` pour cibler un groupe spécifique et \`-e\` pour passer des variables en ligne de commande. Ansible exécute les tâches en parallèle sur tous les serveurs d'un même groupe.`,
        },
      ],
    },
    {
      title: 'Infrastructure complète avec rôles Ansible',
      description: 'Développe une collection de rôles Ansible pour provisionner une infrastructure complète : load balancer, app servers, base de données.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Structurer le projet avec des rôles',
          content: `Initialise la structure de rôles avec \`ansible-galaxy\` :

\`\`\`bash
mkdir infra-ansible && cd infra-ansible

# Créer les rôles
ansible-galaxy init roles/common
ansible-galaxy init roles/nginx_lb
ansible-galaxy init roles/app_server
ansible-galaxy init roles/database
\`\`\`

Structure résultante :

\`\`\`
infra-ansible/
├── site.yml
├── inventory.ini
└── roles/
    ├── common/
    │   ├── tasks/main.yml
    │   ├── handlers/main.yml
    │   └── templates/
    ├── nginx_lb/
    ├── app_server/
    └── database/
\`\`\``,
        },
        {
          title: 'Créer le rôle common',
          content: `Édite \`roles/common/tasks/main.yml\` pour les tâches partagées :

\`\`\`yaml
---
- name: Mettre à jour les paquets
  apt:
    update_cache: yes
    upgrade: dist
    cache_valid_time: 3600

- name: Installer les paquets de base
  apt:
    name:
      - curl
      - wget
      - vim
      - htop
      - ufw
      - fail2ban
    state: present

- name: Configurer le pare-feu - SSH
  ufw:
    rule: allow
    port: '22'
    proto: tcp

- name: Activer UFW
  ufw:
    state: enabled
    default: deny
    direction: incoming

- name: Configurer le timezone
  timezone:
    name: Europe/Paris
\`\`\``,
        },
        {
          title: 'Créer le rôle load balancer',
          content: `Édite \`roles/nginx_lb/tasks/main.yml\` :

\`\`\`yaml
---
- name: Installer Nginx
  apt:
    name: nginx
    state: present

- name: Configurer le load balancer
  template:
    src: lb.conf.j2
    dest: /etc/nginx/sites-available/default
  notify: Reload Nginx

- name: Ouvrir le port HTTP/HTTPS
  ufw:
    rule: allow
    port: "{{ item }}"
    proto: tcp
  loop:
    - '80'
    - '443'
\`\`\`

Crée \`roles/nginx_lb/templates/lb.conf.j2\` :

\`\`\`nginx
upstream app_servers {
    {% for host in groups['appservers'] %}
    server {{ hostvars[host]['ansible_host'] }}:3000;
    {% endfor %}
}

server {
    listen 80;
    location / {
        proxy_pass http://app_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\``,
        },
        {
          title: 'Assembler avec le playbook principal',
          content: `Crée \`site.yml\` qui orchestre tous les rôles :

\`\`\`yaml
---
- name: Configuration commune
  hosts: all
  become: yes
  roles:
    - common

- name: Load Balancer
  hosts: loadbalancer
  become: yes
  roles:
    - nginx_lb

- name: Serveurs d'application
  hosts: appservers
  become: yes
  roles:
    - app_server

- name: Base de données
  hosts: dbservers
  become: yes
  roles:
    - database
\`\`\`

Lance l'infrastructure complète :

\`\`\`bash
# Déployer toute l'infrastructure
ansible-playbook -i inventory.ini site.yml

# Déployer un rôle spécifique
ansible-playbook -i inventory.ini site.yml --tags "database"
\`\`\`

Les rôles rendent ton infrastructure modulaire, testable et réutilisable. Chaque rôle peut être versionné indépendamment.`,
        },
      ],
    },
  ],

  'tcp-ip-explique': [
    {
      title: 'Analyseur de paquets simple',
      description: 'Utilise Wireshark ou tcpdump pour capturer et analyser le trafic réseau de ta machine. Identifie les différents protocoles.',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Installer les outils de capture',
          content: `Installe tcpdump et Wireshark :

\`\`\`bash
# Sur Ubuntu/Debian
sudo apt update
sudo apt install tcpdump wireshark -y

# Autoriser la capture sans root (optionnel)
sudo usermod -aG wireshark $USER
\`\`\`

Vérifie les interfaces réseau disponibles :

\`\`\`bash
# Lister les interfaces
tcpdump -D

# ou avec ip
ip link show
\`\`\``,
        },
        {
          title: 'Capturer avec tcpdump',
          content: `Lance des captures basiques avec tcpdump :

\`\`\`bash
# Capturer tout le trafic sur eth0 (10 paquets)
sudo tcpdump -i eth0 -c 10

# Capturer uniquement le trafic HTTP
sudo tcpdump -i eth0 port 80 -c 20

# Capturer le trafic DNS
sudo tcpdump -i eth0 port 53 -c 10

# Sauvegarder dans un fichier .pcap
sudo tcpdump -i eth0 -c 100 -w capture.pcap

# Affichage détaillé avec contenu ASCII
sudo tcpdump -i eth0 -A -c 5
\`\`\`

Chaque ligne montre : timestamp, protocole, IP source → IP destination, et informations du paquet.`,
        },
        {
          title: 'Analyser avec Wireshark',
          content: `Ouvre le fichier de capture dans Wireshark :

\`\`\`bash
wireshark capture.pcap
\`\`\`

Filtres utiles dans Wireshark :
- \`http\` → affiche uniquement le trafic HTTP
- \`dns\` → requêtes et réponses DNS
- \`tcp.port == 443\` → trafic HTTPS
- \`ip.addr == 192.168.1.1\` → trafic d'une IP spécifique
- \`tcp.flags.syn == 1\` → paquets SYN (début de connexion)

Observe la poignée de main TCP en 3 étapes (three-way handshake) : SYN → SYN-ACK → ACK en filtrant avec \`tcp.flags.syn == 1\`.`,
        },
        {
          title: 'Interpréter les résultats',
          content: `Apprends à lire les couches du modèle TCP/IP dans Wireshark :

**Couche Liaison (Ethernet)** :
- Adresses MAC source et destination
- Type de protocole (IPv4, IPv6, ARP)

**Couche Réseau (IP)** :
- Adresses IP source et destination
- TTL (Time To Live)
- Protocole transporté (TCP, UDP, ICMP)

**Couche Transport (TCP/UDP)** :
- Ports source et destination
- Numéros de séquence (TCP)
- Flags TCP (SYN, ACK, FIN, RST)

**Couche Application** :
- Données HTTP, DNS, etc.

Exercice : ouvre un site web et identifie dans Wireshark la résolution DNS, le handshake TCP, puis la requête HTTP GET.`,
        },
      ],
    },
    {
      title: 'Chat réseau en Python',
      description: 'Programme un chat client-serveur en Python avec des sockets TCP. Gère plusieurs clients simultanément avec le threading.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Créer le serveur TCP',
          content: `Crée un fichier \`server.py\` :

\`\`\`python
import socket
import threading

HOST = '0.0.0.0'
PORT = 5555

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server.bind((HOST, PORT))
server.listen()

clients = []
nicknames = []

print(f"Serveur démarré sur {HOST}:{PORT}")

def broadcast(message):
    """Envoie un message à tous les clients connectés"""
    for client in clients:
        try:
            client.send(message)
        except:
            remove_client(client)
\`\`\`

Le serveur écoute sur toutes les interfaces (\`0.0.0.0\`) et maintient des listes de clients et pseudos.`,
        },
        {
          title: 'Gérer les connexions multiples',
          content: `Ajoute la gestion des clients avec le threading :

\`\`\`python
def handle_client(client):
    """Gère la communication avec un client"""
    while True:
        try:
            message = client.recv(1024)
            if not message:
                break
            broadcast(message)
        except:
            break
    remove_client(client)

def remove_client(client):
    """Supprime un client déconnecté"""
    if client in clients:
        index = clients.index(client)
        nickname = nicknames[index]
        clients.remove(client)
        nicknames.remove(nickname)
        client.close()
        broadcast(f"{nickname} a quitté le chat.".encode('utf-8'))

def accept_connections():
    """Accepte les nouvelles connexions"""
    while True:
        client, address = server.accept()
        print(f"Connexion de {address}")

        client.send("NICK".encode('utf-8'))
        nickname = client.recv(1024).decode('utf-8')

        nicknames.append(nickname)
        clients.append(client)

        broadcast(f"{nickname} a rejoint le chat !".encode('utf-8'))
        thread = threading.Thread(target=handle_client, args=(client,))
        thread.start()

accept_connections()
\`\`\``,
        },
        {
          title: 'Créer le client',
          content: `Crée un fichier \`client.py\` :

\`\`\`python
import socket
import threading

HOST = '127.0.0.1'
PORT = 5555

nickname = input("Choisis ton pseudo : ")

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect((HOST, PORT))

def receive():
    """Reçoit les messages du serveur"""
    while True:
        try:
            message = client.recv(1024).decode('utf-8')
            if message == "NICK":
                client.send(nickname.encode('utf-8'))
            else:
                print(message)
        except:
            print("Connexion perdue.")
            client.close()
            break

def write():
    """Envoie les messages au serveur"""
    while True:
        message = input("")
        full_message = f"{nickname}: {message}"
        client.send(full_message.encode('utf-8'))

# Lancer les threads
receive_thread = threading.Thread(target=receive)
receive_thread.start()

write_thread = threading.Thread(target=write)
write_thread.start()
\`\`\``,
        },
        {
          title: 'Tester le chat',
          content: `Lance le serveur puis plusieurs clients :

\`\`\`bash
# Terminal 1 : Lancer le serveur
python server.py

# Terminal 2 : Premier client
python client.py

# Terminal 3 : Deuxième client
python client.py
\`\`\`

Fonctionnalités à tester :
- Envoi de messages entre clients
- Notification quand un client rejoint/quitte
- Déconnexion propre d'un client

Pour aller plus loin, tu peux ajouter :
- Des commandes (\`/quit\`, \`/list\`, \`/whisper\`)
- Un historique des messages
- Du chiffrement avec \`ssl.wrap_socket()\`

Ce projet montre concrètement comment TCP gère les connexions persistantes et bidirectionnelles.`,
        },
      ],
    },
    {
      title: 'Simulateur de réseau virtuel',
      description: 'Crée un réseau virtuel complet avec GNS3 ou Mininet : routeurs, switches, VLAN, et règles de pare-feu entre sous-réseaux.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Installer Mininet',
          content: `Installe Mininet pour simuler des réseaux :

\`\`\`bash
# Sur Ubuntu
sudo apt update
sudo apt install mininet openvswitch-switch -y

# Vérifier l'installation
sudo mn --test pingall
\`\`\`

Crée un premier réseau simple :

\`\`\`bash
# Réseau par défaut : 2 hôtes, 1 switch, 1 contrôleur
sudo mn

# Dans le CLI Mininet
mininet> pingall
mininet> h1 ping h2
mininet> net
mininet> dump
mininet> exit
\`\`\``,
        },
        {
          title: 'Créer une topologie personnalisée',
          content: `Crée un fichier \`topology.py\` avec une topologie multi-switch :

\`\`\`python
from mininet.net import Mininet
from mininet.topo import Topo
from mininet.node import OVSSwitch, Controller
from mininet.cli import CLI
from mininet.log import setLogLevel

class CustomTopo(Topo):
    def build(self):
        # Créer les switches
        s1 = self.addSwitch('s1')
        s2 = self.addSwitch('s2')

        # Sous-réseau 1 : 192.168.1.0/24
        h1 = self.addHost('h1', ip='192.168.1.10/24')
        h2 = self.addHost('h2', ip='192.168.1.11/24')

        # Sous-réseau 2 : 192.168.2.0/24
        h3 = self.addHost('h3', ip='192.168.2.10/24')
        h4 = self.addHost('h4', ip='192.168.2.11/24')

        # Liens
        self.addLink(h1, s1)
        self.addLink(h2, s1)
        self.addLink(h3, s2)
        self.addLink(h4, s2)
        self.addLink(s1, s2)

if __name__ == '__main__':
    setLogLevel('info')
    topo = CustomTopo()
    net = Mininet(topo=topo, switch=OVSSwitch, controller=Controller)
    net.start()
    CLI(net)
    net.stop()
\`\`\`

\`\`\`bash
sudo python topology.py
\`\`\``,
        },
        {
          title: 'Configurer les VLANs',
          content: `Ajoute la configuration VLAN avec Open vSwitch :

\`\`\`python
def configure_vlans(net):
    """Configure les VLANs sur les switches"""
    s1 = net.get('s1')
    s2 = net.get('s2')

    # VLAN 10 pour le sous-réseau 1
    s1.cmd('ovs-vsctl set port s1-eth1 tag=10')  # h1
    s1.cmd('ovs-vsctl set port s1-eth2 tag=10')  # h2

    # VLAN 20 pour le sous-réseau 2
    s2.cmd('ovs-vsctl set port s2-eth1 tag=20')  # h3
    s2.cmd('ovs-vsctl set port s2-eth2 tag=20')  # h4

    # Lien trunk entre s1 et s2
    s1.cmd('ovs-vsctl set port s1-eth3 trunks=10,20')
    s2.cmd('ovs-vsctl set port s2-eth3 trunks=10,20')

    print("VLANs configurés !")
\`\`\`

Teste l'isolation : les hôtes du VLAN 10 ne peuvent pas communiquer avec ceux du VLAN 20.`,
        },
        {
          title: 'Ajouter des règles de pare-feu',
          content: `Ajoute des règles de filtrage avec iptables sur les hôtes :

\`\`\`python
def configure_firewall(net):
    """Configure les règles de pare-feu entre sous-réseaux"""
    h1 = net.get('h1')
    h3 = net.get('h3')

    # h1 : Autoriser uniquement le ping vers le sous-réseau 2
    h1.cmd('iptables -A OUTPUT -d 192.168.2.0/24 -p icmp -j ACCEPT')
    h1.cmd('iptables -A OUTPUT -d 192.168.2.0/24 -j DROP')

    # h3 : Bloquer tout trafic depuis le sous-réseau 1
    h3.cmd('iptables -A INPUT -s 192.168.1.0/24 -p tcp --dport 80 -j DROP')

    print("Pare-feu configuré !")
\`\`\`

Teste les règles :

\`\`\`bash
# Dans le CLI Mininet
mininet> h1 ping h3        # devrait fonctionner (ICMP autorisé)
mininet> h1 curl h3:80     # devrait être bloqué
mininet> h3 iptables -L -n # afficher les règles
\`\`\`

Ce projet te permet de comprendre concrètement le routage, les VLANs et le filtrage réseau dans un environnement sécurisé.`,
        },
      ],
    },
  ],

  'terraform-guide': [
    {
      title: 'Déployer une VM dans le cloud',
      description: 'Utilise Terraform pour provisionner une machine virtuelle sur AWS (EC2) ou GCP avec un fichier de configuration simple.',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Installer Terraform et configurer AWS',
          content: `Installe Terraform et configure les identifiants AWS :

\`\`\`bash
# Installer Terraform (Ubuntu)
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform -y

# Vérifier
terraform version
\`\`\`

Configure les identifiants AWS :

\`\`\`bash
# Installer AWS CLI
sudo apt install awscli -y

# Configurer les identifiants
aws configure
# AWS Access Key ID: AKIA...
# AWS Secret Access Key: ...
# Default region: eu-west-3
\`\`\``,
        },
        {
          title: 'Écrire la configuration Terraform',
          content: `Crée un dossier et le fichier \`main.tf\` :

\`\`\`bash
mkdir terraform-vm && cd terraform-vm
\`\`\`

\`\`\`hcl
# main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-west-3"  # Paris
}

resource "aws_instance" "my_server" {
  ami           = "ami-0c55b159cbfafe1f0"  # Ubuntu 22.04
  instance_type = "t2.micro"               # Éligible free tier

  tags = {
    Name = "MonServeurTerraform"
  }
}
\`\`\``,
        },
        {
          title: 'Initialiser et planifier',
          content: `Initialise Terraform et visualise les changements :

\`\`\`bash
# Initialiser (télécharge le provider AWS)
terraform init

# Voir ce qui va être créé
terraform plan
\`\`\`

Le \`terraform plan\` affiche un résumé des ressources à créer :

\`\`\`
Plan: 1 to add, 0 to change, 0 to destroy.
\`\`\`

C'est une bonne pratique de toujours vérifier le plan avant d'appliquer les changements.`,
        },
        {
          title: 'Appliquer et gérer la VM',
          content: `Crée la VM puis apprends à la gérer :

\`\`\`bash
# Créer la VM
terraform apply
# Tape "yes" pour confirmer

# Voir l'état actuel
terraform show

# Voir les outputs
terraform output
\`\`\`

Ajoute des outputs pour récupérer l'IP publique. Ajoute dans \`main.tf\` :

\`\`\`hcl
output "public_ip" {
  value = aws_instance.my_server.public_ip
}

output "instance_id" {
  value = aws_instance.my_server.id
}
\`\`\`

Pour supprimer la VM (important pour éviter les coûts) :

\`\`\`bash
terraform destroy
\`\`\`

Terraform gère l'état de ton infrastructure dans \`terraform.tfstate\`. Ne supprime jamais ce fichier manuellement.`,
        },
      ],
    },
    {
      title: 'Infrastructure réseau complète',
      description: 'Crée un VPC avec sous-réseaux publics/privés, tables de routage, NAT Gateway et Security Groups avec Terraform.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Créer le VPC et les sous-réseaux',
          content: `Crée la structure réseau de base dans \`network.tf\` :

\`\`\`hcl
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "main-vpc" }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-west-3a"
  map_public_ip_on_launch = true

  tags = { Name = "public-subnet" }
}

resource "aws_subnet" "private" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "eu-west-3a"

  tags = { Name = "private-subnet" }
}
\`\`\``,
        },
        {
          title: 'Configurer l\'Internet Gateway et le NAT',
          content: `Ajoute la connectivité internet :

\`\`\`hcl
# Internet Gateway pour le sous-réseau public
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "main-igw" }
}

# Elastic IP pour le NAT Gateway
resource "aws_eip" "nat_eip" {
  domain = "vpc"
}

# NAT Gateway pour le sous-réseau privé
resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat_eip.id
  subnet_id     = aws_subnet.public.id
  tags          = { Name = "main-nat" }

  depends_on = [aws_internet_gateway.igw]
}
\`\`\`

L'Internet Gateway permet au sous-réseau public d'accéder à internet directement, tandis que le NAT Gateway permet au sous-réseau privé d'accéder à internet sans être directement exposé.`,
        },
        {
          title: 'Configurer les tables de routage',
          content: `Crée les tables de routage pour chaque sous-réseau :

\`\`\`hcl
# Route table publique
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = { Name = "public-rt" }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# Route table privée
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = { Name = "private-rt" }
}

resource "aws_route_table_association" "private" {
  subnet_id      = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}
\`\`\``,
        },
        {
          title: 'Ajouter les Security Groups',
          content: `Crée les groupes de sécurité dans \`security.tf\` :

\`\`\`hcl
resource "aws_security_group" "web" {
  name_prefix = "web-"
  vpc_id      = aws_vpc.main.id

  # HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Tout le trafic sortant
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "web-sg" }
}
\`\`\`

Applique l'infrastructure :

\`\`\`bash
terraform plan
terraform apply
\`\`\`

Tu as maintenant un VPC complet avec isolation réseau, accès internet contrôlé et règles de sécurité.`,
        },
      ],
    },
    {
      title: 'Cluster Kubernetes avec Terraform',
      description: 'Déploie un cluster EKS/GKE complet avec Terraform, incluant auto-scaling, monitoring et gestion des secrets.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Configurer le provider et le réseau',
          content: `Crée \`main.tf\` avec les prérequis pour EKS :

\`\`\`hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-west-3"
}

# VPC dédié au cluster
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "eks-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-3a", "eu-west-3b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }
  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }
}
\`\`\``,
        },
        {
          title: 'Créer le cluster EKS',
          content: `Ajoute la configuration du cluster dans \`eks.tf\` :

\`\`\`hcl
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "19.0"

  cluster_name    = "mon-cluster"
  cluster_version = "1.28"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # Node groups avec auto-scaling
  eks_managed_node_groups = {
    general = {
      desired_size = 2
      min_size     = 1
      max_size     = 5

      instance_types = ["t3.medium"]
      capacity_type  = "ON_DEMAND"

      labels = {
        role = "general"
      }
    }

    spot = {
      desired_size = 2
      min_size     = 0
      max_size     = 10

      instance_types = ["t3.medium", "t3.large"]
      capacity_type  = "SPOT"

      labels = {
        role = "spot-worker"
      }
    }
  }
}
\`\`\``,
        },
        {
          title: 'Configurer le monitoring',
          content: `Ajoute CloudWatch et les métriques dans \`monitoring.tf\` :

\`\`\`hcl
# Activer les logs du cluster
resource "aws_cloudwatch_log_group" "eks" {
  name              = "/aws/eks/mon-cluster/cluster"
  retention_in_days = 30
}

# Installer le metrics-server via Helm
resource "helm_release" "metrics_server" {
  name       = "metrics-server"
  repository = "https://kubernetes-sigs.github.io/metrics-server/"
  chart      = "metrics-server"
  namespace  = "kube-system"

  set {
    name  = "args[0]"
    value = "--kubelet-preferred-address-types=InternalIP"
  }
}
\`\`\`

Ajoute le provider Helm dans \`main.tf\` :

\`\`\`hcl
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args        = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
    }
  }
}
\`\`\``,
        },
        {
          title: 'Déployer et se connecter au cluster',
          content: `Applique la configuration et connecte-toi au cluster :

\`\`\`bash
# Initialiser et appliquer
terraform init
terraform plan
terraform apply

# Configurer kubectl
aws eks update-kubeconfig --name mon-cluster --region eu-west-3

# Vérifier le cluster
kubectl get nodes
kubectl get pods -A
\`\`\`

Teste l'auto-scaling :

\`\`\`bash
# Déployer une app de test
kubectl create deployment nginx --image=nginx --replicas=3
kubectl expose deployment nginx --port=80 --type=LoadBalancer

# Voir le load balancer créé
kubectl get svc nginx
\`\`\`

Pour supprimer (attention aux coûts !) :

\`\`\`bash
kubectl delete svc nginx
kubectl delete deployment nginx
terraform destroy
\`\`\`

Tu as maintenant un cluster Kubernetes de production avec auto-scaling, monitoring et gestion multi-node groups.`,
        },
      ],
    },
  ],

  'api-cest-quoi': [
    {
      title: 'Consommer une API publique',
      description: 'Utilise JavaScript pour faire des requêtes à une API publique et afficher les données dans une page web.',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Choisir une API publique',
          content: `Il existe des centaines d'API gratuites. On va utiliser l'API JSONPlaceholder pour commencer :

\`\`\`
URL de base : https://jsonplaceholder.typicode.com
Endpoints disponibles :
- /posts      → articles de blog
- /users      → utilisateurs
- /comments   → commentaires
- /todos      → liste de tâches
\`\`\`

Teste dans ton navigateur : ouvre \`https://jsonplaceholder.typicode.com/posts/1\` et observe le JSON retourné.`,
        },
        {
          title: 'Faire une requête avec fetch',
          content: `Crée un fichier \`index.html\` :

\`\`\`html
<!DOCTYPE html>
<html>
<head><title>Mon App API</title></head>
<body>
  <h1>Articles depuis l'API</h1>
  <div id="posts"></div>

  <script>
    async function fetchPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();

      const container = document.getElementById('posts');
      posts.slice(0, 5).forEach(post => {
        container.innerHTML += \`
          <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
            <h3>\${post.title}</h3>
            <p>\${post.body}</p>
          </div>
        \`;
      });
    }

    fetchPosts();
  </script>
</body>
</html>
\`\`\`

Ouvre ce fichier dans ton navigateur pour voir les articles chargés depuis l'API.`,
        },
        {
          title: 'Gérer les erreurs',
          content: `Ajoute la gestion d'erreurs pour une app robuste :

\`\`\`javascript
async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error(\`Erreur HTTP : \${response.status}\`);
    }

    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error('Erreur :', error.message);
    document.getElementById('posts').innerHTML =
      '<p style="color:red;">Impossible de charger les articles.</p>';
  }
}
\`\`\`

Les codes HTTP à connaître :
- \`200\` → OK
- \`404\` → Non trouvé
- \`500\` → Erreur serveur
- \`429\` → Trop de requêtes (rate limit)`,
        },
        {
          title: 'Envoyer des données avec POST',
          content: `Apprends à envoyer des données à une API :

\`\`\`javascript
async function createPost() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'Mon nouvel article',
      body: 'Contenu de l\\'article créé via API',
      userId: 1,
    }),
  });

  const data = await response.json();
  console.log('Article créé :', data);
}
\`\`\`

Les 4 méthodes HTTP principales :
- **GET** → Lire des données
- **POST** → Créer des données
- **PUT** → Mettre à jour des données
- **DELETE** → Supprimer des données`,
        },
      ],
    },
    {
      title: 'Créer ta propre API REST',
      description: 'Construis une API REST simple avec Node.js et Express qui gère des ressources avec les opérations CRUD.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Initialiser le projet',
          content: `Crée un projet Node.js avec Express :

\`\`\`bash
mkdir mon-api && cd mon-api
npm init -y
npm install express
\`\`\`

Crée \`server.js\` :

\`\`\`javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Base de données en mémoire
let todos = [
  { id: 1, title: 'Apprendre les API', completed: false },
  { id: 2, title: 'Créer mon API', completed: false },
];

app.listen(PORT, () => {
  console.log(\`API lancée sur http://localhost:\${PORT}\`);
});
\`\`\``,
        },
        {
          title: 'Ajouter les routes CRUD',
          content: `Ajoute les 4 opérations CRUD :

\`\`\`javascript
// GET - Lire tous les todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// GET - Lire un todo par ID
app.get('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo non trouvé' });
  res.json(todo);
});

// POST - Créer un todo
app.post('/api/todos', (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// DELETE - Supprimer un todo
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});
\`\`\``,
        },
        {
          title: 'Tester avec curl',
          content: `Lance le serveur et teste chaque endpoint :

\`\`\`bash
# Lancer le serveur
node server.js

# GET - Lister les todos
curl http://localhost:3000/api/todos

# POST - Créer un todo
curl -X POST http://localhost:3000/api/todos \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Nouveau todo"}'

# GET - Un todo spécifique
curl http://localhost:3000/api/todos/1

# DELETE - Supprimer
curl -X DELETE http://localhost:3000/api/todos/1
\`\`\``,
        },
        {
          title: 'Ajouter la validation',
          content: `Ajoute des contrôles sur les données reçues :

\`\`\`javascript
app.post('/api/todos', (req, res) => {
  // Validation
  if (!req.body.title || req.body.title.trim() === '') {
    return res.status(400).json({
      error: 'Le champ "title" est obligatoire'
    });
  }

  if (req.body.title.length > 200) {
    return res.status(400).json({
      error: 'Le titre ne doit pas dépasser 200 caractères'
    });
  }

  const todo = {
    id: todos.length + 1,
    title: req.body.title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);
  res.status(201).json(todo);
});
\`\`\`

Ta première API REST est fonctionnelle ! Tu peux maintenant la connecter à une base de données (MongoDB, PostgreSQL) pour persister les données.`,
        },
      ],
    },
    {
      title: 'Intégrer une API avec authentification',
      description: 'Apprends à utiliser des API qui nécessitent une clé API ou un token d\'authentification (OAuth, JWT).',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Comprendre les types d\'authentification',
          content: `Les API utilisent différentes méthodes d'authentification :

**API Key** (le plus simple) :

\`\`\`javascript
// Clé dans le header
fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': 'ta-cle-api-ici'
  }
});

// Clé dans l'URL (moins sécurisé)
fetch('https://api.example.com/data?api_key=ta-cle-api-ici');
\`\`\`

**Bearer Token** (JWT) :

\`\`\`javascript
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
  }
});
\`\`\``,
        },
        {
          title: 'Implémenter JWT dans ton API',
          content: `Ajoute l'authentification JWT à ton API Express :

\`\`\`bash
npm install jsonwebtoken bcryptjs
\`\`\`

\`\`\`javascript
const jwt = require('jsonwebtoken');
const SECRET = 'ton-secret-tres-long-et-aleatoire';

// Route login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Vérifier les identifiants (simplifié)
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign(
      { username, role: 'admin' },
      SECRET,
      { expiresIn: '1h' }
    );
    return res.json({ token });
  }

  res.status(401).json({ error: 'Identifiants invalides' });
});
\`\`\``,
        },
        {
          title: 'Créer un middleware d\'authentification',
          content: `Protège tes routes avec un middleware :

\`\`\`javascript
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token invalide ou expiré' });
  }
}

// Routes protégées
app.get('/api/todos', authMiddleware, (req, res) => {
  res.json(todos);
});

app.post('/api/todos', authMiddleware, (req, res) => {
  // Seuls les utilisateurs authentifiés peuvent créer
});
\`\`\``,
        },
        {
          title: 'Tester le flux complet',
          content: `Teste l'authentification de bout en bout :

\`\`\`bash
# 1. Se connecter et récupérer le token
TOKEN=$(curl -s -X POST http://localhost:3000/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"password"}' \\
  | jq -r '.token')

echo "Token: $TOKEN"

# 2. Accéder à une route protégée
curl http://localhost:3000/api/todos \\
  -H "Authorization: Bearer $TOKEN"

# 3. Tester sans token (doit échouer)
curl http://localhost:3000/api/todos
# → {"error": "Token manquant"}
\`\`\`

Tu maîtrises maintenant le cycle complet : authentification, génération de token, et protection des routes API.`,
        },
      ],
    },
  ],

  'dns-cest-quoi': [
    {
      title: 'Explorer le DNS avec des outils',
      description: 'Utilise nslookup, dig et d\'autres outils pour comprendre comment fonctionne la résolution DNS en pratique.',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Utiliser nslookup',
          content: `\`nslookup\` est disponible sur tous les OS. Teste-le :

\`\`\`bash
# Résolution simple
nslookup google.com

# Résultat :
# Server:    192.168.1.1      (ton serveur DNS)
# Address:   142.250.74.238   (IP de Google)
\`\`\`

Requêtes avancées :

\`\`\`bash
# Chercher les serveurs mail (MX)
nslookup -type=mx gmail.com

# Chercher les serveurs de noms (NS)
nslookup -type=ns google.com

# Utiliser un DNS spécifique
nslookup google.com 8.8.8.8
\`\`\``,
        },
        {
          title: 'Utiliser dig (plus détaillé)',
          content: `\`dig\` donne des informations plus détaillées :

\`\`\`bash
# Installation (si nécessaire)
sudo apt install dnsutils -y

# Requête simple
dig google.com

# Réponse courte
dig google.com +short

# Enregistrement spécifique
dig google.com MX
dig google.com AAAA    # IPv6
dig google.com TXT     # Enregistrements texte (SPF, DKIM...)
\`\`\`

\`dig\` affiche aussi le temps de réponse (\`Query time\`), utile pour diagnostiquer des lenteurs DNS.`,
        },
        {
          title: 'Tracer le chemin de résolution',
          content: `Visualise toute la chaîne de résolution DNS :

\`\`\`bash
# Trace complète depuis la racine
dig google.com +trace
\`\`\`

Le résultat montre les 4 étapes :
- **Serveurs racine** (.) → redirige vers les serveurs TLD
- **Serveurs TLD** (.com) → redirige vers les serveurs autoritaires
- **Serveurs autoritaires** (google.com) → donne l'IP finale

\`\`\`bash
# Voir le cache DNS local (Windows)
ipconfig /displaydns

# Vider le cache DNS
# Windows
ipconfig /flushdns
# Linux
sudo systemd-resolve --flush-caches
\`\`\``,
        },
        {
          title: 'Diagnostiquer des problèmes DNS',
          content: `Scénarios de dépannage courants :

\`\`\`bash
# Le site ne charge pas ? Vérifie le DNS
nslookup monsite.com
# Si "NXDOMAIN" → le domaine n'existe pas

# Comparer avec un DNS public
nslookup monsite.com 8.8.8.8    # Google DNS
nslookup monsite.com 1.1.1.1    # Cloudflare DNS

# Mesurer le temps de résolution
dig monsite.com | grep "Query time"
# Query time: 23 msec → normal
# Query time: 2000 msec → problème !
\`\`\`

Si ton DNS local est lent, change-le dans ta configuration réseau pour utiliser \`8.8.8.8\` (Google) ou \`1.1.1.1\` (Cloudflare).`,
        },
      ],
    },
    {
      title: 'Configurer son propre serveur DNS',
      description: 'Installe et configure un serveur DNS local avec Pi-hole ou BIND pour comprendre le fonctionnement interne.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Installer Pi-hole',
          content: `Pi-hole est un serveur DNS local qui bloque aussi les pubs :

\`\`\`bash
# Installation automatique
curl -sSL https://install.pi-hole.net | bash
\`\`\`

Pendant l'installation, choisis :
- Interface réseau (eth0 ou wlan0)
- Serveur DNS upstream (Google 8.8.8.8 ou Cloudflare 1.1.1.1)
- Listes de blocage (les défauts sont suffisants)

\`\`\`bash
# Vérifier le statut
pihole status

# Accéder au dashboard web
# http://ton-ip/admin
\`\`\``,
        },
        {
          title: 'Ajouter des enregistrements DNS locaux',
          content: `Configure des noms personnalisés pour ton réseau local :

\`\`\`bash
# Éditer les DNS locaux
sudo nano /etc/pihole/custom.list

# Ajouter des entrées (IP  nom)
192.168.1.100  serveur.local
192.168.1.101  nas.local
192.168.1.102  app.local
\`\`\`

\`\`\`bash
# Redémarrer le DNS
pihole restartdns

# Tester la résolution locale
nslookup serveur.local 127.0.0.1
# → 192.168.1.100
\`\`\`

Tous les appareils de ton réseau qui utilisent Pi-hole comme DNS pourront résoudre ces noms.`,
        },
        {
          title: 'Configurer le DHCP pour utiliser Pi-hole',
          content: `Pour que tous les appareils utilisent automatiquement Pi-hole :

**Option 1 : Configurer sur le routeur**
- Accède à l'interface de ton routeur
- Dans les paramètres DHCP, change le DNS par l'IP de Pi-hole

**Option 2 : Activer le DHCP de Pi-hole**

\`\`\`bash
# Dans le dashboard Pi-hole → Settings → DHCP
# Activer le serveur DHCP
# Désactiver le DHCP du routeur
\`\`\`

Vérifie que ça fonctionne :

\`\`\`bash
# Sur un client
nslookup google.com
# Server: [IP de Pi-hole]
\`\`\``,
        },
        {
          title: 'Analyser les statistiques DNS',
          content: `Pi-hole enregistre toutes les requêtes DNS :

\`\`\`bash
# Voir les stats en ligne de commande
pihole -c    # Chronometer (dashboard terminal)

# Top des domaines les plus requêtés
pihole -t    # Tail du log en temps réel

# Nombre de requêtes bloquées
pihole status
\`\`\`

Le dashboard web (\`http://ton-ip/admin\`) montre :
- Nombre total de requêtes
- Pourcentage de requêtes bloquées
- Top domaines autorisés / bloqués
- Requêtes par client

Tu as maintenant ton propre serveur DNS qui résout les noms, bloque les pubs et te donne une visibilité complète sur le trafic DNS de ton réseau.`,
        },
      ],
    },
    {
      title: 'Configurer DNSSEC et DNS-over-HTTPS',
      description: 'Sécurise tes requêtes DNS avec DNSSEC pour l\'authenticité et DoH pour la confidentialité.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Comprendre les menaces DNS',
          content: `Le DNS classique est vulnérable :

**DNS Spoofing / Cache Poisoning** :
- Un attaquant injecte de fausses réponses DNS
- Tu crois aller sur \`banque.com\` mais tu es redirigé vers un faux site

**DNS Sniffing** :
- Les requêtes DNS sont en clair (non chiffrées)
- Ton FAI ou un attaquant peut voir tous les sites que tu visites

Les solutions :
- **DNSSEC** → vérifie l'authenticité des réponses DNS (signatures cryptographiques)
- **DoH (DNS-over-HTTPS)** → chiffre les requêtes DNS dans du HTTPS
- **DoT (DNS-over-TLS)** → chiffre les requêtes DNS avec TLS`,
        },
        {
          title: 'Vérifier le support DNSSEC',
          content: `Teste si un domaine supporte DNSSEC :

\`\`\`bash
# Vérifier les signatures DNSSEC
dig google.com +dnssec +short

# Requête DNSKEY
dig google.com DNSKEY +short

# Vérification complète avec la chaîne de confiance
dig google.com +sigchase +trusted-key=/etc/trusted-key.key

# Tester avec un outil en ligne
# https://dnssec-analyzer.verisignlabs.com
\`\`\`

Si DNSSEC est actif, tu verras le flag \`ad\` (Authenticated Data) dans la réponse \`dig\`.`,
        },
        {
          title: 'Configurer DNS-over-HTTPS',
          content: `Configure DoH sur ton système avec \`cloudflared\` :

\`\`\`bash
# Installer cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Configurer comme proxy DNS
sudo cloudflared proxy-dns --port 5053 --upstream https://1.1.1.1/dns-query
\`\`\`

\`\`\`bash
# Tester le DoH local
dig @127.0.0.1 -p 5053 google.com

# Créer un service systemd
sudo nano /etc/systemd/system/cloudflared-dns.service
\`\`\`

\`\`\`ini
[Unit]
Description=DNS over HTTPS (Cloudflared)
After=network.target

[Service]
ExecStart=/usr/bin/cloudflared proxy-dns --port 5053 --upstream https://1.1.1.1/dns-query
Restart=on-failure

[Install]
WantedBy=multi-user.target
\`\`\``,
        },
        {
          title: 'Intégrer avec Pi-hole',
          content: `Configure Pi-hole pour utiliser DoH via cloudflared :

\`\`\`bash
# Activer et démarrer le service
sudo systemctl enable cloudflared-dns
sudo systemctl start cloudflared-dns

# Vérifier qu'il fonctionne
dig @127.0.0.1 -p 5053 google.com +short
\`\`\`

Dans Pi-hole (Settings → DNS) :
- Décoche tous les serveurs DNS upstream
- Ajoute un DNS personnalisé : \`127.0.0.1#5053\`

Vérifie le flux complet :

\`\`\`bash
# Test : la requête passe par Pi-hole → cloudflared → Cloudflare DoH
dig google.com
\`\`\`

Ton DNS est maintenant sécurisé : DNSSEC vérifie l'authenticité, et DoH chiffre tes requêtes. Personne ne peut voir ou modifier ton trafic DNS.`,
        },
      ],
    },
  ],

  'firewall-cest-quoi': [
    {
      title: 'Configurer UFW sur Linux',
      description: 'Apprends à configurer un pare-feu basique sur Ubuntu/Debian avec UFW (Uncomplicated Firewall).',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Installer et activer UFW',
          content: `UFW est l'outil de firewall le plus simple sur Ubuntu :

\`\`\`bash
# Installer UFW (pré-installé sur Ubuntu)
sudo apt install ufw -y

# Vérifier le statut
sudo ufw status

# Politique par défaut : bloquer l'entrant, autoriser le sortant
sudo ufw default deny incoming
sudo ufw default allow outgoing
\`\`\`

Avant d'activer le firewall, autorise SSH pour ne pas perdre l'accès :

\`\`\`bash
sudo ufw allow ssh
# ou spécifiquement
sudo ufw allow 22/tcp
\`\`\``,
        },
        {
          title: 'Ajouter des règles',
          content: `Ajoute les règles pour les services courants :

\`\`\`bash
# Autoriser HTTP et HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Autoriser un port spécifique
sudo ufw allow 3000/tcp

# Autoriser depuis une IP spécifique
sudo ufw allow from 192.168.1.100

# Autoriser un sous-réseau
sudo ufw allow from 192.168.1.0/24 to any port 22

# Bloquer une IP
sudo ufw deny from 203.0.113.50
\`\`\`

Active le firewall :

\`\`\`bash
sudo ufw enable
\`\`\``,
        },
        {
          title: 'Gérer les règles existantes',
          content: `Visualise et modifie tes règles :

\`\`\`bash
# Voir les règles avec numéros
sudo ufw status numbered

# Supprimer une règle par numéro
sudo ufw delete 3

# Supprimer une règle par description
sudo ufw delete allow 3000/tcp

# Réinitialiser toutes les règles
sudo ufw reset
\`\`\`

Résultat de \`ufw status verbose\` :

\`\`\`
Status: active
Default: deny (incoming), allow (outgoing)
To          Action    From
22/tcp      ALLOW     Anywhere
80/tcp      ALLOW     Anywhere
443/tcp     ALLOW     Anywhere
\`\`\``,
        },
        {
          title: 'Vérifier et tester le firewall',
          content: `Confirme que le firewall fonctionne correctement :

\`\`\`bash
# Voir les règles actives
sudo ufw status verbose

# Tester depuis un autre poste avec nmap
nmap -p 22,80,443,3000 ton-ip-serveur

# Voir les logs du firewall
sudo ufw logging on
sudo tail -f /var/log/ufw.log
\`\`\`

Les logs montrent les connexions bloquées :

\`\`\`
[UFW BLOCK] IN=eth0 SRC=203.0.113.50 DST=192.168.1.10
            PROTO=TCP DPT=8080
\`\`\`

Ton serveur est maintenant protégé par un pare-feu qui ne laisse passer que le trafic autorisé.`,
        },
      ],
    },
    {
      title: 'Règles iptables avancées',
      description: 'Maîtrise iptables, le firewall natif de Linux, pour créer des règles de filtrage précises et complexes.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Comprendre les chaînes iptables',
          content: `iptables filtre les paquets selon 3 chaînes principales :

\`\`\`
INPUT    → trafic entrant (vers la machine)
OUTPUT   → trafic sortant (depuis la machine)
FORWARD  → trafic qui traverse la machine (routeur)
\`\`\`

\`\`\`bash
# Voir les règles actuelles
sudo iptables -L -n -v

# Voir avec numéros de ligne
sudo iptables -L --line-numbers
\`\`\`

Chaque règle a une cible :
- \`ACCEPT\` → autoriser le paquet
- \`DROP\` → bloquer silencieusement
- \`REJECT\` → bloquer et envoyer une erreur
- \`LOG\` → journaliser le paquet`,
        },
        {
          title: 'Créer des règles de filtrage',
          content: `Exemples de règles iptables :

\`\`\`bash
# Politique par défaut : tout bloquer
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT

# Autoriser le loopback (localhost)
sudo iptables -A INPUT -i lo -j ACCEPT

# Autoriser les connexions établies
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Autoriser SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Autoriser HTTP/HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Autoriser le ping
sudo iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
\`\`\``,
        },
        {
          title: 'Rate limiting et protection',
          content: `Protège-toi contre les attaques avec du rate limiting :

\`\`\`bash
# Limiter les connexions SSH (3 par minute par IP)
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW \\
  -m recent --set --name SSH
sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW \\
  -m recent --update --seconds 60 --hitcount 4 --name SSH -j DROP

# Bloquer le scan de ports
sudo iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
sudo iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP

# Journaliser les paquets bloqués
sudo iptables -A INPUT -j LOG --log-prefix "IPTABLES-DROP: " --log-level 4
sudo iptables -A INPUT -j DROP
\`\`\``,
        },
        {
          title: 'Sauvegarder et restaurer',
          content: `Les règles iptables sont perdues au redémarrage. Sauvegarde-les :

\`\`\`bash
# Sauvegarder les règles actuelles
sudo iptables-save > /etc/iptables/rules.v4

# Restaurer les règles
sudo iptables-restore < /etc/iptables/rules.v4

# Pour que les règles persistent au redémarrage
sudo apt install iptables-persistent -y
# Les règles seront automatiquement chargées au boot
\`\`\`

Pour vérifier :

\`\`\`bash
# Redémarrer et vérifier
sudo reboot
sudo iptables -L -n
\`\`\`

Tu maîtrises maintenant iptables pour créer des règles de filtrage précises et protéger ton serveur.`,
        },
      ],
    },
    {
      title: 'Firewall d\'entreprise avec pfSense',
      description: 'Déploie et configure pfSense, un firewall open-source professionnel, dans un environnement virtualisé.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Installer pfSense dans une VM',
          content: `Télécharge et installe pfSense dans VirtualBox :

\`\`\`bash
# Télécharger l'ISO depuis pfsense.org
# Créer une VM avec :
# - 2 Go RAM
# - 20 Go disque
# - 2 interfaces réseau :
#   1. NAT (WAN - accès internet)
#   2. Host-Only (LAN - réseau interne)
\`\`\`

Pendant l'installation :
- Accepter les paramètres par défaut
- Choisir "Install pfSense"
- Sélectionner le disque
- Redémarrer après installation

L'interface web sera accessible sur l'adresse LAN (par défaut \`192.168.1.1\`).`,
        },
        {
          title: 'Configuration initiale',
          content: `Accède à l'interface web de pfSense :

\`\`\`
URL : https://192.168.1.1
Login : admin
Password : pfsense
\`\`\`

Configuration de base :
- **System → General Setup** : nom d'hôte, domaine, serveurs DNS
- **Interfaces → WAN** : vérifier la configuration DHCP
- **Interfaces → LAN** : configurer le sous-réseau (192.168.1.0/24)

Activer le DHCP pour le LAN :
- **Services → DHCP Server**
- Range : 192.168.1.100 - 192.168.1.200
- DNS : 192.168.1.1 (pfSense lui-même)`,
        },
        {
          title: 'Configurer les règles de firewall',
          content: `Dans **Firewall → Rules**, configure les règles :

**Règles LAN (trafic sortant des clients)** :
- Autoriser DNS (port 53) vers pfSense
- Autoriser HTTP/HTTPS (ports 80, 443) vers tout
- Autoriser SSH (port 22) vers le sous-réseau serveurs
- Bloquer tout le reste

**Règles WAN (trafic entrant d'internet)** :
- Bloquer tout par défaut (déjà fait)
- Autoriser le port 443 si tu héberges un service web

Pour créer une règle :
- Action : Pass / Block
- Interface : LAN ou WAN
- Protocol : TCP / UDP / ICMP
- Source : réseau ou IP
- Destination : réseau, IP ou alias
- Port : numéro ou range`,
        },
        {
          title: 'Fonctionnalités avancées',
          content: `pfSense offre des fonctionnalités professionnelles :

**Aliases** (groupes d'adresses) :
- Firewall → Aliases → Créer "Serveurs_Web" avec les IPs de tes serveurs
- Utilise cet alias dans tes règles au lieu de répéter les IPs

**NAT / Port Forwarding** :
- Firewall → NAT → Port Forward
- Redirige le port 443 du WAN vers ton serveur web interne

**VPN** :
- VPN → OpenVPN → Wizards
- Configure un accès VPN pour te connecter à distance

**Monitoring** :
- Status → System Logs → Firewall
- Tous les paquets bloqués/autorisés sont journalisés
- Status → Traffic Graph pour le monitoring en temps réel

Tu as maintenant un firewall de niveau entreprise qui protège tout ton réseau.`,
        },
      ],
    },
  ],

  'ssh-cest-quoi': [
    {
      title: 'Première connexion SSH',
      description: 'Apprends à te connecter à un serveur distant via SSH et à transférer des fichiers de manière sécurisée.',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Se connecter à un serveur',
          content: `La connexion SSH de base :

\`\`\`bash
# Syntaxe : ssh utilisateur@adresse-ip
ssh ubuntu@192.168.1.100

# Avec un port différent
ssh -p 2222 ubuntu@192.168.1.100

# Première connexion : accepter l'empreinte
# "Are you sure you want to continue connecting (yes/no)?"
# → Tape "yes"
\`\`\`

Une fois connecté, tu as un terminal sur le serveur distant. Tape \`exit\` pour te déconnecter.`,
        },
        {
          title: 'Transférer des fichiers avec SCP',
          content: `\`scp\` (Secure Copy) transfère des fichiers via SSH :

\`\`\`bash
# Copier un fichier local vers le serveur
scp fichier.txt ubuntu@192.168.1.100:/home/ubuntu/

# Copier depuis le serveur vers local
scp ubuntu@192.168.1.100:/var/log/syslog ./

# Copier un dossier entier (-r = récursif)
scp -r mon-projet/ ubuntu@192.168.1.100:/home/ubuntu/

# Avec un port différent
scp -P 2222 fichier.txt ubuntu@192.168.1.100:/tmp/
\`\`\`

Alternative plus performante avec \`rsync\` :

\`\`\`bash
# Synchroniser un dossier (ne copie que les changements)
rsync -avz mon-projet/ ubuntu@192.168.1.100:/home/ubuntu/mon-projet/
\`\`\``,
        },
        {
          title: 'Générer et utiliser des clés SSH',
          content: `L'authentification par clé est plus sécurisée que le mot de passe :

\`\`\`bash
# Générer une paire de clés
ssh-keygen -t ed25519 -C "mon-email@example.com"
# Appuie sur Entrée pour le chemin par défaut
# Choisis un passphrase (optionnel mais recommandé)

# Copier la clé publique sur le serveur
ssh-copy-id ubuntu@192.168.1.100

# Maintenant, connecte-toi sans mot de passe !
ssh ubuntu@192.168.1.100
\`\`\`

Tes clés sont stockées dans \`~/.ssh/\` :
- \`id_ed25519\` → clé privée (ne jamais la partager !)
- \`id_ed25519.pub\` → clé publique (à copier sur les serveurs)`,
        },
        {
          title: 'Configurer le fichier SSH config',
          content: `Simplifie tes connexions avec \`~/.ssh/config\` :

\`\`\`bash
# Créer/éditer le fichier config
nano ~/.ssh/config
\`\`\`

\`\`\`
Host serveur-web
    HostName 192.168.1.100
    User ubuntu
    Port 22
    IdentityFile ~/.ssh/id_ed25519

Host serveur-db
    HostName 192.168.1.200
    User admin
    Port 2222
\`\`\`

Maintenant tu peux te connecter simplement :

\`\`\`bash
ssh serveur-web     # au lieu de ssh ubuntu@192.168.1.100
ssh serveur-db      # au lieu de ssh -p 2222 admin@192.168.1.200
scp fichier.txt serveur-web:/tmp/
\`\`\``,
        },
      ],
    },
    {
      title: 'Tunnels SSH et port forwarding',
      description: 'Utilise les tunnels SSH pour accéder à des services distants de manière sécurisée et contourner les restrictions réseau.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Tunnel local (Local Port Forwarding)',
          content: `Redirige un port local vers un service distant via SSH :

\`\`\`bash
# Syntaxe : ssh -L port_local:destination:port_distant user@serveur
ssh -L 8080:localhost:80 ubuntu@192.168.1.100
\`\`\`

Cas concret : accéder à une base de données distante :

\`\`\`bash
# MySQL sur le serveur (port 3306) accessible en local
ssh -L 3306:localhost:3306 ubuntu@serveur-db

# Maintenant, connecte-toi à MySQL localement
mysql -h 127.0.0.1 -u root -p
\`\`\`

Le trafic est chiffré dans le tunnel SSH, même si MySQL ne l'est pas.`,
        },
        {
          title: 'Tunnel distant (Remote Port Forwarding)',
          content: `Expose un service local vers l'extérieur via un serveur :

\`\`\`bash
# Syntaxe : ssh -R port_distant:localhost:port_local user@serveur
ssh -R 8080:localhost:3000 ubuntu@serveur-public
\`\`\`

Cas concret : montrer ton app locale à un collègue :
- Ton app tourne sur \`localhost:3000\`
- Après le tunnel, elle est accessible sur \`serveur-public:8080\`

\`\`\`bash
# Sur le serveur, activer GatewayPorts dans /etc/ssh/sshd_config
GatewayPorts yes
sudo systemctl restart sshd
\`\`\``,
        },
        {
          title: 'Tunnel dynamique (proxy SOCKS)',
          content: `Crée un proxy SOCKS pour router tout ton trafic :

\`\`\`bash
# Créer un proxy SOCKS sur le port 1080
ssh -D 1080 ubuntu@serveur-distant

# En arrière-plan
ssh -D 1080 -f -N ubuntu@serveur-distant
\`\`\`

Configure ton navigateur pour utiliser le proxy :
- Proxy SOCKS : \`127.0.0.1\`
- Port : \`1080\`
- Type : SOCKS5

Tout ton trafic web passe maintenant par le serveur distant, chiffré dans le tunnel SSH. Utile sur un WiFi public.`,
        },
        {
          title: 'Automatiser avec autossh',
          content: `\`autossh\` maintient les tunnels SSH automatiquement :

\`\`\`bash
# Installer autossh
sudo apt install autossh -y

# Tunnel persistant qui se reconnecte automatiquement
autossh -M 0 -f -N -L 8080:localhost:80 ubuntu@serveur

# Créer un service systemd
sudo nano /etc/systemd/system/ssh-tunnel.service
\`\`\`

\`\`\`ini
[Unit]
Description=SSH Tunnel
After=network.target

[Service]
ExecStart=/usr/bin/autossh -M 0 -N -L 8080:localhost:80 ubuntu@serveur
Restart=always
User=ubuntu

[Install]
WantedBy=multi-user.target
\`\`\`

\`\`\`bash
sudo systemctl enable ssh-tunnel
sudo systemctl start ssh-tunnel
\`\`\`

Le tunnel sera maintenu en permanence, même après un redémarrage.`,
        },
      ],
    },
    {
      title: 'Sécuriser un serveur SSH',
      description: 'Durcis la configuration SSH de ton serveur pour résister aux attaques brute-force et aux intrusions.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Modifier la configuration sshd',
          content: `Édite la configuration du serveur SSH :

\`\`\`bash
sudo nano /etc/ssh/sshd_config
\`\`\`

Modifications recommandées :

\`\`\`bash
# Changer le port par défaut
Port 2222

# Désactiver l'authentification par mot de passe
PasswordAuthentication no
PubkeyAuthentication yes

# Désactiver le login root
PermitRootLogin no

# Limiter les utilisateurs autorisés
AllowUsers ubuntu deploy

# Timeout d'inactivité (5 minutes)
ClientAliveInterval 300
ClientAliveCountMax 0

# Limiter les tentatives
MaxAuthTries 3
\`\`\`

\`\`\`bash
# Tester la config avant de redémarrer
sudo sshd -t
# Si OK, redémarrer
sudo systemctl restart sshd
\`\`\``,
        },
        {
          title: 'Installer fail2ban pour SSH',
          content: `Protège contre les attaques brute-force :

\`\`\`bash
sudo apt install fail2ban -y

# Créer la config locale
sudo nano /etc/fail2ban/jail.local
\`\`\`

\`\`\`ini
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
\`\`\`

\`\`\`bash
# Redémarrer fail2ban
sudo systemctl restart fail2ban

# Voir les IPs bannies
sudo fail2ban-client status sshd

# Débannir une IP
sudo fail2ban-client set sshd unbanip 203.0.113.50
\`\`\``,
        },
        {
          title: 'Authentification 2FA avec Google Authenticator',
          content: `Ajoute une couche de sécurité avec le 2FA :

\`\`\`bash
sudo apt install libpam-google-authenticator -y

# Configurer pour ton utilisateur
google-authenticator
# Réponds "y" aux questions
# Scanne le QR code avec ton app (Google Authenticator, Authy)
\`\`\`

Édite la config PAM :

\`\`\`bash
sudo nano /etc/pam.d/sshd
# Ajouter en haut :
auth required pam_google_authenticator.so
\`\`\`

\`\`\`bash
# Dans sshd_config, activer le challenge-response
ChallengeResponseAuthentication yes
AuthenticationMethods publickey,keyboard-interactive

sudo systemctl restart sshd
\`\`\``,
        },
        {
          title: 'Monitoring et alertes',
          content: `Surveille les tentatives de connexion :

\`\`\`bash
# Voir les connexions récentes
last -20

# Voir les tentatives échouées
sudo grep "Failed password" /var/log/auth.log | tail -20

# Compter les attaques par IP
sudo grep "Failed password" /var/log/auth.log | \\
  awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -10
\`\`\`

Script d'alerte par email :

\`\`\`bash
#!/bin/bash
# alert-ssh.sh
FAILED=$(grep "Failed password" /var/log/auth.log | \\
  grep "$(date +%b\\ %d)" | wc -l)

if [ "$FAILED" -gt 10 ]; then
  echo "$FAILED tentatives SSH échouées aujourd'hui" | \\
    mail -s "Alerte SSH" admin@example.com
fi
\`\`\`

Ton serveur SSH est maintenant durci : port non-standard, clés uniquement, 2FA, fail2ban et monitoring.`,
        },
      ],
    },
  ],

  'vpn-cest-quoi': [
    {
      title: 'Utiliser un VPN avec OpenVPN',
      description: 'Installe le client OpenVPN et connecte-toi à un serveur VPN pour chiffrer ton trafic internet.',
      difficulty: 'debutant',
      link: '#',
      steps: [
        {
          title: 'Installer le client OpenVPN',
          content: `Installe OpenVPN sur ta machine :

\`\`\`bash
# Ubuntu/Debian
sudo apt update
sudo apt install openvpn -y

# Vérifier l'installation
openvpn --version
\`\`\`

Tu auras besoin d'un fichier de configuration \`.ovpn\` fourni par ton fournisseur VPN ou ton propre serveur. Ce fichier contient :
- L'adresse du serveur
- Les certificats
- Les paramètres de chiffrement`,
        },
        {
          title: 'Se connecter au VPN',
          content: `Connecte-toi avec le fichier de configuration :

\`\`\`bash
# Connexion avec un fichier .ovpn
sudo openvpn --config mon-vpn.ovpn

# En arrière-plan
sudo openvpn --config mon-vpn.ovpn --daemon

# Vérifier la connexion
curl ifconfig.me
# L'IP affichée devrait être celle du serveur VPN
\`\`\`

Pour vérifier que le VPN fonctionne :

\`\`\`bash
# Avant VPN
curl ifconfig.me    # → ton IP réelle

# Après VPN
curl ifconfig.me    # → IP du serveur VPN

# Vérifier le routage
ip route show
# Tu devrais voir une route par défaut via le tunnel VPN (tun0)
\`\`\``,
        },
        {
          title: 'Configurer le DNS leak protection',
          content: `Empêche les fuites DNS qui révèlent tes vrais DNS :

\`\`\`bash
# Vérifier s'il y a une fuite DNS
# Connecte-toi au VPN puis visite :
# https://dnsleaktest.com

# Forcer l'utilisation du DNS du VPN
# Ajoute dans le fichier .ovpn :
script-security 2
up /etc/openvpn/update-resolv-conf
down /etc/openvpn/update-resolv-conf
\`\`\`

\`\`\`bash
# Installer le script de mise à jour DNS
sudo apt install openvpn-systemd-resolved -y

# Alternative : forcer manuellement le DNS
sudo resolvectl dns tun0 10.8.0.1
\`\`\``,
        },
        {
          title: 'Gérer la connexion VPN',
          content: `Commandes utiles pour gérer le VPN :

\`\`\`bash
# Voir le statut de la connexion
ip addr show tun0

# Voir les logs
sudo journalctl -u openvpn -f

# Déconnecter le VPN
sudo killall openvpn

# Connexion automatique au démarrage
sudo cp mon-vpn.ovpn /etc/openvpn/client.conf
sudo systemctl enable openvpn@client
sudo systemctl start openvpn@client
\`\`\`

\`\`\`bash
# Tester le kill switch (si le VPN tombe, pas d'internet)
sudo ufw default deny outgoing
sudo ufw allow out on tun0
sudo ufw allow out to [IP-serveur-VPN] port 1194 proto udp
sudo ufw enable
\`\`\`

Tu navigues maintenant avec un VPN actif, un DNS protégé et un kill switch en place.`,
        },
      ],
    },
    {
      title: 'Monter son propre serveur VPN avec WireGuard',
      description: 'Déploie un serveur VPN WireGuard sur un VPS pour avoir ton propre tunnel chiffré personnel.',
      difficulty: 'intermediaire',
      link: '#',
      steps: [
        {
          title: 'Installer WireGuard sur le serveur',
          content: `WireGuard est le protocole VPN le plus moderne et performant :

\`\`\`bash
# Installer WireGuard
sudo apt update
sudo apt install wireguard -y

# Générer les clés du serveur
wg genkey | tee /etc/wireguard/server_private.key | wg pubkey > /etc/wireguard/server_public.key

# Sécuriser les fichiers
chmod 600 /etc/wireguard/server_private.key
\`\`\`

Note les clés :

\`\`\`bash
cat /etc/wireguard/server_private.key
cat /etc/wireguard/server_public.key
\`\`\``,
        },
        {
          title: 'Configurer le serveur',
          content: `Crée le fichier de configuration serveur :

\`\`\`bash
sudo nano /etc/wireguard/wg0.conf
\`\`\`

\`\`\`ini
[Interface]
PrivateKey = [CLÉ_PRIVÉE_SERVEUR]
Address = 10.0.0.1/24
ListenPort = 51820
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = [CLÉ_PUBLIQUE_CLIENT]
AllowedIPs = 10.0.0.2/32
\`\`\`

\`\`\`bash
# Activer le forwarding IP
echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Ouvrir le port dans le firewall
sudo ufw allow 51820/udp
\`\`\``,
        },
        {
          title: 'Configurer le client',
          content: `Sur ta machine locale :

\`\`\`bash
# Installer WireGuard
sudo apt install wireguard -y

# Générer les clés du client
wg genkey | tee client_private.key | wg pubkey > client_public.key
\`\`\`

Crée la config client :

\`\`\`bash
sudo nano /etc/wireguard/wg0.conf
\`\`\`

\`\`\`ini
[Interface]
PrivateKey = [CLÉ_PRIVÉE_CLIENT]
Address = 10.0.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = [CLÉ_PUBLIQUE_SERVEUR]
Endpoint = [IP_DU_VPS]:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
\`\`\`

N'oublie pas d'ajouter la clé publique du client dans la config serveur (section \`[Peer]\`).`,
        },
        {
          title: 'Lancer et tester',
          content: `Démarre le VPN des deux côtés :

\`\`\`bash
# Sur le serveur
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0

# Sur le client
sudo wg-quick up wg0

# Vérifier la connexion
sudo wg show

# Tester
ping 10.0.0.1          # ping le serveur via le tunnel
curl ifconfig.me       # IP du VPS
\`\`\`

\`\`\`bash
# Voir les stats de la connexion
sudo wg show
# transfer: 1.23 MiB received, 456.78 KiB sent
# latest handshake: 12 seconds ago

# Déconnecter
sudo wg-quick down wg0
\`\`\`

Tu as maintenant ton propre VPN personnel, performant et sécurisé avec WireGuard.`,
        },
      ],
    },
    {
      title: 'VPN site-à-site avec IPsec',
      description: 'Configure un tunnel VPN IPsec entre deux réseaux distants pour les interconnecter de manière sécurisée.',
      difficulty: 'difficile',
      link: '#',
      steps: [
        {
          title: 'Architecture du VPN site-à-site',
          content: `Un VPN site-à-site connecte deux réseaux LAN distants :

\`\`\`
Site A (Paris)                    Site B (Lyon)
192.168.1.0/24                   192.168.2.0/24
      |                                |
  [Routeur A] ====== IPsec ====== [Routeur B]
  IP: 1.1.1.1                    IP: 2.2.2.2
\`\`\`

Les machines du Site A peuvent communiquer avec celles du Site B comme si elles étaient sur le même réseau.

\`\`\`bash
# Installer strongSwan (implémentation IPsec)
sudo apt update
sudo apt install strongswan strongswan-pki -y
\`\`\``,
        },
        {
          title: 'Générer les certificats',
          content: `Crée une PKI (Public Key Infrastructure) :

\`\`\`bash
# Créer le dossier PKI
mkdir -p ~/pki/{cacerts,certs,private}

# Générer la clé de l'autorité de certification (CA)
pki --gen --type rsa --size 4096 --outform pem > ~/pki/private/ca-key.pem

# Créer le certificat CA
pki --self --ca --lifetime 3650 --in ~/pki/private/ca-key.pem \\
    --type rsa --dn "CN=VPN Root CA" --outform pem > ~/pki/cacerts/ca-cert.pem

# Générer la clé du serveur A
pki --gen --type rsa --size 4096 --outform pem > ~/pki/private/site-a-key.pem

# Créer le certificat du serveur A
pki --pub --in ~/pki/private/site-a-key.pem --type rsa |
    pki --issue --lifetime 1825 --cacert ~/pki/cacerts/ca-cert.pem \\
    --cakey ~/pki/private/ca-key.pem --dn "CN=1.1.1.1" \\
    --san 1.1.1.1 --flag serverAuth --outform pem > ~/pki/certs/site-a-cert.pem
\`\`\`

Copie les certificats dans \`/etc/ipsec.d/\`.`,
        },
        {
          title: 'Configurer strongSwan',
          content: `Configure IPsec sur le Site A (\`/etc/ipsec.conf\`) :

\`\`\`
config setup
    charondebug="ike 2, knl 2, cfg 2"

conn site-to-site
    type=tunnel
    auto=start
    keyexchange=ikev2
    authby=pubkey

    left=1.1.1.1
    leftsubnet=192.168.1.0/24
    leftcert=site-a-cert.pem
    leftid=@site-a

    right=2.2.2.2
    rightsubnet=192.168.2.0/24
    rightid=@site-b

    ike=aes256-sha256-modp2048!
    esp=aes256-sha256!
    dpdaction=restart
    dpddelay=30s
\`\`\`

Sur le Site B, inverse les paramètres \`left\` et \`right\`.`,
        },
        {
          title: 'Activer et vérifier le tunnel',
          content: `Lance le tunnel sur les deux sites :

\`\`\`bash
# Sur les deux routeurs
sudo systemctl restart strongswan
sudo ipsec up site-to-site

# Vérifier le statut du tunnel
sudo ipsec status
sudo ipsec statusall

# Résultat attendu :
# site-to-site[1]: ESTABLISHED
# site-to-site{1}: 192.168.1.0/24 === 192.168.2.0/24
\`\`\`

Tester la connectivité :

\`\`\`bash
# Depuis une machine du Site A
ping 192.168.2.10    # Machine du Site B

# Vérifier que le trafic passe par le tunnel
sudo tcpdump -i eth0 esp
# Tu devrais voir des paquets ESP (chiffrés)
\`\`\`

Les deux sites sont maintenant interconnectés de manière sécurisée via un tunnel IPsec chiffré.`,
        },
      ],
    },
  ],
};
