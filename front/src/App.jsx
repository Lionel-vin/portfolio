import { useState } from 'react'
import Home from './pages/Home'
// import Admin from './pages/Admin'
import Intro from './components/Intro'
import MentionsLegales from './pages/MentionsLegales'
import CGU from './pages/CGU'

function App() {
  const [page, setPage] = useState('intro')

  return (
    <div>
      {page === 'intro' && <Intro onTermine={() => setPage('home')} />}
      {page === 'home' && <Home setPage={setPage} />}
      {/* {page === 'admin' && <Admin setPage={setPage} />} */}
      {page === 'mentions' && <MentionsLegales setPage={setPage} />}
      {page === 'cgu' && <CGU setPage={setPage} />}
    </div>
  )
}

export default App