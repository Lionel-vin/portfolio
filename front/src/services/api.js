const BASE_URL = 'https://portfolio-production-cfb3.up.railway.app'

// ============================================
// IA
// ============================================

export const poserQuestion = async (question) => {
  const response = await fetch(`${BASE_URL}/ia`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  })
  return response.json()
}

export const getAvisVeille = async (titre, resume) => {
  const response = await fetch(`${BASE_URL}/ia/avis-veille`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titre, resume })
  })
  return response.json()
}

// ============================================
// CONTACT
// ============================================

export const envoyerContact = async (contact) => {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  })
  return response.json()
}

// ============================================
// VEILLE
// ============================================

export const getArticles = async () => {
  const response = await fetch(`${BASE_URL}/veille`)
  return response.json()
}

// ============================================
// ADMIN
// ============================================

const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN

export const getArticlesEnAttente = async () => {
  const response = await fetch(`${BASE_URL}/vinsmoke/articles`, {
    headers: { 'admin-token': ADMIN_TOKEN }
  })
  return response.json()
}

export const validerArticle = async (id) => {
  const response = await fetch(`${BASE_URL}/vinsmoke/articles/${id}/valider`, {
    method: 'POST',
    headers: { 'admin-token': ADMIN_TOKEN }
  })
  return response.json()
}

export const modifierArticle = async (id, data) => {
  const response = await fetch(`${BASE_URL}/vinsmoke/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'admin-token': ADMIN_TOKEN
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

export const refuserArticle = async (id) => {
  const response = await fetch(`${BASE_URL}/vinsmoke/articles/${id}`, {
    method: 'DELETE',
    headers: { 'admin-token': ADMIN_TOKEN }
  })
  return response.json()
}

export const getProfil = async () => {
  const response = await fetch(`${BASE_URL}/vinsmoke/profil`, {
    headers: { 'admin-token': ADMIN_TOKEN }
  })
  return response.json()
}

export const reformuler = async (texte) => {
  const res = await fetch(`${BASE_URL}/ia/reformuler`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texte })
  })
  return res.json()
}
