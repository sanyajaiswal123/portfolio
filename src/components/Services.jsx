import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import cv from '../cv.json'
import './Services.css'

const icons = ['◈', '◉', '◫', '◎']

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="services" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">What I Do</p>
          <h2 className="section-title">
            My <span className="highlight">Services</span>
          </h2>
        </motion.div>

        <div className="services-grid">
          {cv.services.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="service-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <div className="service-icon">{icons[i]}</div>
              <h3 className="service-title">{svc.title}</h3>
              <p className="service-desc">{svc.description}</p>
              <div className="service-arrow">→</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
