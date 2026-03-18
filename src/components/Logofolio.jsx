import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import cv from '../cv.json'
import './Logofolio.css'

// Logo placeholder colors
const LOGO_COLORS = [
  ['#1a1a2e', '#6C63FF'],
  ['#1a2e1a', '#4CAF82'],
  ['#2e1a1a', '#C9B99A'],
  ['#1a2e2e', '#6C63FF'],
  ['#2e2e1a', '#C9B99A'],
  ['#2e1a2e', '#a29bfe'],
  ['#1a1a1a', '#6C63FF'],
  ['#2e1e14', '#4CAF82'],
]

function LogoCard({ logo, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [bg, accent] = LOGO_COLORS[index % LOGO_COLORS.length]

  return (
    <motion.div
      className="logo-card"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="logo-visual" style={{ background: bg }}>
        {/* Abstract logo mark */}
        <svg viewBox="0 0 80 80" width="48" height="48">
          <circle cx="40" cy="40" r="28" stroke={accent} strokeWidth="2" fill="none" opacity={hovered ? 1 : 0.5} />
          <text x="40" y="46" textAnchor="middle" fill={accent} fontSize="16" fontFamily="Bebas Neue, sans-serif" letterSpacing="1">
            {logo.name.slice(0, 2).toUpperCase()}
          </text>
        </svg>

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="logo-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="logo-cat">{logo.category}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="logo-info">
        <span className="logo-name">{logo.name}</span>
        <span className="logo-tagline">{logo.tagline}</span>
      </div>
    </motion.div>
  )
}

export default function Logofolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="logofolio" className="logofolio" ref={ref}>
      <Parallax speed={-10} className="logo-parallax-text">
        <span>LOGOFOLIO.</span>
      </Parallax>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Brand Work</p>
          <h2 className="section-title logofolio-title">
            LOGOFOLIO<span className="title-dot">.</span>
          </h2>
          <p className="section-subtitle">
            A curated selection of logo and brand identity projects for 150+ clients
          </p>
        </motion.div>

        <div className="logo-grid">
          {cv.logofolio.map((logo, i) => (
            <LogoCard key={logo.name} logo={logo} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
