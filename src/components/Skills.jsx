import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import cv from '../cv.json'
import './Skills.css'

function Bar({ name, level, delay, inView }) {
  return (
    <div className="sk-item">
      <div className="sk-head">
        <span>{name}</span><span className="sk-pct">{level}%</span>
      </div>
      <div className="sk-track">
        <motion.div className="sk-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="skills" ref={ref}>
      <hr className="rule" />
      <Parallax speed={-10} className="skills-ghost">
        <span>SKILLS</span>
      </Parallax>

      <div className="container skills-inner">
        {/* Left: big heading */}
        <div className="skills-left">
          <motion.span className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}>
            Expertise
          </motion.span>
          <motion.h2 className="skills-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}>
            MY
            <br />
            <span className="skills-script">skills.</span>
          </motion.h2>

          {/* Tag cloud */}
          <motion.div className="skills-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}>
            <div className="tag-group">
              <span className="tag-group-label">Languages</span>
              <div className="tags">
                {cv.skills.languages.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
            <div className="tag-group">
              <span className="tag-group-label">Frameworks</span>
              <div className="tags">
                {cv.skills.frameworks.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
            <div className="tag-group">
              <span className="tag-group-label">Tools</span>
              <div className="tags">
                {cv.skills.tools.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
            <div className="tag-group">
              <span className="tag-group-label">Soft Skills</span>
              <div className="tags">
                {cv.skills.soft.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: skill bars */}
        <div className="skills-right">
          <motion.div className="bars-group"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <span className="bars-label">Design</span>
            {cv.skills.design.map((s, i) => (
              <Bar key={s.name} {...s} delay={0.3 + i * 0.1} inView={inView} />
            ))}
          </motion.div>

          <motion.div className="bars-group"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}>
            <span className="bars-label">Development</span>
            {cv.skills.development.map((s, i) => (
              <Bar key={s.name} {...s} delay={0.4 + i * 0.1} inView={inView} />
            ))}
          </motion.div>
        </div>
      </div>
      <hr className="rule" />
    </section>
  )
}
