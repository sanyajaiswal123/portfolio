import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import cv from '../cv.json'
import './Projects.css'

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="projects" ref={ref}>
      <hr className="rule" />
      <Parallax speed={-12} className="proj-ghost">
        <span>WORK</span>
      </Parallax>

      <div className="container projects-inner">
        <div className="proj-header-col">
          <motion.span className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            My Work
          </motion.span>
          <motion.h2 className="proj-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}>
            PROJECTS
            <br />
            <span className="proj-script">&amp; Training.</span>
          </motion.h2>
        </div>

        <div className="proj-list-col">
          {cv.projects.map((p, i) => (
            <motion.div key={p.name} className="proj-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}>

              <div className="proj-card-top">
                <div>
                  <div className="proj-number">0{i + 1}</div>
                  <h3 className="proj-name">{p.name}</h3>
                  <span className="proj-period">{p.period}</span>
                </div>
                <a href={p.github} className="proj-github" aria-label="GitHub">
                  <FiGithub />
                </a>
              </div>

              <ul className="proj-desc">
                {p.description.map((d, j) => <li key={j}>{d}</li>)}
              </ul>

              <div className="proj-tech">
                {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            </motion.div>
          ))}

          {/* Training */}
          {cv.training.map((t, i) => (
            <motion.div key={t.name} className="proj-card proj-card--training"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}>
              <div className="training-tag">Training</div>
              <h3 className="proj-name">{t.name}</h3>
              <span className="proj-period">{t.provider} · {t.period}</span>
              <p className="training-desc">{t.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <hr className="rule" />
    </section>
  )
}
