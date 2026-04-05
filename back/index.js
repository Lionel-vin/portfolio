import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import contactRoute from './routes/contact.js'
import veilleRoute from './routes/veille.js'
import iaRoute from './routes/ia.js'
import suggestionRoute from './routes/suggestion.js'
import './services/veille.js'
import adminRoute from './routes/admin.js'
dotenv.config()


const app = express()

app.use(cors({
   origin: ['https://lionel-vin.github.io', 'http://localhost:5173'], // autorise ton front prod et dev
  methods: ['GET','POST','OPTIONS'],
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/contact', contactRoute)
app.use('/veille', veilleRoute)
app.use('/ia', iaRoute)
app.use('/suggestions', suggestionRoute)
app.use('/vinsmoke', adminRoute)
// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connecté !'))
  .catch((err) => console.log('Erreur MongoDB :', err))

// Lancement du serveur
app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000')
})