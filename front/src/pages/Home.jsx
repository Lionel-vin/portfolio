import { useEffect, useState } from 'react'
import NavDock from '../components/NavDock'
import Hero from '../components/Hero'
import Squares from '../components/Squares'
import ChatBot from '../components/ChatBot'
import Parcours from '../components/Parcours'
import Competences from '../components/Competences'
import Personnage from '../components/Personnage'
import RevealOnScroll from '../components/RevealOnScroll'
import usePersonnage from '../hooks/usePersonnage'
import Experiences from '../components/Experiences'
import Veille from '../components/Veille'
import Projets from '../components/Projets'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import CompetencesE5 from '../components/Competences_E5'
import Footer from '../components/Footer'


function Home({ setPage }) {
  const { pose, message, visible, parler, cacher } = usePersonnage()

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      //if (e.ctrlKey && e.shiftKey && e.key === 'A') setPage('admin')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }} className="relative min-h-screen">

      {/* Fond fixe */}
      <div className="fixed inset-0 z-0">
        <Squares
          speed={0.5}
          squareSize={40}
          direction='diagonal'
          borderColor='#333'
          hoverFillColor='#222'
        />
      </div>

      {/* Contenu */}
      <div className="relative z-10">
        <Hero />

        <RevealOnScroll direction="up">
          <section id="parcours">
            <Parcours />
          </section>
        </RevealOnScroll>


        <RevealOnScroll direction="up">
          <section id="competences">
            <Competences
              onSurvol={(commentaire) => parler(commentaire)}
              onQuitter={cacher}
            />
          </section>
        </RevealOnScroll>

        <RevealOnScroll direction="up">
          <section id="experiences">
            <Experiences />
          </section>
        </RevealOnScroll>

        <RevealOnScroll direction="up">
          <section id="projets">
            <Projets />
          </section>
        </RevealOnScroll>

        <RevealOnScroll direction="up">
          <section id="certifications">
            <Certifications />
          </section>
        </RevealOnScroll>

        <RevealOnScroll direction="up">
          <section id="competences-e5">
            <CompetencesE5 />
          </section>
        </RevealOnScroll>
       
        <RevealOnScroll direction="up">
          <section id="veille" >
            <Veille />
          </section>
        </RevealOnScroll>

        <RevealOnScroll direction="up">
          <Contact />
        </RevealOnScroll>
      </div>

      {/* Éléments fixes — jamais dans un RevealOnScroll */}
      <Personnage pose={pose} message={message} visible={visible} />
      <ChatBot />
      <NavDock scrollToSection={scrollToSection} />
      <Footer setPage={setPage} />

    </div>
  )
}

export default Home