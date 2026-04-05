import { useState, useEffect } from 'react'
import ChromaGrid from './ChromaGrid'
import gsbExtranetImg from '../assets/gsb-extranet.png'
import gsbMobileImg from '../assets/gsb-mobile.png'

const projets = [
  {
    image: gsbExtranetImg,
    isLogo: false,
    title: 'GSB Extranet',
    subtitle: 'PHP · MVC',
    handle: '⏳ En cours',
    isStatut: true,
    description: 'Permet à des médecins et vendeurs de médicaments de se connecter et gérer les produits.',
    borderColor: '#6366f1',
    gradient: 'linear-gradient(145deg, #6366f1, #0a0a0a)',
  },
  {
    image: gsbMobileImg,
    isLogo: false,
    title: 'GSB Mobile',
    subtitle: 'React Native · PHP',
    handle: '⏳ En cours',
    isStatut: true,
    description: 'Permet à des conducteurs de s\'authentifier et saisir les kilomètres parcourus.',
    borderColor: '#8b5cf6',
    gradient: 'linear-gradient(145deg, #8b5cf6, #0a0a0a)',
  },
]

function Projets() {
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
          » Mes Projets
        </span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', minHeight: '420px' }}>
        <ChromaGrid
          items={projets}
          radius={350}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  )
}

export default Projets