import express from 'express'
import Veille from '../models/Veille.js'

const router = express.Router()

// Récupérer tous les articles
router.get('/', async (req, res) => {
  try {
    const articles = await Veille.find().sort({ date: -1 })
    res.json(articles)

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Ajouter un article
router.post('/', async (req, res) => {
  try {
    const { titre, resume, lien, categorie, source } = req.body

    const nouvelArticle = new Veille({
      titre,
      resume,
      lien,
      categorie,
      source
    })

    await nouvelArticle.save()
    res.json({ message: 'Article ajouté !' })

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Supprimer un article
router.delete('/:id', async (req, res) => {
  try {
    await Veille.findByIdAndDelete(req.params.id)
    res.json({ message: 'Article supprimé !' })

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

export default router