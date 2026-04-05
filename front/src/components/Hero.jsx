import { useRef, useEffect, useState } from 'react'
import idleImg from '../assets/idle.png'
import TiltCard from './TiltCard'
import ShinyText from './ShinyText'
import { FaLinkedin, FaGithub, FaDownload } from 'react-icons/fa'

function Hero() {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const anim = (delai) => ({
    transition: `opacity 0.8s ease ${delai}s, transform 0.8s ease ${delai}s`,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(-30px)',
  })

  const animRight = {
    transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateX(0)' : 'translateX(30px)',
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-8"
      style={{ gap: '80px' }}
      ref={containerRef}
    >

      {/* Côté gauche */}
      <div style={{ width: '800px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* Bonjour */}
        <div style={anim(0)}>
          <ShinyText
            text="» Bonjour, je suis"
            color="var(--accent)"
            shineColor="#a5b4fc"
            speed={4}
            style={{
              fontFamily: "'Jersey 10', serif",
              fontSize: '28px'
            }}
          />
        </div>

        {/* Nom */}
        <div style={{ ...anim(0.2),fontSize:"70px"}}>
          <ShinyText
            text="Lionel Andriantsoavina"
            color="var(--text)"
            shineColor="#ffffff"
            speed={3}
            style={{
              fontFamily: "'Jersey 10', serif",
              fontSize: '200px',
              lineHeight: 1.1,
              display: 'block'
            }}
          />
        </div>

        {/* Titre */}
        <div style={{ ...anim(0.4), fontSize:"30px"}}>
          <ShinyText
            text="Développeur en formation — BTS SIO"
            color="var(--accent)"
            shineColor="#a5b4fc"
            speed={5}
            style={{
              fontFamily: "'Jersey 10', serif",
              fontSize: '32px'
            }}
          />
        </div>

        {/* Description */}
        <div style={{ ...anim(0.6),fontSize:"20px"}}>
          <ShinyText
            text="Curieux, motivé et passionné par les nouvelles technologies. Je transforme les idées en solutions élégantes."
            color="var(--text-secondary)"
            shineColor="#ffffff"
            speed={6}
            style={{
              fontFamily: "'Jersey 10', serif",
              fontSize: '20px',
              lineHeight: '1.8',
              display: 'block'
            }}
          />
        </div>

        {/* Boutons */}
        <div style={{ ...anim(0.8), display: 'flex', gap: '16px' }}>
          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '14px 32px',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: "'Jersey 10', serif",
              fontSize: '20px',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <ShinyText
              text="Me contacter"
              color="white"
              shineColor="#e0e7ff"
              speed={3}
              style={{ fontFamily: "'Jersey 10', serif", fontSize: '20px' }}
            />
          </button>

          <button
            onClick={() => document.getElementById('parcours').scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '14px 32px',
              backgroundColor: 'transparent',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: "'Jersey 10', serif",
              fontSize: '20px',
              transition: 'border-color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <ShinyText
              text="Voir mon parcours"
              color="var(--text)"
              shineColor="#ffffff"
              speed={3}
              style={{ fontFamily: "'Jersey 10', serif", fontSize: '20px' }}
            />
          </button>
          <a href="/cv-lionel.pdf"
             download
             style={{
               display: 'flex',
               alignItems: 'center',
               gap: '10px',
               padding: '14px 32px',
               backgroundColor: 'transparent',
               color: 'var(--text)',
               border: '1px solid var(--border)',
               borderRadius: '8px',
               cursor: 'pointer',
               fontFamily: "'Jersey 10', serif",
               fontSize: '20px',
               textDecoration: 'none',
               transition: 'border-color 0.2s, color 0.2s'
             }}
             onMouseEnter={e => {
               e.currentTarget.style.borderColor = 'var(--accent)'
               e.currentTarget.style.color = 'var(--accent)'
             }}
             onMouseLeave={e => {
               e.currentTarget.style.borderColor = 'var(--border)'
               e.currentTarget.style.color = 'var(--text)'
             }}
>            
             <FaDownload size={16} />
             Mon CV
          </a>
          <a href="https://www.linkedin.com/in/lionel-andriantsoavina-a32979339"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '52px',
                height: '52px',
                backgroundColor: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text)',
                cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#0a66c2'
                e.currentTarget.style.color = '#0a66c2'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text)'
              }}
            >
         <FaLinkedin size={24} />
      </a>
      <a href="https://github.com/lionel-vin"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '52px',
              height: '52px',
              backgroundColor: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text)',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#ffffff'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text)'
            }}
          >
            <FaGithub size={24} />
          </a>
        </div>

      </div>

      {/* Côté droit — TiltCard */}
      <div style={{ ...animRight, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TiltCard
          imageSrc={idleImg}
          altText="Lionel"
          containerHeight="400px"
          containerWidth="280px"
          imageHeight="400px"
          imageWidth="280px"
          captionText="Lionel Andriantsoavina"
          scaleOnHover={1.05}
          rotateAmplitude={12}
          displayOverlayContent={true}
          overlayContent={
            <div style={{
              width: '280px',
              height: '400px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: '20px',
              background: 'linear-gradient(to top, rgba(10,10,20,0.9) 0%, transparent 60%)',
              borderRadius: '15px'
            }}>
              <p style={{
                color: 'var(--text)',
                fontFamily: "'Jersey 10', serif",
                fontSize: '18px',
                marginBottom: '8px'
              }}>
                Lionel Andriantsoavina
              </p>
              <div style={{
                backgroundColor: 'rgba(99,102,241,0.3)',
                border: '1px solid var(--accent)',
                borderRadius: '20px',
                padding: '4px 14px',
                color: 'var(--accent)',
                fontFamily: "'Jersey 10', serif",
                fontSize: '13px'
              }}>
                Développeur en formation
              </div>
            </div>
          }
        />
      </div>

    </section>
  )
}

export default Hero