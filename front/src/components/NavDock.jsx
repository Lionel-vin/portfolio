import Dock from './Dock'
import { FaHome, FaUser, FaBriefcase, FaTools, FaNewspaper, FaEnvelope, FaCode, FaCertificate, FaStar } from 'react-icons/fa'


function NavDock({ scrollToSection }) {
  const items = [
    {
      icon: <FaHome size={18} color="#ffffff" />,
      label: 'Accueil',
      onClick: () => scrollToSection('hero')
    },
    {
      icon: <FaUser size={18} color="#ffffff" />,
      label: 'Parcours',
      onClick: () => scrollToSection('parcours')
    },
    { icon: <FaTools size={18} />,
      label: 'Compétences', 
      onClick: () => scrollToSection('competences') 
    },
    {
      icon: <FaBriefcase size={18} color="#ffffff" />,
      label: 'Expériences',
      onClick: () => scrollToSection('experiences')
    },
    {
      icon: <FaCode size={18} color="#ffffff" />,
      label: 'Projets',
      onClick: () => scrollToSection('projets')
    },
    {
      icon: <FaCertificate size={18} color="#ffffff" />,
      label: 'Certifications',
      onClick: () => scrollToSection('certifications')
    },
    {
      icon: <FaStar size={18} color="#ffffff" />,
      label: 'Compétences E5',
      onClick: () => scrollToSection('competences-e5')
    },
    {
      icon: <FaNewspaper size={18} color="#ffffff" />,
      label: 'Veille',
      onClick: () => scrollToSection('veille')
    },
    {
      icon: <FaEnvelope size={18} color="#ffffff" />,
      label: 'Contact',
      onClick: () => scrollToSection('contact')
    },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <Dock items={items} />
    </div>
  )
}

export default NavDock