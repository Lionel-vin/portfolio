import { useState, useRef, useEffect } from 'react'
import idleImg from '../assets/idle.png'
import talkingImg from '../assets/talking.png'
import { poserQuestion } from '../services/api'

function ChatBot() {
  const [ouvert, setOuvert] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Bonjour ! Je suis la version numérique de Lionel. Posez-moi vos questions !"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll automatique vers le dernier message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const envoyerMessage = async () => {
    if (!input.trim() || loading) return

    const question = input.trim()
    setInput('')
    setLoading(true)

    // Ajoute le message du visiteur
    setMessages(prev => [...prev, { role: 'user', content: question }])

    try {
      const data = await poserQuestion(question)
      setMessages(prev => [...prev, { role: 'assistant', content: data.reponse }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Désolé, une erreur s'est produite. Réessayez !"
      }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') envoyerMessage()
  }

  return (
    <>
      {/* Bouton tête en haut à droite */}
      <div
        className="fixed top-6 right-6 z-50 cursor-pointer"
        onClick={() => setOuvert(!ouvert)}
        style={{ transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img
          src={ouvert ? talkingImg : idleImg}
          alt="Chat avec Lionel"
          style={{
            width: '80px',
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.6))'
          }}
        />
        {/* Indicateur point violet */}
        {!ouvert && (
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: 'var(--accent)',
            borderRadius: '50%',
            position: 'absolute',
            top: '0px',
            right: '0px',
            animation: 'pulse 2s infinite'
          }} />
        )}
      </div>

      {/* Panel de chat */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '360px',
        backgroundColor: '#0d0d1a',
        borderLeft: '1px solid var(--border)',
        transform: ouvert ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 45,
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* Header */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#111122'
        }}>
          <img
            src={talkingImg}
            alt="Lionel"
            style={{ width: '80px', imageRendering: 'pixelated' }}
          />
          <div>
            <p style={{
              color: 'var(--text)',
              fontFamily: "'Jersey 10', serif",
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Lionel IA
            </p>
            <p style={{
              color: 'var(--accent)',
              fontSize: '12px'
            }}>
              En ligne
            </p>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                backgroundColor: msg.role === 'user' ? 'var(--accent)' : '#1a1a2e',
                color: 'var(--text)',
                fontSize: '14px',
                lineHeight: '1.5',
                fontFamily: "'Jersey 10', serif",
                border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none'
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Indicateur de chargement */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '10px 14px',
                borderRadius: '16px 16px 16px 4px',
                backgroundColor: '#1a1a2e',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                fontFamily: "'Jersey 10', serif"
              }}>
                En train de réfléchir...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '8px',
          backgroundColor: '#111122'
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Posez une question..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: '#1a1a2e',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: "'Jersey 10', serif",
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={envoyerMessage}
            disabled={loading}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Jersey 10', serif",
              fontSize: '14px',
              opacity: loading ? 0.6 : 1
            }}
          >
            Envoyer
          </button>
        </div>

      </div>
    </>
  )
}

export default ChatBot