function Footer({ setPage }) {
  return (
    <footer style={{
      width: '100%',
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '32px',
      borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--bg)',
      marginBottom: '100px',
      position: 'relative',
      zIndex: 60
    }}>
      <span style={{
        fontFamily: "'Jersey 10', serif",
        fontSize: '13px',
        color: 'var(--accent)'
      }}>
        © 2026 Lionel Andriantsoavina
      </span>
      <button
        onClick={() => setPage('mentions')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Jersey 10', serif",
          fontSize: '13px',
          color: 'var(--accent)',
          transition: 'color 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--accent)'}
      >
        Mentions légales
      </button>
      <button
        onClick={() => setPage('cgu')}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: "'Jersey 10', serif",
          fontSize: '13px',
          color: 'var(--accent)',
          transition: 'color 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--accent)'}
      >
        CGU
      </button>
    </footer>
  )
}

export default Footer