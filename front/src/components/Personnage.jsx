import { useState, useEffect } from 'react'
import idleImg from '../assets/idle.png'
import talkingImg from '../assets/talking.png'

const POSES = { idle: idleImg, talking: talkingImg }

function Personnage({ pose = 'idle', message = '', visible = false }) {
  const [afficherBulle, setAfficherBulle] = useState(false)

  useEffect(() => {
    if (message) {
      setAfficherBulle(true)
    } else {
      setAfficherBulle(false)
    }
  }, [message])

  return (
    <div className="fixed bottom-24 left-8 z-40 flex flex-col items-start gap-2">

      {/* Le personnage */}
      <div style={{
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: visible ? 'translateY(0)' : 'translateY(150%)',
      }}>
        <img
          src={POSES[pose]}
          alt="Mini Lionel"
          style={{
            width: '120px',
            imageRendering: 'pixelated'
          }}
        />
      </div>

      {/* Bulle de dialogue */}
      {afficherBulle && visible && (
        <div style={{
            position: 'absolute',
            bottom: '90px',
            left: '90px',
            maxWidth: '320px',      // était 220px
            minWidth: '260px',      // ajoute un minimum
            padding: '12px 16px',
            borderRadius: '12px',
            borderBottomLeftRadius: '0px',
            backgroundColor: '#1a1a2e',
            border: '1px solid var(--accent)',
            color: 'var(--text)',
            fontFamily: "'Jersey 10', serif",
            fontSize: '14px',
            lineHeight: '1.6',
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.2)'
        }}>
          {message}
          {/* Petite flèche */}
          <div style={{
            width: 0,
            height: 0,
            borderRight: '8px solid var(--accent)',
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            position: 'absolute',
            bottom: '10px',
            left: '-8px'
          }} />
        </div>
      )}

    </div>
  )
}

export default Personnage