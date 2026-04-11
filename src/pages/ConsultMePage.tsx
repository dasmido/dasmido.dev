import { strengthAreas } from '../content'
import dashboardScene from '../assets/dashboard-scene.svg'
import securityScene from '../assets/security-scene.svg'
import platformScene from '../assets/platform-scene.svg'

function ConsultMePage() {
  const areaImages = [platformScene, dashboardScene, securityScene]

  return (
    <section className="section-shell section-block route-page consult-page">
      <div className="consult-head">
        <p className="eyebrow">Consult Me</p>
        <h1>Tech Lead support for payments, observability, and AppSec.</h1>
        <p className="page-copy">
          I partner with founders and engineering teams to de-risk delivery and
          accelerate execution in critical technical areas.
        </p>
      </div>

      <figure className="page-media page-media-wide">
        <img src={dashboardScene} alt="Tech leadership and observability delivery" />
      </figure>

      <div className="consult-grid">
        {strengthAreas.map((area, index) => (
          <article key={area.title} className="consult-card">
            <figure className="consult-media">
              <img src={areaImages[index % areaImages.length]} alt={area.title} />
            </figure>
            <h2>{area.title}</h2>
            <p>{area.details}</p>
          </article>
        ))}
      </div>

      <div className="consult-cta">
        <a className="btn btn-primary" href="mailto:hello@yourbrand.com">
          Book a consultation
        </a>
      </div>
    </section>
  )
}

export default ConsultMePage

