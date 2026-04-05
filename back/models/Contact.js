import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  telephone: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Contact', contactSchema)