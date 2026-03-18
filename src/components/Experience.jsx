import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import cv from '../cv.json'
import './Experience.css'

const typeColors = {
  internship: '#6C63FF',
  'part-time': '#C9B99A',
  freelance: '#4CAF82',
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="experience" ref={ref}>
      <Parallax speed={-8} className="exp-parallax-num">
        <span>03</span>
      </Parallax>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Work History</p>
          <h2 className="section-title">
            My <span className="highlight">Experience</span>
          </h2>
        </motion.div>

        <div className="timeline">
          {cv.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="timeline-item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
            >
              <div className="tl-connector">
                <div className="tl-dot" style={{ '--dot-color': typeColors[exp.type] || '#6C63FF' }} />
                <div className="tl-line" />
              </div>

              <div className="tl-card">
                <div className="tl-card-top">
                  <div>
                    <span className="tl-type-badge" style={{ '--badge-color': typeColors[exp.type] || '#6C63FF' }}>
                      {exp.type}
                    </span>
                    <h3 className="tl-role">{exp.role}</h3>
                    <p className="tl-company">{exp.company}</p>
                  </div>
                  <span className="tl-period">{exp.period}</span>
                </div>

                <ul className="tl-desc">
                  {exp.description.map((d, j) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          className="education-block"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <p className="section-label" style={{ marginBottom: '1.5rem' }}>Education</p>
          {cv.education.map((edu) => (
            <div key={edu.degree} className="edu-card">
              <div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-inst">{edu.institution}</p>
              </div>
              <div className="edu-right">
                <span className="edu-period">{edu.period}</span>
                <span className="edu-level">{edu.level}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
