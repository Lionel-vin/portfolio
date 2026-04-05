import express from 'express'
import { createObjectCsvWriter } from 'csv-writer'
import ArticleEnAttente from '../models/ArticleEnAttente.js'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import multer from 'multer'
import path from 'path'

const router = express.Router()

// ============================================
// MIDDLEWARE DE PROTECTION
// ============================================

const protegerAdmin = (req, res, next) => {
  const token = req.headers['admin-token']
  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Non autorisé' })
  }
  next()
}

// ============================================
// CONFIGURATION MULTER POUR LES PDFs
// ============================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    mkdirSync('./uploads/certifications', { recursive: true })
    cb(null, './uploads/certifications')
  },
  filename: (req, file, cb) => {
    const nomFichier = Date.now() + '_' + file.originalname
    cb(null, nomFichier)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Seuls les fichiers PDF sont acceptés !'))
    }
  }
})

// ============================================
// HELPER - LIRE ET ECRIRE moi.json
// ============================================

const lireProfil = () => {
  return JSON.parse(readFileSync('./data/moi.json', 'utf-8'))
}

const sauvegarderProfil = (data) => {
  writeFileSync('./data/moi.json', JSON.stringify(data, null, 2), 'utf-8')
}

// ============================================
// ROUTES VEILLE
// ============================================

router.get('/articles', protegerAdmin, async (req, res) => {
  try {
    const articles = await ArticleEnAttente.find({ statut: 'en_attente' }).sort({ date: -1 })
    res.json(articles)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

router.put('/articles/:id', protegerAdmin, async (req, res) => {
  try {
    const { titre, resume, categorie } = req.body
    await ArticleEnAttente.findByIdAndUpdate(req.params.id, { titre, resume, categorie })
    res.json({ message: 'Article modifié !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

router.post('/articles/:id/valider', protegerAdmin, async (req, res) => {
  try {
    const article = await ArticleEnAttente.findById(req.params.id)
    mkdirSync('./csv', { recursive: true })

    const fichierCSV = `./csv/veille_${article.categorie}.csv`
    const csvWriter = createObjectCsvWriter({
      path: fichierCSV,
      header: [
        { id: 'titre', title: 'Titre' },
        { id: 'resume', title: 'Résumé' },
        { id: 'lien', title: 'Lien' },
        { id: 'source', title: 'Source' },
        { id: 'categorie', title: 'Catégorie' },
        { id: 'date', title: 'Date' }
      ],
      append: true
    })

    await csvWriter.writeRecords([{
      titre: article.titre,
      resume: article.resume,
      lien: article.lien,
      source: article.source,
      categorie: article.categorie,
      date: new Date(article.date).toLocaleDateString('fr-FR')
    }])

    await ArticleEnAttente.findByIdAndUpdate(req.params.id, { statut: 'validé' })
    res.json({ message: 'Article validé et sauvegardé dans le CSV !' })

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

router.delete('/articles/:id', protegerAdmin, async (req, res) => {
  try {
    await ArticleEnAttente.findByIdAndUpdate(req.params.id, { statut: 'refusé' })
    res.json({ message: 'Article refusé !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// ============================================
// ROUTES PROFIL
// ============================================

// Récupérer le profil complet
router.get('/profil', protegerAdmin, (req, res) => {
  try {
    const data = lireProfil()
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Mettre à jour l'identité
router.put('/profil/identite', protegerAdmin, (req, res) => {
  try {
    const data = lireProfil()
    data.identite = { ...data.identite, ...req.body }
    sauvegarderProfil(data)
    res.json({ message: 'Identité mise à jour !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Ajouter une formation
router.post('/profil/formation', protegerAdmin, (req, res) => {
  try {
    const { diplome, etablissement, annee } = req.body
    const data = lireProfil()
    data.formation.push({ diplome, etablissement, annee })
    sauvegarderProfil(data)
    res.json({ message: 'Formation ajoutée !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Supprimer une formation
router.delete('/profil/formation/:index', protegerAdmin, (req, res) => {
  try {
    const data = lireProfil()
    data.formation.splice(req.params.index, 1)
    sauvegarderProfil(data)
    res.json({ message: 'Formation supprimée !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Ajouter une certification avec PDF
router.post('/profil/certification', protegerAdmin, upload.single('pdf'), (req, res) => {
  try {
    const { nom, organisme, annee } = req.body
    const data = lireProfil()
    data.certifications.push({
      nom,
      organisme,
      annee,
      pdf: req.file ? req.file.filename : null
    })
    sauvegarderProfil(data)
    res.json({ message: 'Certification ajoutée !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Supprimer une certification
router.delete('/profil/certification/:index', protegerAdmin, (req, res) => {
  try {
    const data = lireProfil()
    data.certifications.splice(req.params.index, 1)
    sauvegarderProfil(data)
    res.json({ message: 'Certification supprimée !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Mettre à jour les compétences
router.put('/profil/competences', protegerAdmin, (req, res) => {
  try {
    const data = lireProfil()
    data.competences = { ...data.competences, ...req.body }
    sauvegarderProfil(data)
    res.json({ message: 'Compétences mises à jour !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Ajouter une expérience
router.post('/profil/experience', protegerAdmin, (req, res) => {
  try {
    const { experience } = req.body
    const data = lireProfil()
    data.experiences.push(experience)
    sauvegarderProfil(data)
    res.json({ message: 'Expérience ajoutée !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Supprimer une expérience
router.delete('/profil/experience/:index', protegerAdmin, (req, res) => {
  try {
    const data = lireProfil()
    data.experiences.splice(req.params.index, 1)
    sauvegarderProfil(data)
    res.json({ message: 'Expérience supprimée !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Ajouter un projet
router.post('/profil/projet', protegerAdmin, (req, res) => {
  try {
    const { projet } = req.body
    const data = lireProfil()
    data.projets.push(projet)
    sauvegarderProfil(data)
    res.json({ message: 'Projet ajouté !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})

// Supprimer un projet
router.delete('/profil/projet/:index', protegerAdmin, (req, res) => {
  try {
    const data = lireProfil()
    data.projets.splice(req.params.index, 1)
    sauvegarderProfil(data)
    res.json({ message: 'Projet supprimé !' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', erreur: err.message })
  }
})
// Multer pour images
const storageLogos = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './front/src/assets/')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.nom + path.extname(file.originalname))
  }
})

const uploadLogo = multer({
  storage: storageLogos,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Image uniquement !'))
  }
})

router.post('/logo', protegerAdmin, uploadLogo.single('logo'), (req, res) => {
  res.json({ message: 'Logo uploadé !' })
})
export default router