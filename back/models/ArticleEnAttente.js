import mongoose from 'mongoose'

const articleEnAttenteSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  lien: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true,
    enum: ['IA', 'Cybersécurité', 'Web', 'Mobile', 'Cloud', 'Autre']
  },
  date: {
    type: Date,
    default: Date.now
  },
  statut: {
    type: String,
    default: 'en_attente',
    enum: ['en_attente', 'validé', 'refusé']
  }
})

export default mongoose.model('ArticleEnAttente', articleEnAttenteSchema)