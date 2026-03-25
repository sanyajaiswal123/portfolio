import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import { FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi'
import cv from '../cv.json'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -999, y: -999 })
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let nodes = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initNodes()
    }

    const initNodes = () => {
      nodes = []
      const count = Math.floor((canvas.width * canvas.height) / 6500)
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 2 + 0.8,
          hue: Math.random() > 0.8 ? 'blue' : 'dark',
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1

        const dx = n.x - mx, dy = n.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80 && dist > 0) {
          n.x += (dx / dist) * 1.2
          n.y += (dy / dist) * 1.2
        }

        const isBlue = n.hue === 'blue'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = isBlue
          ? (dist < 80 ? 'rgba(37,99,235,1)' : 'rgba(37,99,235,0.6)')
          : (dist < 80 ? 'rgba(13,13,13,0.9)' : 'rgba(13,13,13,0.3)')
        ctx.fill()
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.25
            const bothBlue = nodes[i].hue === 'blue' && nodes[j].hue === 'blue'
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = bothBlue
              ? `rgba(37,99,235,${alpha * 1.5})`
              : `rgba(13,13,13,${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouseRef.current = { x: -999, y: -999 } }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  })

  return (
    <section id="hero" className="hero">

      {/* ─── decorative bg elements ─── */}
      <div className="bg-circle bg-circle-1" />
      <div className="bg-circle bg-circle-2" />
      <div className="bg-grid" aria-hidden="true" />

      {/* Ghost parallax word */}
      <Parallax speed={-14} className="hero-ghost">
        <span>PORTFOLIO</span>
      </Parallax>

      {/* ─── top strip ─── */}
      <div className="hero-topstrip container">
        <div className="topstrip-logo">SJ<span className="ts-dot">.</span></div>
        <div className="topstrip-roles">
          <span>Fullstack Developer</span>
          <span className="ts-sep">·</span>
          <span>UI/UX Designer</span>
        </div>
        <div className="topstrip-links">
          <a href={`https://${cv.personal.github}`} className="ts-icon" aria-label="GitHub"><FiGithub /></a>
          <a href={`https://${cv.personal.linkedin}`} className="ts-icon" aria-label="LinkedIn"><FiLinkedin /></a>
        </div>
      </div>

      {/* ─── main layout ─── */}
      <div className="hero-layout container">

        {/* Left */}
        <div className="hero-left">
          <motion.span className="section-label" {...fadeUp(0.1)}>My Portfolio</motion.span>

          <motion.div className="hero-big-title" {...fadeUp(0.2)}>
            <span className="hero-big-word">MY</span>
            <span className="hero-big-script">Portfolio</span>
          </motion.div>

          <motion.p className="hero-tagline" {...fadeUp(0.4)}>
            My name is <strong>{cv.personal.firstName}</strong> and I am a{' '}
            <span className="hero-role-chip">Fullstack Developer</span>{' '}
            &amp; <span className="hero-role-chip hero-role-chip--blue">UI/UX Designer</span>
          </motion.p>

          <motion.p className="hero-bio" {...fadeUp(0.5)}>
            {cv.personal.bio}
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(0.65)}>
            <a href="../../cv.pdf" download className="btn-download">
              <FiDownload /> Download CV
            </a>
            {/* <a href="#about" className="btn-ghost">View Work →</a> */}
          </motion.div>
        </div>

        {/* Right: canvas */}
        <motion.div className="hero-right"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}>

          <div className="canvas-frame">
            {/* decorative blue corner accent */}
            <div className="canvas-corner canvas-corner-tl" />
            <div className="canvas-corner canvas-corner-br" />
            <canvas ref={canvasRef} className="hero-canvas" />
            <div className="canvas-hint">Move cursor to interact</div>
          </div>

          <div className="hero-name-strip">
            <span className="hn-first">{cv.personal.firstName}</span>
            <span className="hn-dot">·</span>
            <span className="hn-last">{cv.personal.lastName}</span>
          </div>
        </motion.div>
      </div>

      {/* ─── bottom meta strip ─── */}
      {/* <div className="hero-footer-strip container">
        <div className="hfs-left">
          <span className="hfs-label">Based in</span>
          <span>{cv.personal.location}</span>
        </div>
        <div className="hfs-mid">
          <div className="scroll-pill">
            <span className="scroll-pill-dot" />
            <span>Scroll</span>
          </div>
        </div>
        <div className="hfs-right">
          <span className="hfs-label">Studying at</span>
          <span>{cv.personal.university}</span>
        </div>
      </div> */}
    </section>
  )
}
