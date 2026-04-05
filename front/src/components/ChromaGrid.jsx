import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ChromaGrid = ({ items, className = '', radius = 300, damping = 0.45, fadeOut = 0.6, ease = 'power3.out' }) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardMove = e => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-6 ${className}`}
      style={{
        '--r': `${radius}px`,
        '--x': '50%',
        '--y': '50%'
      }}
    >
      {items.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => c.lien && window.open(c.lien, '_blank', 'noopener,noreferrer')}
          className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 transition-colors duration-300"
          style={{
            '--card-border': c.borderColor || 'transparent',
            background: c.gradient,
            borderColor: c.borderColor || 'transparent',
            '--spotlight-color': 'rgba(255,255,255,0.15)',
            cursor: c.lien ? 'pointer' : 'default'
          }}
        >
          {/* Spotlight hover */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />

          {/* Image / Icône / Fallback */}
          <div
            className="relative z-10"
            style={{
              margin: '10px',
              borderRadius: '10px',
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              backgroundColor: 'rgba(255,255,255,0.05)'
            }}
          >
            {c.image ? (
              <>
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: c.isLogo ? 'contain' : 'cover',
                    borderRadius: '10px',
                    padding: c.isLogo ? '20px' : '0'
                  }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback lettre si image échoue */}
                <div style={{
                  display: 'none',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: c.borderColor || 'var(--accent)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  color: 'white',
                  flexShrink: 0
                }}>
                  {c.subtitle?.charAt(0).toUpperCase()}
                </div>
              </>
            ) : (
              /* Icône React si pas d'image */
              <div style={{
                display: 'flex',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                backgroundColor: c.borderColor || 'var(--accent)',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {c.icon && <c.icon size={40} color="white" />}
              </div>
            )}
          </div>

          {/* Footer */}
          <footer
            className="relative z-10 p-4 text-white grid grid-cols-[1fr_auto] gap-x-3 gap-y-1"
            style={{ fontFamily: "'Jersey 10', serif" }}
          >
            {/* Titre + badge */}
            <h3 className="m-0" style={{ fontSize: '16px', fontFamily: "'Jersey 10', serif", lineHeight: '1.3' }}>
              {c.title}
            </h3>
            {c.handle && !c.icon && (
              <span style={{
                fontSize: '11px',
                padding: '2px 10px',
                borderRadius: '20px',
                alignSelf: 'flex-start',
                whiteSpace: 'nowrap',
                backgroundColor: c.isStatut
                  ? (c.handle.includes('Terminé') ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)')
                  : 'rgba(99,102,241,0.15)',
                color: c.isStatut
                  ? (c.handle.includes('Terminé') ? '#22c55e' : '#eab308')
                  : 'var(--accent)',
                border: `1px solid ${c.isStatut
                  ? (c.handle.includes('Terminé') ? '#22c55e' : '#eab308')
                  : 'var(--accent)'}`,
                fontFamily: "'Jersey 10', serif"
              }}>
                {c.handle}
              </span>
            )}

            {/* Subtitle */}
            <p className="m-0 col-span-2" style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: "'Jersey 10', serif"
            }}>
              {c.subtitle}
            </p>

            {/* Description */}
            {c.description && (
              <p className="m-0 col-span-2" style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: '1.6',
                marginTop: '6px',
                fontFamily: "'Jersey 10', serif",
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {c.description}
              </p>
            )}
          </footer>
        </article>
      ))}

      {/* Effet chroma — spotlight global */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />

      {/* Fade overlay — état repos */}
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;