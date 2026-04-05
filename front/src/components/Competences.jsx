import { useState, useEffect } from 'react'
import { LogoLoop } from './LogoLoop'
import { getProfil, reformuler } from '../services/api'
import {
  FaReact, FaPython, FaPhp, FaDocker, FaLinux, FaJs
} from 'react-icons/fa'
import {
  SiMongodb, SiMysql, SiC, SiPhpmyadmin, SiDotnet
} from 'react-icons/si'
import { VscTools } from 'react-icons/vsc'

const ICONES = {
  'React':        <FaReact size={38} color="#61dafb" />,
  'JavaScript':   <FaJs size={38} color="#f7df1e" />,
  'Python':       <FaPython size={38} color="#3776ab" />,
  'PHP':          <FaPhp size={38} color="#777bb4" />,
  'C':            <SiC size={38} color="#a8b9cc" />,
  'C#':           <SiDotnet size={38} color="#512bd4" />,
  'SQL':          <SiMysql size={38} color="#4479a1" />,
  'Mirth Connect':<VscTools size={38} color="#ff6b6b" />,
  'Linux':        <FaLinux size={38} color="#fcc624" />,
  'MongoDB':      <SiMongodb size={38} color="#47a248" />,
  'PhpMyAdmin':   <SiPhpmyadmin size={38} color="#6c78af" />,
  'Docker':       <FaDocker size={38} color="#2496ed" />,
}

// Cache TTL 1 minute — en dehors du composant
const cache = {}

const getCommentaire = async (nom, commentaire) => {
  const now = Date.now()
  if (cache[nom] && now - cache[nom].timestamp < 60000) {
    return cache[nom].texte
  }
  const result = await reformuler(commentaire)
  cache[nom] = { texte: result.reponse, timestamp: now }
  return result.reponse
}

function Competences({ onSurvol, onQuitter }) {
  const [profil, setProfil] = useState(null)
  const [hoveredCompetence, setHoveredCompetence] = useState(null)
  const [hoveredOutil, setHoveredOutil] = useState(null)

  useEffect(() => {
    getProfil().then(data => setProfil(data))
  }, [])

  if (!profil || !profil.competences) return null

  const competences = [
    ...profil.competences.frontend,
    ...profil.competences.backend,
  ]
  const outils = profil.competences.outils

  const buildRenderItem = (liste, hoveredKey, setHoveredKey) => (item, key) => {
    const parts = key.split('-')
    const index = parseInt(parts[parts.length - 1]) % liste.length
    const data = liste[index]
    if (!data) return null

    const isHovered = hoveredKey === key

    return (
      <div
        onMouseEnter={async () => {
          setHoveredKey(key)
          try {
            const texte = await getCommentaire(data.nom, data.commentaire)
            onSurvol(texte)
          } catch {
            onSurvol(data.commentaire)
          }
        }}
        onMouseLeave={() => {
          setHoveredKey(null)
          onQuitter()
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'default',
          padding: '12px 16px',
          borderRadius: '12px',
          transition: 'background-color 0.3s, transform 0.2s',
          backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
          border: isHovered ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {ICONES[data.nom] ?? <VscTools size={38} color="#a0a0a0" />}
        <span style={{
          fontFamily: "'Jersey 10', serif",
          fontSize: '13px',
          color: isHovered ? 'var(--accent)' : 'var(--text-secondary)',
          transition: 'color 0.3s'
        }}>
          {data.nom}
        </span>
      </div>
    )
  }

  return (
    <section
      id="competences"
      className="relative py-24 px-8"
      style={{ overflow: 'hidden' }}
    >
      {/* Titre */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{
          fontFamily: "'Jersey 10', serif",
          fontSize: '14px',
          color: 'var(--accent)',
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          » Mes Compétences
        </span>
      </div>

      {/* Langages & Frameworks */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontFamily: "'Jersey 10', serif",
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '20px',
          paddingLeft: '8px'
        }}>
          Langages & Frameworks
        </p>
        <LogoLoop
          logos={competences.map(c => ({ node: ICONES[c.nom] ?? <VscTools size={38} />, ariaLabel: c.nom }))}
          speed={60}
          direction="left"
          logoHeight={60}
          gap={56}
          pauseOnHover
          fadeOut
          fadeOutColor="#0a0a0a"
          scaleOnHover
          renderItem={buildRenderItem(competences, hoveredCompetence, setHoveredCompetence)}
        />
      </div>

      {/* Outils */}
      <div>
        <p style={{
          fontFamily: "'Jersey 10', serif",
          fontSize: '16px',
          color: 'var(--text-secondary)',
          marginBottom: '20px',
          paddingLeft: '8px'
        }}>
          Outils & Environnements
        </p>
        <LogoLoop
          logos={outils.map(o => ({ node: ICONES[o.nom] ?? <VscTools size={38} />, ariaLabel: o.nom }))}
          speed={60}
          direction="right"
          logoHeight={60}
          gap={56}
          pauseOnHover
          fadeOut
          fadeOutColor="#0a0a0a"
          scaleOnHover
          renderItem={buildRenderItem(outils, hoveredOutil, setHoveredOutil)}
        />
      </div>

    </section>
  )
}

export default Competences