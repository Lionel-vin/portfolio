import mongoose from 'mongoose'

const veilleSchema = new mongoose.Schema({
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
  categorie: {
    type: String,
    required: true,
    enum: ['IA', 'Cybersécurité', 'Web', 'Mobile', 'Cloud', 'Autre']
  },
  source: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Veille', veilleSchema)
