import { useState, useEffect } from 'react'
import { envoyerContact } from '../services/api'
import ShinyText from './ShinyText'

function Contact() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '' })
  const [statut, setStatut] = useState(null) // 'succes' | 'erreur' | 'chargement'
  const [message, setMessage] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const anim = (delai) => ({
    transition: `opacity 0.8s ease ${delai}s, transform 0.8s ease ${delai}s`,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.nom || !form.prenom || !form.email) {
      setStatut('erreur')
      setMessage('Nom, prénom et email sont obligatoires.')
      return
    }
    setStatut('chargement')
    try {
      await envoyerContact(form)
      setStatut('succes')
      setMessage('Message envoyé ! Je te répondrai dès que possible.')
      setForm({ nom: '', prenom: '', email: '', telephone: '' })
    } catch (err) {
      setStatut('erreur')
      setMessage(err.message || 'Une erreur est survenue.')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    backgroundColor: '#111111',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    color: 'var(--text)',
    fontFamily: "'Jersey 10', serif",
    fontSize: '18px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 px-8 flex flex-col items-center justify-center"
      style={{ paddingBottom: '100px' }}
    >
      {/* Titre */}
      <div style={{ textAlign: 'center', marginBottom: '60px', ...anim(0) }}>
        <span style={{
          fontFamily: "'Jersey 10', serif",
          fontSize: '14px',
          color: 'var(--accent)',
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          » Me Contacter
        </span>
      </div>

      {/* Formulaire */}
      <div style={{
        ...anim(0.1),
        width: '100%',
        maxWidth: '560px',
        backgroundColor: '#111111',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>

        {/* Ligne nom + prénom */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontFamily: "'Jersey 10', serif", fontSize: '14px', color: 'var(--text-secondary)', letterSpacing: '2px' }}>
              NOM *
            </label>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              placeholder="Andriantsoavina"
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontFamily: "'Jersey 10', serif", fontSize: '14px', color: 'var(--text-secondary)', letterSpacing: '2px' }}>
              PRÉNOM *
            </label>
            <input
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              placeholder="Lionel"
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontFamily: "'Jersey 10', serif", fontSize: '14px', color: 'var(--text-secondary)', letterSpacing: '2px' }}>
            EMAIL *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="exemple@mail.com"
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Téléphone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontFamily: "'Jersey 10', serif", fontSize: '14px', color: 'var(--text-secondary)', letterSpacing: '2px' }}>
            TÉLÉPHONE <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>(optionnel)</span>
          </label>
          <input
            name="telephone"
            type="tel"
            value={form.telephone}
            onChange={handleChange}
            placeholder="+33 6 00 00 00 00"
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Message statut */}
        {statut && statut !== 'chargement' && (
          <div style={{
            padding: '12px 18px',
            borderRadius: '10px',
            fontFamily: "'Jersey 10', serif",
            fontSize: '15px',
            backgroundColor: statut === 'succes' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${statut === 'succes' ? '#22c55e' : '#ef4444'}`,
            color: statut === 'succes' ? '#22c55e' : '#ef4444',
          }}>
            {statut === 'succes' ? '✓ ' : '✕ '}{message}
          </div>
        )}

        {/* Bouton */}
        <button
          onClick={handleSubmit}
          disabled={statut === 'chargement'}
          style={{
            padding: '16px',
            backgroundColor: statut === 'chargement' ? 'rgba(99,102,241,0.5)' : 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: statut === 'chargement' ? 'not-allowed' : 'pointer',
            fontFamily: "'Jersey 10', serif",
            fontSize: '20px',
            transition: 'opacity 0.2s',
            marginTop: '4px'
          }}
          onMouseEnter={e => { if (statut !== 'chargement') e.currentTarget.style.opacity = '0.8' }}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {statut === 'chargement' ? (
            'Envoi en cours...'
          ) : (
            <ShinyText
              text="Envoyer"
              color="white"
              shineColor="#e0e7ff"
              speed={3}
              style={{ fontFamily: "'Jersey 10', serif", fontSize: '20px' }}
            />
          )}
        </button>

      </div>
    </section>
  )
}

export default Contact