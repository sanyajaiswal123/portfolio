import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi'
import cv from '../cv.json'
import './Contact.css'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="contact" ref={ref}>
      <hr className="rule" />
      <Parallax speed={-10} className="contact-ghost">
        <span>CONTACT</span>
      </Parallax>

      <div className="container contact-inner">
        {/* Left: big heading */}
        <div className="contact-left">
          <motion.span className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
            Get In Touch
          </motion.span>
          <motion.div className="contact-big-type"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}>
            <span className="ct-say">SAY</span>
            <br />
            <span className="ct-hello">HELLO</span>
            <span className="ct-script">.</span>
          </motion.div>

          <motion.p className="contact-sub"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
            Open to internships, collaboration, and full-time opportunities. Let's build something together.
          </motion.p>
        </div>

        {/* Right: contact info cards */}
        <div className="contact-right">
          <motion.div className="contact-cards"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}>

            <a href={`mailto:${cv.personal.email}`} className="ct-card">
              <div className="ct-card-icon"><FiMail /></div>
              <div><span className="ct-card-label">Email</span><span className="ct-card-val">{cv.personal.email}</span></div>
            </a>

            <div className="ct-card">
              <div className="ct-card-icon"><FiPhone /></div>
              <div><span className="ct-card-label">Mobile</span><span className="ct-card-val">{cv.personal.mobile}</span></div>
            </div>

            <div className="ct-card">
              <div className="ct-card-icon"><FiMapPin /></div>
              <div><span className="ct-card-label">Location</span><span className="ct-card-val">{cv.personal.location}</span></div>
            </div>

            <div className="ct-card">
              <div className="ct-card-icon"><FiGithub /></div>
              <div><span className="ct-card-label">GitHub</span><span className="ct-card-val">{cv.personal.github}</span></div>
            </div>

            <div className="ct-card">
              <div className="ct-card-icon"><FiLinkedin /></div>
              <div><span className="ct-card-label">LinkedIn</span><span className="ct-card-val">{cv.personal.linkedin}</span></div>
            </div>
          </motion.div>

          {/* <motion.a href={`mailto:${cv.personal.email}`} className="ct-cta-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}>
            Send an Email →
          </motion.a> */}
        </div>
      </div>
      <hr className="rule" />
    </section>
  )
}
