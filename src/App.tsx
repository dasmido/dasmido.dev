import { NavLink, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import WorkPage from './pages/WorkPage'
import './App.css'

function App() {
  return (
    <main className="page">
      <header className="site-header section-shell">
        <NavLink to="/" className="brand">
          DASMIDO
        </NavLink>
        <nav aria-label="Primary">
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            About
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Services
          </NavLink>
          <NavLink to="/work" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Work
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Blog
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            Contact
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      <footer className="site-footer section-shell">
        <p>Based in Dubai, working worldwide.</p>
        <div>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <NavLink to="/blog">Blog</NavLink>
          <a href="https://www.behance.net" target="_blank" rel="noreferrer">
            Behance
          </a>
        </div>
      </footer>
    </main>
  )
}

export default App
