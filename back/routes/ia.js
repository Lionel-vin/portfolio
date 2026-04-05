import express from 'express'
import Groq from 'groq-sdk'
import { readFileSync } from 'fs'
import Suggestion from '../models/Suggestion.js'
import createTransporter from '../mailer.js'

const router = express.Router()

const data = JSON.parse(readFileSync('./data/moi.json', 'utf-8'))
const certifications = data.certifications.filter(c => c.nom !== '')

const monParcours = `
Tu es la version numérique de ${data.identite.prenom} ${data.identite.nom}.
Tu réponds UNIQUEMENT aux questions sur lui, son parcours, ses projets et ses compétences.
Si la question ne concerne pas ${data.identite.prenom}, réponds poliment que tu ne peux parler que de lui.
Si tu ne sais pas quelque chose, dis-le honnêtement.
Si le visiteur fait une suggestion, remercie-le chaleureusement et dis lui qu'elle a bien été transmise.

# Personnalité et style
- Tu ES Lionel, tu parles en ton propre nom à la première personne
-Tu agis comme un humain, non pas comme un IA
- Tu dis "je" et non "il" quand tu parles de toi
- Tu vouvoies toujours les visiteurs
- Tu es professionnel et sérieux sur les sujets qui comptent
- Tu glisses occasionnellement une remarque légère et subtile pour rendre la conversation agréable
- Tu réponds TOUJOURS en français, même si on te parle dans une autre langue
- Tu ne fais jamais de blagues sur tes compétences ou projets
- Si quelqu'un te demande qui tu es : "Je suis la version numérique de Lionel, à votre service !"

# Identité
Prénom : ${data.identite.prenom}
Nom : ${data.identite.nom}
Âge : ${data.identite.age} ans
Localisation : ${data.identite.localisation}
${data.identite.poste ? `Poste recherché : ${data.identite.poste}` : ''}

# Profil
${data.identite.profil}

# Formation
${data.formation.map(f => `- ${f.diplome} à ${f.etablissement} (${f.annee})`).join('\n')}

# Certifications
${certifications.length > 0
  ? certifications.map(c => `- ${c.nom} par ${c.organisme} (${c.annee})`).join('\n')
  : "Pas encore de certification pour le moment, mais ça ne saurait tarder !"}

# Compétences
Frontend : ${data.competences.frontend.map(c => c.nom).join(', ')}
Backend : ${data.competences.backend.map(c => c.nom).join(', ')}
Outils : ${data.competences.outils.map(c => c.nom).join(', ')}

# Projets
${data.projets.length > 0
  ? data.projets.map(p => `- ${p}`).join('\n')
  : "Pas encore de projet personnel pour le moment, mais c'est en cours !"}

# Expériences
${data.experiences.map(e => `- ${e.poste} chez ${e.entreprise} (${e.periode}) : ${e.description}`).join('\n')}

# Contact
Email : ${data.contact.email}
${data.contact.github ? `GitHub : ${data.contact.github}` : ''}
${data.contact.linkedin ? `LinkedIn : ${data.contact.linkedin}` : ''}
`

// Route POST questions visiteurs
router.post('/', async (req, res) => {
  try {
    const { question } = req.body

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    })

    // Détecter si c'est une suggestion
    const detection = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `Tu es un détecteur de suggestions. Réponds UNIQUEMENT par "oui" ou "non".
          Est-ce que ce message contient une suggestion, une idée ou un conseil pour Lionel ?
          Message : ${question}`
        }
      ]
    })

    const estSuggestion = detection.choices[0].message.content.toLowerCase().includes('oui')

    if (estSuggestion) {
      const nouvelleSuggestion = new Suggestion({ message: question })
      await nouvelleSuggestion.save()

      const transporter = createTransporter()
      await transporter.sendMail({
        from: `"Portfolio de Lionel" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER,
        subject: '💡 Nouvelle suggestion sur ton portfolio !',
        html: `
          <h2>Nouvelle suggestion reçue !</h2>
          <p><strong>Message :</strong> ${question}</p>
          <p><strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        `
      })
    }

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: monParcours },
        { role: 'user', content: question }
      ]
    })

    const reponse = response.choices[0].message.content
    res.json({ reponse, suggestion_enregistree: estSuggestion })

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// POST /ia/reformuler
router.post('/reformuler', async (req, res) => {
  const { texte } = req.body
  
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `Tu es Lionel Andriantsoavina, un développeur de 20 ans. 
        Reformule le texte suivant à la première personne, avec ta personnalité : 
        mélange d'humour et de sérieux, en français, en 1-2 phrases maximum. 
        Réponds UNIQUEMENT avec la reformulation, rien d'autre.`
      },
      {
        role: 'user',
        content: texte
      }
    ],
    max_tokens: 150
  })
  
  res.json({ reponse: completion.choices[0].message.content })
})

// Route POST avis veille
router.post('/avis-veille', async (req, res) => {
  try {
    const { titre, resume } = req.body

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    })

    const avisPrompt = `
${data.avis_veille.instructions}
Angles possibles : ${data.avis_veille.angles.join(', ')}

Article : ${titre}
Résumé : ${resume}
`

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: monParcours },
        { role: 'user', content: avisPrompt }
      ]
    })

    const avis = response.choices[0].message.content
    res.json({ avis })

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

export default router