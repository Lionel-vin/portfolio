import Parser from 'rss-parser'
import cron from 'node-cron'
import { readFileSync } from 'fs'
import Groq from 'groq-sdk'
import createTransporter from '../mailer.js'
import ArticleEnAttente from '../models/ArticleEnAttente.js'

const parser = new Parser()
const sites = JSON.parse(readFileSync('./data/site_veille.json', 'utf-8'))

const verifierSites = async () => {
  console.log('Vérification des sites de veille...')

  for (const site of sites) {
    try {
      const feed = await parser.parseURL(site.rss)

      for (const article of feed.items.slice(0, 5)) {

        // ✅ Vérifie en base si le lien existe déjà
        const dejaExistant = await ArticleEnAttente.findOne({ lien: article.link })
        if (dejaExistant) {
          console.log(`Article déjà connu, ignoré : ${article.title}`)
          continue
        }

        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

        // Générer le résumé
        const resumeResponse = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: `Résume cet article en 3-4 phrases maximum en français, de façon claire et professionnelle.
              Titre : ${article.title}
              Contenu : ${article.contentSnippet || article.summary || 'Pas de contenu disponible'}`
            }
          ]
        })

        const resume = resumeResponse.choices[0].message.content

        // Détecter la catégorie
        const categorieResponse = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: `Classe cet article dans UNE SEULE de ces catégories : IA, Cybersécurité, Web, Mobile, Cloud, Autre.
              Réponds UNIQUEMENT par le nom de la catégorie, rien d'autre.
              Titre : ${article.title}`
            }
          ]
        })

        const categorieRaw = categorieResponse.choices[0].message.content.trim()
        const categoriesValides = ['IA', 'Cybersécurité', 'Web', 'Mobile', 'Cloud', 'Autre']
        const categorie = categoriesValides.includes(categorieRaw) ? categorieRaw : 'Autre'

        // Sauvegarder en base
        const nouvelArticle = new ArticleEnAttente({
          titre: article.title,
          resume,
          lien: article.link,
          source: site.nom,
          categorie
        })
        await nouvelArticle.save()

        // Envoyer le mail
        const transporter = createTransporter()
        await transporter.sendMail({
          from: `"Veille Portfolio" <${process.env.MAIL_USER}>`,
          to: process.env.MAIL_USER,
          subject: `📰 Nouvel article à valider - ${site.nom}`,
          html: `
            <h2>Nouvel article détecté sur ${site.nom}</h2>
            <h3>${article.title}</h3>
            <p><strong>Catégorie détectée :</strong> ${categorie}</p>
            <p><strong>Résumé généré par l'IA :</strong></p>
            <p>${resume}</p>
            <p><strong>Lien original :</strong> <a href="${article.link}">${article.link}</a></p>
            <p><strong>Date :</strong> ${new Date(article.pubDate).toLocaleDateString('fr-FR')}</p>
            <hr/>
            <p>Connecte-toi sur ton panel admin pour valider ou modifier cet article.</p>
          `
        })

        console.log(`Nouvel article détecté : ${article.title}`)
      }
    } catch (err) {
      console.log(`Erreur sur ${site.nom} :`, err.message)
    }
  }
}

cron.schedule('0 0 * * *', verifierSites)

export default verifierSites