import { useState, useEffect } from 'react'
import {
  getArticlesEnAttente, validerArticle, modifierArticle, refuserArticle,
  getProfil
} from '../services/api'
import { FaCheck, FaTimes, FaEdit, FaTrash, FaArrowLeft, FaSave } from 'react-icons/fa'

const TOKEN = import.meta.env.VITE_ADMIN_TOKEN
const BASE_URL = 'http://localhost:3000'

const headers = {
  'Content-Type': 'application/json',
  'admin-token': TOKEN
}

// ─── API helpers ───────────────────────────────────────────────
const getArticlesValides = () =>
  fetch(`${BASE_URL}/vinsmoke/articles?statut=validé`, { headers }).then(r => r.json())

const supprimerArticle = (id) =>
  fetch(`${BASE_URL}/veille/${id}`, { method: 'DELETE', headers }).then(r => r.json())

const updateProfil = (section, data) =>
  fetch(`${BASE_URL}/vinsmoke/profil/${section}`, {
    method: 'PUT', headers, body: JSON.stringify(data)
  }).then(r => r.json())

const uploadLogo = async (file, nom) => {
  const formData = new FormData()
  formData.append('logo', file)
  formData.append('nom', nom)
  return fetch(`${BASE_URL}/vinsmoke/logo`, {
    method: 'POST',
    headers: { 'admin-token': TOKEN },
    body: formData
  }).then(r => r.json())
}

// ─── Composant ────────────────────────────────────────────────
function Admin({ setPage }) {
  const [onglet, setOnglet] = useState('attente')
  const [articlesAttente, setArticlesAttente] = useState([])
  const [articlesValides, setArticlesValides] = useState([])
  const [profil, setProfil] = useState(null)
  const [editArticle, setEditArticle] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    chargerDonnees()
  }, [onglet])

  const chargerDonnees = async () => {
    setLoading(true)
    try {
      if (onglet === 'attente') {
        const data = await getArticlesEnAttente()
        setArticlesAttente(Array.isArray(data) ? data : [])
      } else if (onglet === 'valides') {
        const data = await getArticlesValides()
        setArticlesValides(Array.isArray(data) ? data : [])
      } else if (onglet === 'profil' || onglet === 'medias') {
        const data = await getProfil()
        setProfil(data)
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleValider = async (id) => {
    await validerArticle(id)
    showMessage('✅ Article validé !')
    chargerDonnees()
  }

  const handleRefuser = async (id) => {
    await refuserArticle(id)
    showMessage('❌ Article refusé !')
    chargerDonnees()
  }

  const handleModifier = async () => {
    await modifierArticle(editArticle._id, {
      titre: editArticle.titre,
      resume: editArticle.resume,
      categorie: editArticle.categorie
    })
    setEditArticle(null)
    showMessage('✏️ Article modifié !')
    chargerDonnees()
  }

  const handleSupprimerValide = async (id) => {
    await supprimerArticle(id)
    showMessage('🗑️ Article supprimé !')
    chargerDonnees()
  }

  // ── Styles ───────────────────────────────────────────────────
  const s = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#fff',
      fontFamily: "'Jersey 10', serif",
      padding: '40px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '40px',
    },
    retour: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      color: '#6366f1',
      fontSize: '16px',
      border: '1px solid #6366f1',
      borderRadius: '8px',
      padding: '8px 16px',
      transition: 'background 0.2s',
    },
    titre: {
      fontSize: '28px',
      color: '#fff',
      letterSpacing: '4px',
    },
    onglets: {
      display: 'flex',
      gap: '12px',
      marginBottom: '32px',
      borderBottom: '1px solid #222',
      paddingBottom: '12px',
    },
    onglet: (actif) => ({
      cursor: 'pointer',
      fontSize: '15px',
      padding: '8px 20px',
      borderRadius: '8px',
      border: actif ? '1px solid #6366f1' : '1px solid #222',
      color: actif ? '#6366f1' : '#a0a0a0',
      backgroundColor: actif ? 'rgba(99,102,241,0.1)' : 'transparent',
      transition: 'all 0.2s',
    }),
    card: {
      backgroundColor: '#111',
      border: '1px solid #222',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    badge: (cat) => ({
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      backgroundColor: 'rgba(99,102,241,0.2)',
      border: '1px solid #6366f1',
      color: '#6366f1',
    }),
    btn: (couleur) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontFamily: "'Jersey 10', serif",
      backgroundColor: couleur === 'vert' ? 'rgba(34,197,94,0.2)' :
        couleur === 'rouge' ? 'rgba(239,68,68,0.2)' :
        couleur === 'bleu' ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.1)',
      color: couleur === 'vert' ? '#22c55e' :
        couleur === 'rouge' ? '#ef4444' :
        couleur === 'bleu' ? '#6366f1' : '#fff',
      border: `1px solid ${couleur === 'vert' ? '#22c55e' :
        couleur === 'rouge' ? '#ef4444' :
        couleur === 'bleu' ? '#6366f1' : '#333'}`,
    }),
    input: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '10px 14px',
      color: '#fff',
      fontFamily: "'Jersey 10', serif",
      fontSize: '15px',
      width: '100%',
    },
    textarea: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '10px 14px',
      color: '#fff',
      fontFamily: "'Jersey 10', serif",
      fontSize: '14px',
      width: '100%',
      minHeight: '100px',
      resize: 'vertical',
    },
    label: {
      fontSize: '13px',
      color: '#a0a0a0',
      marginBottom: '4px',
      display: 'block',
    },
    message: {
      position: 'fixed',
      top: '24px',
      right: '24px',
      backgroundColor: '#1a1a2e',
      border: '1px solid #6366f1',
      borderRadius: '12px',
      padding: '14px 24px',
      fontSize: '16px',
      color: '#fff',
      zIndex: 9999,
      boxShadow: '0 0 20px rgba(99,102,241,0.3)',
    }
  }

  // ── Rendu onglets ─────────────────────────────────────────────
  const renderAttente = () => (
    <div>
      <p style={{ color: '#a0a0a0', marginBottom: '24px' }}>
        {articlesAttente.length} article(s) en attente de validation
      </p>
      {articlesAttente.map(a => (
        <div key={a._id} style={s.card}>
          {editArticle?._id === a._id ? (
            // Mode édition
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={s.label}>Titre</label>
                <input
                  style={s.input}
                  value={editArticle.titre}
                  onChange={e => setEditArticle({ ...editArticle, titre: e.target.value })}
                />
              </div>
              <div>
                <label style={s.label}>Résumé</label>
                <textarea
                  style={s.textarea}
                  value={editArticle.resume}
                  onChange={e => setEditArticle({ ...editArticle, resume: e.target.value })}
                />
              </div>
              <div>
                <label style={s.label}>Catégorie</label>
                <select
                  style={s.input}
                  value={editArticle.categorie}
                  onChange={e => setEditArticle({ ...editArticle, categorie: e.target.value })}
                >
                  {['IA', 'Cybersécurité', 'Web', 'Mobile', 'Cloud', 'Autre'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={s.btn('vert')} onClick={handleModifier}>
                  <FaSave /> Sauvegarder
                </button>
                <button style={s.btn('rouge')} onClick={() => setEditArticle(null)}>
                  <FaTimes /> Annuler
                </button>
              </div>
            </div>
          ) : (
            // Mode lecture
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <span style={s.badge()}>{a.categorie}</span>
                  <p style={{ fontSize: '16px', margin: '8px 0 4px', color: '#fff' }}>{a.titre}</p>
                  <p style={{ fontSize: '13px', color: '#a0a0a0' }}>{a.source} — {new Date(a.date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6' }}>{a.resume}</p>
              <a href={a.lien} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#6366f1' }}>
                🔗 Voir l'article original
              </a>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button style={s.btn('vert')} onClick={() => handleValider(a._id)}>
                  <FaCheck /> Valider
                </button>
                <button style={s.btn('bleu')} onClick={() => setEditArticle(a)}>
                  <FaEdit /> Modifier
                </button>
                <button style={s.btn('rouge')} onClick={() => handleRefuser(a._id)}>
                  <FaTimes /> Refuser
                </button>
              </div>
            </>
          )}
        </div>
      ))}
      {articlesAttente.length === 0 && !loading && (
        <p style={{ color: '#a0a0a0', textAlign: 'center', marginTop: '60px' }}>
          Aucun article en attente 🎉
        </p>
      )}
    </div>
  )

  const renderValides = () => (
    <div>
      <p style={{ color: '#a0a0a0', marginBottom: '24px' }}>
        {articlesValides.length} article(s) validé(s)
      </p>
      {articlesValides.map(a => (
        <div key={a._id} style={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <span style={s.badge()}>{a.categorie}</span>
              <p style={{ fontSize: '16px', margin: '8px 0 4px' }}>{a.titre}</p>
              <p style={{ fontSize: '13px', color: '#a0a0a0' }}>{a.source} — {new Date(a.date).toLocaleDateString('fr-FR')}</p>
            </div>
            <button style={s.btn('rouge')} onClick={() => handleSupprimerValide(a._id)}>
              <FaTrash /> Supprimer
            </button>
          </div>
          <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6' }}>{a.resume}</p>
        </div>
      ))}
      {articlesValides.length === 0 && !loading && (
        <p style={{ color: '#a0a0a0', textAlign: 'center', marginTop: '60px' }}>
          Aucun article validé pour l'instant
        </p>
      )}
    </div>
  )

  const renderProfil = () => {
    if (!profil) return null
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Identité */}
        <div style={s.card}>
          <p style={{ fontSize: '18px', color: '#6366f1', marginBottom: '8px' }}>👤 Identité</p>
          {['nom', 'titre', 'description', 'email', 'github', 'linkedin'].map(champ => (
            <div key={champ} style={{ marginBottom: '12px' }}>
              <label style={s.label}>{champ}</label>
              <input
                style={s.input}
                value={profil.identite?.[champ] || ''}
                onChange={e => setProfil({
                  ...profil,
                  identite: { ...profil.identite, [champ]: e.target.value }
                })}
              />
            </div>
          ))}
          <button style={s.btn('bleu')} onClick={async () => {
            await updateProfil('identite', profil.identite)
            showMessage('✅ Identité sauvegardée !')
          }}>
            <FaSave /> Sauvegarder
          </button>
        </div>

        {/* Formations */}
        <div style={s.card}>
          <p style={{ fontSize: '18px', color: '#6366f1', marginBottom: '8px' }}>🎓 Formations</p>
          {profil.formation?.map((f, i) => (
            <div key={i} style={{ ...s.card, backgroundColor: '#0a0a0a', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '15px' }}>{f.etablissement}</p>
                  <p style={{ fontSize: '13px', color: '#a0a0a0' }}>{f.diplome} — {f.annee}</p>
                </div>
                <button style={s.btn('rouge')} onClick={async () => {
                  await fetch(`${BASE_URL}/vinsmoke/profil/formation/${i}`, { method: 'DELETE', headers })
                  showMessage('🗑️ Formation supprimée !')
                  chargerDonnees()
                }}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Expériences */}
        <div style={s.card}>
          <p style={{ fontSize: '18px', color: '#6366f1', marginBottom: '8px' }}>💼 Expériences</p>
          {profil.experiences?.map((e, i) => (
            <div key={i} style={{ ...s.card, backgroundColor: '#0a0a0a', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '15px' }}>{e.entreprise}</p>
                  <p style={{ fontSize: '13px', color: '#a0a0a0' }}>{e.poste} — {e.periode}</p>
                </div>
                <button style={s.btn('rouge')} onClick={async () => {
                  await fetch(`${BASE_URL}/vinsmoke/profil/experience/${i}`, { method: 'DELETE', headers })
                  showMessage('🗑️ Expérience supprimée !')
                  chargerDonnees()
                }}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    )
  }

  const renderMedias = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ color: '#a0a0a0' }}>Upload des logos pour les cards Parcours et Expériences</p>

      {[
        { nom: 'Lycée Saint Antoine', fichier: 'saint-antoine' },
        { nom: 'ISPM Madagascar', fichier: 'ispm' },
        { nom: 'Lycée André Malraux', fichier: 'malraux' },
        { nom: 'La Voix du Nord', fichier: 'lavoixdunord' },
        { nom: 'Infogène', fichier: 'infogene' },
      ].map((item) => (
        <div key={item.nom} style={s.card}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '16px' }}>{item.nom}</p>
              <p style={{ fontSize: '12px', color: '#a0a0a0' }}>→ src/assets/{item.fichier}.png</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={`/src/assets/${item.fichier}.png`}
                alt={item.nom}
                style={{ width: '40px', height: '40px', objectFit: 'contain', backgroundColor: 'white', borderRadius: '6px', padding: '3px' }}
                onError={e => e.currentTarget.style.display = 'none'}
              />
              <label style={{
                ...s.btn('bleu'),
                cursor: 'pointer',
              }}>
                📁 Choisir un fichier
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files[0]
                    if (!file) return
                    await uploadLogo(file, item.fichier)
                    showMessage(`✅ Logo ${item.nom} uploadé !`)
                    chargerDonnees()
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div style={s.page}>

      {/* Message flash */}
      {message && <div style={s.message}>{message}</div>}

      {/* Header */}
      <div style={s.header}>
        <div
          style={s.retour}
          onClick={() => setPage('home')}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(99,102,241,0.1)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <FaArrowLeft /> Retour
        </div>
        <span style={s.titre}>» PANEL ADMIN</span>
      </div>

      {/* Onglets */}
      <div style={s.onglets}>
        {[
          { id: 'attente', label: '📋 En attente' },
          { id: 'valides', label: '✅ Validés' },
          { id: 'profil', label: '👤 Profil' },
          { id: 'medias', label: '🖼️ Médias' },
        ].map(o => (
          <div key={o.id} style={s.onglet(onglet === o.id)} onClick={() => setOnglet(o.id)}>
            {o.label}
          </div>
        ))}
      </div>

      {/* Contenu */}
      {loading ? (
        <p style={{ color: '#a0a0a0', textAlign: 'center', marginTop: '60px' }}>Chargement...</p>
      ) : (
        <>
          {onglet === 'attente' && renderAttente()}
          {onglet === 'valides' && renderValides()}
          {onglet === 'profil' && renderProfil()}
          {onglet === 'medias' && renderMedias()}
        </>
      )}

    </div>
  )
}

export default Admin