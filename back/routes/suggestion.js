import express from 'express'
import Suggestion from '../models/Suggestion.js'
import createTransporter from '../mailer.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ date: -1 })
    res.json(suggestions)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { message } = req.body

    const nouvelleSuggestion = new Suggestion({ message })
    await nouvelleSuggestion.save()

    // Envoi de l'email
    const transporter=createTransporter();
    await transporter.sendMail({
      from: `"PORTFOLIO" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: '💡 Nouvelle suggestion sur ton portfolio !',
      html: `
        <h2>Nouvelle suggestion reçue !</h2>
        <p><strong>Message :</strong> ${message}</p>
        <p><strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
      `
    })

    res.json({ message: 'Suggestion enregistrée !' })

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

export default router