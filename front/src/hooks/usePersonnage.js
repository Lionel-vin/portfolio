import { useState, useRef } from 'react'

const usePersonnage = () => {
  const [pose, setPose] = useState('idle')
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  const parler = (texte) => {
    // Annule tout timer en cours
    if (timerRef.current) clearTimeout(timerRef.current)
    setPose('talking')
    setMessage(texte)
    setVisible(true)
  }

  const cacher = () => {
    // Attend 800ms avant de cacher — annulable si on survole autre chose
    timerRef.current = setTimeout(() => {
      setPose('idle')
      setVisible(false)
      setTimeout(() => setMessage(''), 500)
    }, 800)
  }

  return { pose, message, visible, parler, cacher }
}

export default usePersonnage