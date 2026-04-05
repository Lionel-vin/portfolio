import { useState, useEffect } from 'react'
import ChromaGrid from './ChromaGrid'

const articles = [
  {
    image: 'https://logo.clearbit.com/journaldunet.com',
    isLogo: true,
    title: "Squarespace et l'IA : créer un site pro sans coder",
    subtitle: 'journaldunet.com',
    handle: 'Nov 2025',
    lien: 'https://www.journaldunet.com/developpeur/1545701-comment-creer-un-site-pro-sans-coder-grace-a-squarespace-et-l-ia/',
    description: "Squarespace est une plateforme tout-en-un qui permet à n'importe qui de créer un site professionnel sans savoir coder, intégrant design, hébergement et e-commerce.",
    borderColor: '#6366f1',
    gradient: 'linear-gradient(145deg, #1e1b4b, #0a0a0a)',
  },
  {
    image: 'https://logo.clearbit.com/developpez.com',
    isLogo: true,
    title: 'Google Maps intègre Gemini sur Android et iOS',
    subtitle: 'developpez.com',
    handle: 'Nov 2025',
    lien: 'https://intelligence-artificielle.developpez.com/actu/377479/Google-Maps-ajoute-l-integration-de-l-IA-Gemini-sur-Android-et-iOS-permettant-ainsi-des-conversations-mains-libres-sur-votre-navigation-ou-les-points-de-repere-environnants/',
    description: "Google Maps intègre l'IA Gemini pour permettre des conversations mains libres sur la navigation et les points de repère environnants.",
    borderColor: '#10b981',
    gradient: 'linear-gradient(145deg, #064e3b, #0a0a0a)',
  },
  {
    image: 'https://logo.clearbit.com/developpez.com',
    isLogo: true,
    title: 'Des avatars IA de proches décédés',
    subtitle: 'developpez.com',
    handle: 'Nov 2025',
    lien: 'https://intelligence-artificielle.developpez.com/actu/377660/Black-Mirror-devient-realite-une-nouvelle-application-permet-aux-utilisateurs-de-parler-a-des-avatars-IA-de-leurs-proches-decedes-signe-inquietant-d-une-industrie-numerique-de-l-au-dela-en-pleine-expansion/',
    description: "Une startup dévoile une app permettant de parler à des avatars IA de proches décédés, rappelant fortement un épisode de Black Mirror.",
    borderColor: '#ef4444',
    gradient: 'linear-gradient(145deg, #450a0a, #0a0a0a)',
  },
  {
    image: 'https://logo.clearbit.com/ia-news.fr',
    isLogo: true,
    title: "Clovis : l'IA générative qui protège les données",
    subtitle: 'ia-news.fr',
    handle: 'Déc 2025',
    lien: 'https://www.ia-news.fr/lancement-de-clovis-lia-generative-qui-protege-les-donnees-des-entreprises/',
    description: "Lancement de Clovis, une IA générative conçue pour protéger les données sensibles des entreprises.",
    borderColor: '#f59e0b',
    gradient: 'linear-gradient(145deg, #451a03, #0a0a0a)',
  },
  {
    image: 'https://logo.clearbit.com/ia-news.fr',
    isLogo: true,
    title: 'Bouygues Telecom et Prisme.ai : Studio IA',
    subtitle: 'ia-news.fr',
    handle: 'Déc 2025',
    lien: 'https://www.ia-news.fr/bouygues-telecom-choisit-prisme-ai-pour-deployer-son-studio-ia-et-accelerer-sa-transformation-agentique/',
    description: "Prisme.ai s'associe à Bouygues Telecom pour déployer un Studio IA unifié permettant aux équipes de créer et piloter leurs propres agents IA.",
    borderColor: '#06b6d4',
    gradient: 'linear-gradient(145deg, #164e63, #0a0a0a)',
  },
  {
    image: 'https://logo.clearbit.com/ia-news.fr',
    isLogo: true,
    title: 'Couchbase AI Services en disponibilité générale',
    subtitle: 'ia-news.fr',
    handle: 'Déc 2025',
    lien: 'https://www.ia-news.fr/couchbase-ai-services-permet-aux-entreprises-de-maitriser-lia-agentique/',
    description: "Couchbase lance une suite complète pour concevoir, déployer et encadrer des applications d'IA agentique en production.",
    borderColor: '#8b5cf6',
    gradient: 'linear-gradient(145deg, #2e1065, #0a0a0a)',
  },
  {
    image: 'https://logo.clearbit.com/ia-news.fr',
    isLogo: true,
    title: 'Provence.ai décroche la certification ISO 27001',
    subtitle: 'ia-news.fr',
    handle: 'Déc 2025',
    lien: 'https://www.ia-news.fr/provence-ai-decroche-la-certification-iso-27001/',
    description: "Provence.ai obtient la certification ISO 27001, valorisant son engagement en matière de sécurité de l'information.",
    borderColor: '#ec4899',
    gradient: 'linear-gradient(145deg, #500724, #0a0a0a)',
  },
]

function Veille() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative min-h-screen py-24 px-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          fontFamily: "'Jersey 10', serif",
          fontSize: '14px',
          color: 'var(--accent)',
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          » Ma Veille Technologique
        </span>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '500px' }}>
        <ChromaGrid
          items={articles}
          radius={350}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  )
}

export default Veille