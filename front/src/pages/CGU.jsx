function CGU({ setPage }) {
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
        Conditions Générales d'Utilisation
      </h1>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Objet
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Les présentes conditions régissent l'utilisation du portfolio personnel de Lionel Andriantsoavina, accessible en ligne. En accédant à ce site, vous acceptez les présentes conditions.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Accès au site
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Ce site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les frais liés à cet accès restent à la charge de l'utilisateur. L'éditeur se réserve le droit de modifier ou d'interrompre l'accès au site à tout moment sans préavis.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Utilisation du formulaire de contact
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Le formulaire de contact est mis à disposition pour permettre aux visiteurs de prendre contact avec l'éditeur. L'utilisateur s'engage à fournir des informations exactes et à ne pas utiliser ce formulaire à des fins commerciales, de spam ou malveillantes.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Propriété intellectuelle
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Tout le contenu présent sur ce site est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans l'accord préalable écrit de Lionel Andriantsoavina.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Responsabilité
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          L'éditeur ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site. Les liens vers des sites externes sont fournis à titre informatif et l'éditeur n'est pas responsable de leur contenu.
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '2px' }}>
          » Droit applicable
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          Les présentes CGU sont soumises au droit français. Tout litige relatif à l'utilisation de ce site sera soumis à la compétence des tribunaux français.
        </p>
      </section>

      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '60px' }}>
        Dernière mise à jour : Avril 2026
      </p>
    </div>
  )
}

export default CGU