import { useEffect, useRef, useState } from 'react'

function RevealOnScroll({ children, direction = 'up', delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const getTransform = () => {
    if (visible) return 'translate(0, 0)'
    switch (direction) {
      case 'up':    return 'translateY(40px)'
      case 'down':  return 'translateY(-40px)'
      case 'left':  return 'translateX(40px)'
      case 'right': return 'translateX(-40px)'
      default:      return 'translateY(40px)'
    }
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
      }}
    >
      {children}
    </div>
  )
}

export default RevealOnScroll