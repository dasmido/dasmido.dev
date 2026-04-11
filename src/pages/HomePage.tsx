import heroImg from '../assets/hero.png'

function HomePage() {
  return (
    <section className="section-shell route-page home-profile">
      <figure className="home-profile-image">
        <img src={heroImg} width="220" height="220" alt="Profile portrait" />
      </figure>

      <h1 className="home-profile-title">Hello!</h1>

      <p className="home-profile-intro">
        I recently built premium branding and web experiences for founders and
        growing businesses and I am currently looking for new opportunities.
      </p>

      {/*<p className="home-profile-contact">Please feel free to get in touch! :)</p>

      <figure className="home-profile-banner">
        <img src={platformScene} alt="Preview of modern SaaS platform work" />
      </figure>*/}

      <nav className="home-socials" aria-label="Social links">
        <a className="home-social-link" href="mailto:hello@yourbrand.com" aria-label="Email">
          <svg className="home-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M4 8l8 6 8-6" />
          </svg>
        </a>
        <a
          className="home-social-link"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <svg className="home-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.2 18.4v-2.2a3.6 3.6 0 011.2-2.8c-3.6-.4-5.1-1.8-5.1-4.5a3.5 3.5 0 011-2.4 3.4 3.4 0 01.1-2.6s1.2-.4 2.9 1a10.1 10.1 0 015.4 0c1.7-1.4 2.9-1 2.9-1a3.4 3.4 0 01.1 2.6 3.5 3.5 0 011 2.4c0 2.7-1.5 4.1-5.1 4.5a3.3 3.3 0 011.2 2.6v2.4" />
            <circle cx="9" cy="10" r="0.7" fill="currentColor" />
            <circle cx="15" cy="10" r="0.7" fill="currentColor" />
          </svg>
        </a>
        <a
          className="home-social-link"
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <svg className="home-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7.5 9v8" />
            <circle cx="7.5" cy="6.5" r="1" fill="currentColor" />
            <path d="M12 17V9" />
            <path d="M12 12.2c0-1.8 1.1-3.2 3-3.2 1.8 0 3 1.2 3 3.3V17" />
          </svg>
        </a>
        <a
          className="home-social-link"
          href="https://scholar.google.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Scholar"
        >
          <svg className="home-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2.5 9.5L12 4l9.5 5.5L12 15z" />
            <path d="M6 12v3.5c0 .9 2.7 2.5 6 2.5s6-1.6 6-2.5V12" />
          </svg>
        </a>
      </nav>

    </section>
  )
}

export default HomePage

