import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ConsultMePage from './pages/ConsultMePage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import ServicesPage from './pages/ServicesPage'
import WorkPage from './pages/WorkPage'
import './App.css'

function App() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light'
    }

    const savedTheme = window.localStorage.getItem('dasmido-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  const navItems = [
    { to: '/consult-me', label: 'Consult Me' },
    { to: '/product', label: 'My tools' },
    { to: '/success-stories', label: 'Success Stories' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ]

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('dasmido-theme', theme)
  }, [theme])

  return (
    <main className="page">
      <header className="site-header section-shell">
        <NavLink to="/" className="brand">
          DASMIDO
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="primary-nav"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          id="primary-nav"
          className={`primary-nav ${isMobileMenuOpen ? 'is-open' : ''}`}
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active-link' : '')}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/consult-me" element={<ConsultMePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <footer className="site-footer section-shell">
        <div>
             <p className="footer-copy">© {new Date().getFullYear()} DASMIDO. All rights reserved.</p>
        </div>
        <div>
        <NavLink to="/privacy"> Privacy Policy</NavLink>
                    <NavLink to="/terms"> Terms of Service</NavLink>
          <button
            type="button"
            className="footer-theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? (
              <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                <path d="M12 2.8v2.2M12 19v2.2M2.8 12H5M19 12h2.2M5.5 5.5l1.6 1.6M16.9 16.9l1.6 1.6M18.5 5.5l-1.6 1.6M7.1 16.9l-1.6 1.6" />
              </svg>
            ) : (
              <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 3.2a8.8 8.8 0 108.3 11.6A9.5 9.5 0 0114.5 3.2z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </footer>
    </main>
  )
}

export default App
