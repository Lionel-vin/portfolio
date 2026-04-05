import express from 'express'
import Contact from '../models/Contact.js'
import createTransporter from '../mailer.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, telephone } = req.body

    const nouveauContact = new Contact({
      nom,
      prenom,
      email,
      telephone
    })

    await nouveauContact.save()

    // Envoi de l'email sans bloquer le front
    const transporter = createTransporter()
    transporter.sendMail({
      from: `"PORTFOLIO" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: '📬 Nouveau contact sur ton portfolio !',
      html: `
        <h2>Nouveau contact reçu !</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Prénom :</strong> ${prenom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
      `
    }, (err, info) => {
      if (err) console.error('Erreur mail:', err)
      else console.log('Email envoyé:', info.response)
    })

    // Réponse immédiate au front
    res.json({ message: 'Contact enregistré !' })

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Cet email est déjà enregistré !' })
    }
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

export default router