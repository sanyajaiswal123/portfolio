import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import cv from '../cv.json'
import './About.css'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="about" ref={ref}>
      <hr className="rule" />
      <Parallax speed={-12} className="about-ghost">
        <span>ABOUT</span>
      </Parallax>

      <div className="container about-inner">
        {/* Left: large editorial type */}
        <div className="about-left">
          <motion.span className="section-label"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}>
            About Me
          </motion.span>

          <motion.div className="about-type-block"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}>
            <p className="about-intro-text">
              My name is <em>{cv.personal.firstName}</em> and I am a
            </p>
            <div className="about-title-duo">
              <span className="about-bebas">Fullstack</span>
              <span className="about-script">developer.</span>
            </div>
            <div className="about-title-duo about-title-duo--2">
              <span className="about-bebas">UI / UX</span>
              <span className="about-script about-script--2">designer.</span>
            </div>
          </motion.div>
        </div>

        {/* Right: 3-column newspaper layout */}
        <div className="about-right">
          <motion.p className="about-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}>
            {cv.personal.bio}
          </motion.p>

          <motion.div className="about-meta-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}>
            <div className="meta-col">
              <span className="meta-col-title">Personal Info</span>
              <div className="meta-row"><span>Name</span><span>{cv.personal.name}</span></div>
              <div className="meta-row"><span>Email</span><a href={`mailto:${cv.personal.email}`}>{cv.personal.email}</a></div>
              <div className="meta-row"><span>Phone</span><span>{cv.personal.mobile}</span></div>
              <div className="meta-row"><span>Location</span><span>{cv.personal.location}</span></div>
            </div>
            <div className="meta-col">
              <span className="meta-col-title">Links</span>
              <div className="meta-row"><span>LinkedIn</span><span>{cv.personal.linkedin}</span></div>
              <div className="meta-row"><span>GitHub</span><span>{cv.personal.github}</span></div>
              <div className="meta-row"><span>University</span><span>{cv.personal.university}</span></div>
              {/* <div className="meta-row"><span>CGPA</span><span>{cv.personal.cgpa}</span></div> */}
            </div>
          </motion.div>
        </div>
      </div>
      <hr className="rule" />
    </section>
  )
}
