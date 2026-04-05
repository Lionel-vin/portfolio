import { useState, useEffect } from 'react'
import talkingImg from '../assets/talking.png'
import Squares from './Squares'

const SLIDES = [
  "Bonjour! Vous avez trouvé ce portfolio.\nCe n'est peut-être pas un hasard.\nJe suis Lionel — et j'ai des choses à vous montrer.",
  "Développeur. Curieux. Perfectionniste.\nJe suis quelqu'un qui voit le monde\ncomme un problème à résoudre élégamment.",
  "Maintenant que vous êtes là,\nautant en profiter.\nExplorez, posez des questions, faites connaissance.\nCe serait dommage de repartir sans avoir discuté. "
]

function Intro({ onTermine }) {
  const [slideActuel, setSlideActuel] = useState(0)
  const [texteAffiche, setTexteAffiche] = useState('')
  const [indexLettre, setIndexLettre] = useState(0)
  const [termine, setTermine] = useState(false)

  // Effet machine à écrire
  useEffect(() => {
    setTexteAffiche('')
    setIndexLettre(0)
    setTermine(false)
  }, [slideActuel])

  useEffect(() => {
    const texteComplet = SLIDES[slideActuel]
    if (indexLettre < texteComplet.length) {
      const timer = setTimeout(() => {
        setTexteAffiche(prev => prev + texteComplet[indexLettre])
        setIndexLettre(prev => prev + 1)
      }, 35)
      return () => clearTimeout(timer)
    } else {
      setTermine(true)
    }
  }, [indexLettre, slideActuel])

  const handleClic = () => {
    // Si le texte est pas encore fini → affiche tout d'un coup
    if (!termine) {
      setTexteAffiche(SLIDES[slideActuel])
      setIndexLettre(SLIDES[slideActuel].length)
      setTermine(true)
      return
    }

    // Si c'est le dernier slide → lance le portfolio
    if (slideActuel === SLIDES.length - 1) {
      onTermine()
      return
    }

    // Sinon → slide suivant
    setSlideActuel(prev => prev + 1)
  }

  return (
    <div
      onClick={handleClic}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px'
      }}
    >
      {/* Fond Squares */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Squares
          speed={0.5}
          squareSize={40}
          direction='diagonal'
          borderColor='#333'
          hoverFillColor='#222'
        />
      </div>

      {/* Contenu */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        padding: '0 24px',
        maxWidth: '600px',
        textAlign: 'center'
      }}>

        {/* Personnage */}
        <img
          src={talkingImg}
          alt="Lionel"
          style={{
            width: '140px',
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.5))'
          }}
        />

        {/* Bulle de dialogue */}
        <div style={{
          backgroundColor: '#1a1a2e',
          border: '1px solid var(--accent)',
          borderRadius: '16px',
          padding: '24px 32px',
          minHeight: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(99,102,241,0.2)'
        }}>
          <p style={{
            color: 'var(--text)',
            fontFamily: "'Jersey 10', serif",
            fontSize: '20px',
            lineHeight: '1.8',
            whiteSpace: 'pre-line'
          }}>
            {texteAffiche}
            {/* Curseur clignotant */}
            {!termine && (
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '20px',
                backgroundColor: 'var(--accent)',
                marginLeft: '4px',
                animation: 'pulse 1s infinite'
              }} />
            )}
          </p>
        </div>

        {/* Indicateur slide */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {SLIDES.map((_, i) => (
            <div key={i} style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: i === slideActuel ? 'var(--accent)' : 'var(--border)',
              transition: 'background-color 0.3s'
            }} />
          ))}
        </div>

        {/* Texte cliquer pour continuer */}
        {termine && (
          <p style={{
            color: 'var(--text-secondary)',
            fontFamily: "'Jersey 10', serif",
            fontSize: '14px',
            animation: 'pulse 1.5s infinite'
          }}>
            {slideActuel === SLIDES.length - 1
              ? '» Cliquez pour entrer...'
              : '» Cliquez pour continuer...'}
          </p>
        )}

      </div>
    </div>
  )
}

export default Intro