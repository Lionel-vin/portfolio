import { useState, useEffect } from 'react'
import ChromaGrid from './ChromaGrid'
import ciscoCertImg from '../assets/cert-cisco.png'
import pixCertImg from '../assets/cert-pix.png'

const certifications = [
  {
    image: ciscoCertImg,
    isLogo: true,
    title: 'Introduction à la cybersécurité',
    subtitle: 'Cisco Networking Academy',
    handle: 'Sep 2025',
    description: null,
    borderColor: '#0ea5e9',
    gradient: 'linear-gradient(145deg, #0c4a6e, #0a0a0a)',
  },
  {
    image: pixCertImg,
    isLogo: true,
    title: 'Certification Pix',
    subtitle: 'GIP Pix · Lycée André Malraux',
    handle: 'Mar 2026',
    description: null,
    borderColor: '#8b5cf6',
    gradient: 'linear-gradient(145deg, #2e1065, #0a0a0a)',
  },
]

function Certifications() {
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
          » Mes Certifications
        </span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', minHeight: '380px' }}>
        <ChromaGrid
          items={certifications}
          radius={350}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </section>
  )
}

export default Certifications