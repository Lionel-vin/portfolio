function MentionsLegales({ setPage }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg)',
      color: 'var(--text)',
      minHeight: '100vh',
      padding: '60px 40px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: "'Jersey 10', serif"
    }}>
      <button
        onClick={() => setPage('home')}
        style={{
          background: 'none',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text)',
          cursor: 'pointer',
          fontFamily: "'Jersey 10', serif",
          fontSize: '16px',
          padding: '8px 20px',
          marginBottom: '40px',
          transition: 'border-color 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        ← Retour
      </button>

      <h1 style={{ fontSize: '36px', color: 'var(--accent)', marginBottom: '40px', letterSpacing: '4px', textTransform: 'uppercase' }}>
        Mentions Légales
      </h1>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Éditeur du site
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Lionel Andriantsoavina<br />
          Email : lionelandriantsoavina@gmail.com<br />
          Statut : Étudiant BTS SIO — Lycée André Malraux, Montivilliers
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Hébergement
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Ce site est hébergé par :<br />
          <strong style={{ color: 'var(--text)' }}>GitHub Pages</strong><br />
          GitHub, Inc. — 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis<br />
          Site : <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>pages.github.com</a>
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Propriété intellectuelle
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          L'ensemble du contenu de ce site (textes, images, code, design) est la propriété exclusive de Lionel Andriantsoavina, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Données personnelles
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Ce site collecte uniquement les données saisies volontairement via le formulaire de contact (nom, prénom, email, téléphone). Ces données sont utilisées uniquement pour répondre aux demandes de contact et ne sont pas transmises à des tiers.<br /><br />
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en contactant : <strong style={{ color: 'var(--text)' }}>lionelandriantsoavina@gmail.com</strong>
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Cookies
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Ce site n'utilise pas de cookies de traçage ou publicitaires. Aucun cookie tiers n'est déposé sur votre appareil.
        </p>
      </section>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '60px' }}>
        Dernière mise à jour : Avril 2026
      </p>
    </div>
  )
}

export default MentionsLegales