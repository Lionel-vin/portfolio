import { useState, useEffect } from 'react'
import ChromaGrid from './ChromaGrid'
import { FaServer, FaHeadset, FaGlobe, FaProjectDiagram, FaRocket, FaGraduationCap } from 'react-icons/fa'

const competences = [
  {
    image: null,
    icon: FaServer,
    isLogo: false,
    title: 'Gérer le patrimoine informatique',
    subtitle: 'La Voix du Nord · 2024',
    handle: 'Patrimoine',
    isStatut: false,
    description: 'Recensement des ressources numériques, manipulation de flux avec Mirth Connect, compréhension d\'une architecture applicative et travail avec des standards d\'échanges de données.',
    borderColor: '#6366f1',
    gradient: 'linear-gradient(145deg, #1e1b4b, #0a0a0a)',
  },
  {
    image: null,
    icon: FaHeadset,
    isLogo: false,
    title: 'Répondre aux incidents et demandes',
    subtitle: 'La Voix du Nord · Infogène',
    handle: 'Support',
    isStatut: false,
    description: 'Correction de bugs sur lavf.fr, adaptation d\'applications selon les besoins utilisateurs, tests de fonctionnalités et développement du chatbot.',
    borderColor: '#f59e0b',
    gradient: 'linear-gradient(145deg, #451a03, #0a0a0a)',
  },
  {
    image: null,
    icon: FaGlobe,
    isLogo: false,
    title: 'Développer la présence en ligne',
    subtitle: 'La Voix du Nord · 2024',
    handle: 'Web',
    isStatut: false,
    description: 'Développement du site lavf.fr en PHP, exploitation de données externes, amélioration du contenu web et automatisation de la récupération d\'informations.',
    borderColor: '#10b981',
    gradient: 'linear-gradient(145deg, #064e3b, #0a0a0a)',
  },
  {
    image: null,
    icon: FaProjectDiagram,
    isLogo: false,
    title: 'Travailler en mode projet',
    subtitle: 'La Voix du Nord · Infogène',
    handle: 'Projet',
    isStatut: false,
    description: 'Compréhension des objectifs, travail en équipe chez Infogène, suivi de consignes techniques et avancement par étapes : dev → test → amélioration.',
    borderColor: '#06b6d4',
    gradient: 'linear-gradient(145deg, #164e63, #0a0a0a)',
  },
  {
    image: null,
    icon: FaRocket,
    isLogo: false,
    title: 'Mettre à disposition un service',
    subtitle: 'La Voix du Nord · Infogène',
    handle: 'Déploiement',
    isStatut: false,
    description: 'Développement d\'applications fonctionnelles, tests de services, rendu d\'outils utilisables et participation à une mise en production partielle.',
    borderColor: '#8b5cf6',
    gradient: 'linear-gradient(145deg, #2e1065, #0a0a0a)',
  },
  {
    image: null,
    icon: FaGraduationCap,
    isLogo: false,
    title: 'Organiser son développement pro',
    subtitle: 'Infogène · 2025',
    handle: 'Formation',
    isStatut: false,
    description: 'Apprentissage de nouvelles technos (React, Python, Qdrant), compréhension des concepts IA, montée en compétence en autonomie et construction d\'un profil full stack / IA.',
    borderColor: '#ec4899',
    gradient: 'linear-gradient(145deg, #500724, #0a0a0a)',
  },
]

function Competences_E5() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative py-24 px-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
         paddingBottom: '120px' 
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
          » Compétences E5
        </span>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '500px' }}>
        <ChromaGrid
          items={competences}
          radius={350}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  )
}

export default Competences_E5