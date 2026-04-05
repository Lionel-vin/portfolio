import { useState, useEffect, useRef } from 'react'
import CardSwap, { Card } from './CardSwap'
import talkingImg from '../assets/talking.png'
import { reformuler, getProfil } from '../services/api'

const LOGOS = {
  'La Voix du Nord': '/src/assets/lavoixdunord.png',
  'Infogène': '/src/assets/infogene.png',
}

function Experiences() {
  const [experiences, setExperiences] = useState([])
  const [cardActuelle, setCardActuelle] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [texteAffiche, setTexteAffiche] = useState('')
  const [indexLettre, setIndexLettre] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)
  const swapRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Charge les expériences depuis moi.json
  useEffect(() => {
    getProfil().then(data => {
      if (data?.experiences) setExperiences([...data.experiences].reverse())
    })
  }, [])

  // Charge le commentaire quand la card change
  useEffect(() => {
    if (!experiences.length) return

    if (timerRef.current) clearTimeout(timerRef.current)

    setCommentaire('')
    setTexteAffiche('')
    setIndexLettre(0)

    const experience = experiences[cardActuelle]
    if (!experience?.ressenti) return

    reformuler(experience.ressenti)
      .then(data => setCommentaire(data.reponse))
      .catch(() => setCommentaire(experience.ressenti))

  }, [cardActuelle, experiences])

  // Machine à écrire
  useEffect(() => {
    if (!commentaire || indexLettre >= commentaire.length) return
    const timer = setTimeout(() => {
      setTexteAffiche(prev => prev + commentaire[indexLettre])
      setIndexLettre(prev => prev + 1)
    }, 25)
    return () => clearTimeout(timer)
  }, [indexLettre, commentaire])

  // Quand texte entièrement affiché → attend 4s puis swap
  useEffect(() => {
    if (!commentaire || !experiences.length) return
    if (texteAffiche.length < commentaire.length) return

    timerRef.current = setTimeout(() => {
      swapRef.current?.()
      setCardActuelle(prev => (prev + 1) % experiences.length)
    }, 4000)

    return () => clearTimeout(timerRef.current)
  }, [texteAffiche, commentaire, experiences])

  if (!experiences.length) return null

  const anim = (delai) => ({
    transition: `opacity 0.8s ease ${delai}s, transform 0.8s ease ${delai}s`,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-30px)',
  })

  return (
    <section
      id="experiences"
      className="relative min-h-screen flex items-center justify-center px-8"
      style={{ gap: '80px', overflow: 'hidden' }}
    >

      {/* Titre section */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        ...anim(0)
      }}>
        <span style={{
          fontFamily: "'Jersey 10', serif",
          fontSize: '14px',
          color: 'var(--accent)',
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          » Mes Expériences
        </span>
      </div>

      {/* Côté gauche — CardSwap */}
      <div style={{
        position: 'relative',
        width: '400px',
        height: '400px',
        ...anim(0.2)
      }}>
        <CardSwap
          width={360}
          height={260}
          cardDistance={-50}
          verticalDistance={60}
          delay={999999}
          pauseOnHover={true}
          swapRef={swapRef}
          skewAmount={-6}
          onCardClick={(i) => setCardActuelle(i)}
        >
          {experiences.map((e, i) => (
            <Card key={i} customClass="cursor-pointer">
              <div style={{
                width: '100%',
                height: '100%',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)',
                borderRadius: '12px'
              }}>

                {/* Header — logo + entreprise */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {LOGOS[e.entreprise] ? (
                    <img
                      src={LOGOS[e.entreprise]}
                      alt={e.entreprise}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        padding: '4px'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(99,102,241,0.2)',
                      border: '1px solid var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      💼
                    </div>
                  )}
                  <div>
                    <p style={{
                      fontFamily: "'Jersey 10', serif",
                      fontSize: '18px',
                      color: 'var(--text)',
                      marginBottom: '4px'
                    }}>
                      {e.entreprise}
                    </p>
                    <p style={{
                      fontFamily: "'Jersey 10', serif",
                      fontSize: '13px',
                      color: 'var(--text-secondary)'
                    }}>
                      {e.localisation} — {e.periode}
                    </p>
                  </div>
                </div>

                {/* Poste */}
                <div style={{
                  backgroundColor: 'rgba(99,102,241,0.15)',
                  border: '1px solid var(--accent)',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontFamily: "'Jersey 10', serif",
                  fontSize: '15px',
                  color: 'var(--accent)'
                }}>
                  {e.poste}
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: "'Jersey 10', serif",
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {e.description}
                </p>

              </div>
            </Card>
          ))}
        </CardSwap>
      </div>

      {/* Côté droit — Mini moi + bulle */}
      <div style={{
        ...anim(0.4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '280px',
        position: 'relative'
      }}>

        {/* Mini moi */}
        <img
          src={talkingImg}
          alt="Lionel"
          style={{
            width: '140px',
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 15px rgba(99,102,241,0.4))',
            animation: 'float 3s ease-in-out infinite',
            marginBottom: '16px'
          }}
        />

        {/* Bulle BD */}
        <div style={{
          position: 'relative',
          backgroundColor: '#1a1a2e',
          border: '2px solid var(--accent)',
          borderRadius: '16px',
          padding: '16px 20px',
          fontFamily: "'Jersey 10', serif",
          fontSize: '16px',
          color: 'var(--text)',
          lineHeight: '1.6',
          width: '260px',
          minHeight: '100px',
          boxShadow: '0 0 20px rgba(99,102,241,0.2)',
        }}>
          <span>
            {texteAffiche || '...'}
            {texteAffiche.length < commentaire.length && commentaire && (
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '14px',
                backgroundColor: 'var(--accent)',
                marginLeft: '2px',
                verticalAlign: 'middle',
                animation: 'pulse 1s infinite'
              }} />
            )}
          </span>

          {/* Flèche bulle BD — vers le haut */}
          <div style={{
            position: 'absolute',
            top: '-16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: '16px solid var(--accent)'
          }} />
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '14px solid #1a1a2e'
          }} />
        </div>

      </div>

    </section>
  )
}

export default Experiences