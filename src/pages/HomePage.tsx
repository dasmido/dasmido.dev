
function HomePage() {

  return (
    <section className="section-shell route-page home-profile">
      {/*}<figure className="home-profile-image" aria-hidden="true">
        <img className="home-profile-logo" src={profileLogoM} width="220" height="220" alt="" />
      </figure>*/}

      <h1 className="home-profile-title">Mohammed A.</h1>
      <h3 className="home-profile-role">Senior Software Engineer</h3>

      <p className="home-profile-intro">
        Over 7 years of software engineering experience, I specialize in
        Java application security and technical leadership to deliver secure,
        scalable systems.
      </p>



      {/*<p className="home-profile-contact">Please feel free to get in touch! :)</p>

      <figure className="home-profile-banner">
        <img src={platformScene} alt="Preview of modern SaaS platform work" />
      </figure>*/}

      <nav className="home-socials" aria-label="Social links">
        <a className="home-social-link" href="mailto:jamalmohamad.ik@gmail.com" aria-label="Email">
          <svg className="home-social-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <path d="M4 8l8 6 8-6" />
          </svg>
        </a>
        <a
          className="home-social-link"
          href="https://github.com/dasmido"
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
          href="https://www.linkedin.com/in/mohammed-a-7b8044173"
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

      </nav>

      {/* <section className="home-stack" aria-label="Technology stack">
        <p className="home-stack-title">Core Stack</p>
        <div className="home-stack-list">
          {stackItems.map((item) => (
            <div key={item.name} className="home-stack-item">
              <img className="home-stack-icon" src={item.icon} alt={item.name} />
              <span className="home-stack-name">{item.name}</span>
            </div>
          ))}
        </div>
      </section>*/}

    </section>
  )
}

export default HomePage
