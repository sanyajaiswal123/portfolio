import cv from '../cv.json'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <hr className="rule" />
      <div className="container footer-inner">
        <div className="footer-logo">
          <span className="fl-name">{cv.personal.name}</span>
          <span className="fl-roles">Fullstack Developer · UI/UX Designer</span>
        </div>
        <div className="footer-links">
          <a href={`mailto:${cv.personal.email}`}>{cv.personal.email}</a>
          <span className="footer-sep">|</span>
          <span>{cv.personal.location}</span>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} {cv.personal.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}
