import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiExternalLink } from 'react-icons/fi'
import cv from '../cv.json'
import './Education.css'

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="education" ref={ref}>
      <hr className="rule" />
      <div className="container educ-inner">
        {/* Left: Education */}
        <div className="educ-col">
          <motion.span className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            Education
          </motion.span>
          <motion.h2 className="educ-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>
            ACADEMIC
            <br />
            <span className="educ-script">background.</span>
          </motion.h2>

          <div className="educ-list">
            {cv.education.map((e, i) => (
              <motion.div key={e.degree} className="educ-item"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}>
                <div className="educ-item-left">
                  <span className="educ-period">{e.period}</span>
                  <span className="educ-grade">{e.grade}</span>
                </div>
                <div className="educ-item-right">
                  <h3 className="educ-degree">{e.degree}</h3>
                  <p className="educ-inst">{e.institution}</p>
                  <p className="educ-loc">{e.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Certificates */}
        <div className="educ-col">
          <motion.span className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
            Certificates
          </motion.span>
          <motion.h2 className="educ-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            CERTIFIED
            <br />
            <span className="educ-script">skills.</span>
          </motion.h2>

          <div className="cert-list">
            {cv.certificates.map((c, i) => {
              const Tag = c.link ? 'a' : 'div'
              const linkProps = c.link
                ? { href: c.link, target: '_blank', rel: 'noopener noreferrer' }
                : {}
              return (
                <motion.div key={c.name} className="cert-item-wrap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}>
                  <Tag className={`cert-item${c.link ? ' cert-item--linked' : ''}`} {...linkProps}>
                    <div className="cert-num">0{i + 1}</div>
                    <div className="cert-info">
                      <h4 className="cert-name">{c.name}</h4>
                      <span className="cert-meta">{c.provider} · {c.date}</span>
                    </div>
                    {c.link && <FiExternalLink className="cert-link-icon" />}
                  </Tag>
                </motion.div>
              )
            })}
          </div>

          {/* Extras */}
          <motion.div className="extras-block"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}>
            <span className="section-label" style={{ marginBottom: '0.75rem', display: 'block' }}>Extra Curricular</span>
            {cv.extras.map((e, i) => (
              <p key={i} className="extra-item">— {e}</p>
            ))}
          </motion.div>
        </div>
      </div>
      <hr className="rule" />
    </section>
  )
}
