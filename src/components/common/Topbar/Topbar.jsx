import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Topbar.css'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About Me' },
  { path: '/works', label: 'Works' },
  { path: '/contact', label: 'Contact Me' }
]

export default function Topbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`topbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="topbar-container">
        <ul className="topbar-list">
          {navItems.map((item) => (
            <li key={item.path} className="topbar-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => `topbar-link ${isActive ? 'active' : ''}`}
                aria-current={item.path === '/' ? 'page' : undefined}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}