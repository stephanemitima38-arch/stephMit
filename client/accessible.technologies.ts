/**
 * Configuration des technologies accessibles pour les analogies
 * Ciblées pour les étudiants, enseignants et chercheurs
 */

export const accessibleTechnologies = {
  smartphones: {
    name: "Smartphones",
    examples: [
      "Système d'exploitation (iOS/Android)",
      "Applications mobiles",
      "Notifications et alertes",
      "Batterie et gestion d'énergie",
      "Capteurs (GPS, accéléromètre, gyroscope)",
      "Mémoire cache",
      "Synchronisation cloud",
      "Permissions d'accès",
      "Écran tactile et gestes",
      "Stockage local vs cloud",
    ],
    description: "Les smartphones sont omniprésents dans la vie des étudiants et chercheurs",
  },
  
  computers: {
    name: "Ordinateurs (PC/Mac)",
    examples: [
      "Processeur et CPU",
      "Mémoire RAM",
      "Disque dur/SSD",
      "Système d'exploitation",
      "Programmes et applications",
      "Multitâche et processus",
      "Fichiers et dossiers",
      "Réseau et connectivité",
      "Mise en cache",
      "Gestion des ressources",
    ],
    description: "Les ordinateurs sont les outils principaux de travail académique",
  },
  
  webBrowsers: {
    name: "Navigateurs Web",
    examples: [
      "Historique de navigation",
      "Cookies et données de session",
      "Cache du navigateur",
      "Onglets et fenêtres",
      "Favoris/Signets",
      "Barre de recherche",
      "Autocomplétion",
      "Plugins et extensions",
      "Mode incognito/privé",
      "Synchronisation entre appareils",
    ],
    description: "Les navigateurs web sont essentiels pour la recherche académique",
  },
  
  socialMedia: {
    name: "Réseaux Sociaux",
    examples: [
      "Fil d'actualité et algorithme de recommandation",
      "Notifications et engagement",
      "Profil utilisateur",
      "Partage et viralité",
      "Commentaires et interactions",
      "Hashtags et recherche",
      "Followers/Amis",
      "Stories et contenu éphémère",
      "Likes et réactions",
      "Modération de contenu",
    ],
    description: "Les réseaux sociaux influencent la communication académique",
  },
  
  bluetoothDevices: {
    name: "Appareils Bluetooth",
    examples: [
      "Appairage et connexion",
      "Portée de transmission",
      "Batterie et autonomie",
      "Synchronisation audio",
      "Interférence et signal",
      "Reconnexion automatique",
      "Qualité du signal",
      "Latence de transmission",
      "Codecs audio",
      "Gestion de la puissance",
    ],
    description: "Les écouteurs et appareils Bluetooth sont courants chez les étudiants",
  },
  
  cloudServices: {
    name: "Services Cloud",
    examples: [
      "Synchronisation de données",
      "Stockage distant",
      "Accès depuis n'importe où",
      "Sauvegarde automatique",
      "Partage de fichiers",
      "Collaboration en temps réel",
      "Authentification et sécurité",
      "Quota de stockage",
      "Versions et historique",
      "Chiffrement des données",
    ],
    description: "Le cloud est essentiel pour la collaboration académique",
  },
  
  emailSystems: {
    name: "Systèmes Email",
    examples: [
      "Boîte de réception et organisation",
      "Spam et filtres",
      "Pièces jointes",
      "Archivage et suppression",
      "Recherche et indexation",
      "Notifications",
      "Signatures et modèles",
      "Listes de diffusion",
      "Chiffrement des messages",
      "Récupération des messages supprimés",
    ],
    description: "L'email est le moyen de communication principal en milieu académique",
  },
  
  videoConferencing: {
    name: "Vidéoconférence",
    examples: [
      "Flux vidéo et audio",
      "Latence et délai",
      "Bande passante",
      "Partage d'écran",
      "Enregistrement de session",
      "Chat et messages",
      "Salles d'attente",
      "Permissions et contrôle",
      "Qualité adaptative",
      "Arrière-plans virtuels",
    ],
    description: "La vidéoconférence est cruciale pour l'enseignement à distance",
  },
};

export type AccessibleTechnologyCategory = keyof typeof accessibleTechnologies;

/**
 * Prompt système amélioré pour générer des analogies accessibles
 */
export const accessibleAnalogySystemPrompt = `Tu es un expert en psychologie et en technologie, spécialisé dans la création d'analogies pour les étudiants, enseignants et chercheurs.

Ton objectif est de rendre les concepts psychologiques TRÈS ACCESSIBLES en les comparant à des technologies que TOUT LE MONDE utilise au quotidien :
- Smartphones (iOS/Android)
- Ordinateurs (PC/Mac)
- Navigateurs web (Chrome, Firefox, Safari)
- Réseaux sociaux (Instagram, Twitter, TikTok, Facebook)
- Écouteurs Bluetooth et appareils connectés
- Services cloud (Google Drive, Dropbox, OneDrive)
- Email
- Vidéoconférence (Zoom, Teams, Meet)

Quand on te donne un concept psychologique, tu dois:
1. Expliquer le concept psychologique de manière SIMPLE et CLAIRE
2. Identifier UNE analogie technologique du quotidien qui RESSEMBLE EXACTEMENT au concept
3. Expliquer l'analogie en détail avec des exemples CONCRETS que les étudiants connaissent
4. Montrer les PARALLÈLES PRÉCIS entre la psychologie et la technologie
5. Ajouter des IMPLICATIONS PRATIQUES pour l'apprentissage ou la recherche

IMPORTANT:
- Les analogies doivent être INTUITIVES et ÉVIDENTES pour un étudiant
- Utilise des exemples que TOUT LE MONDE a expérimentés
- Évite les concepts technologiques obscurs ou trop avancés
- Rends l'analogie MÉMORABLE et FACILE À COMPRENDRE
- Ajoute des cas d'usage ACADÉMIQUES concrets

Réponds TOUJOURS en JSON avec cette structure exacte:
{
  "concept": "nom du concept psychologique",
  "description": "explication simple du concept (2-3 phrases)",
  "techAnalogy": "nom de l'analogie technologique du quotidien",
  "techDescription": "explication détaillée avec exemples concrets",
  "sophistication": "parallèles précis et implications pratiques pour les étudiants/chercheurs"
}`;

/**
 * Prompt utilisateur amélioré pour les analogies accessibles
 */
export function generateAccessibleAnalogyPrompt(concept: string, context?: string): string {
  const technologies = Object.values(accessibleTechnologies)
    .map(tech => `- ${tech.name}: ${tech.examples.join(", ")}`)
    .join("\n");

  return `Génère une analogie TRÈS ACCESSIBLE pour le concept psychologique suivant:
${concept}${context ? `\n\nContexte académique: ${context}` : ""}

Technologies du quotidien à utiliser comme analogies:
${technologies}

RÈGLES IMPORTANTES:
1. Choisis UNE SEULE technologie du quotidien que les étudiants utilisent TOUS LES JOURS
2. L'analogie doit être ÉVIDENTE et FACILE À COMPRENDRE
3. Utilise des exemples CONCRETS que les étudiants ont vécus
4. Montre comment cette analogie aide à COMPRENDRE le concept psychologique
5. Ajoute des implications PRATIQUES pour l'apprentissage ou la recherche

Assure-toi que:
- L'analogie est SIMPLE et INTUITIVE
- Elle utilise des technologies ACCESSIBLES (pas d'IA avancée, pas de blockchain, etc.)
- Elle est PERTINENTE pour les étudiants et chercheurs
- Elle aide à MÉMORISER et COMPRENDRE le concept psychologique`;
}
