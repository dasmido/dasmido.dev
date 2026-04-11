import { Link } from 'react-router-dom'
import { projects } from '../content'
import brandScene from '../assets/brand-scene.svg'
import deliveryScene from '../assets/delivery-scene.svg'
import dashboardScene from '../assets/dashboard-scene.svg'

function WorkPage() {
  const projectImages = [brandScene, deliveryScene, dashboardScene]

  return (
    <section className="section-shell section-block route-page work-page">
      <div className="work-head">
        <div>
          <p className="eyebrow">Selected Work</p>
          <h1>Recent partnerships and launches.</h1>
        </div>
        <Link className="text-link" to="/contact">
          Start your project
        </Link>
      </div>
      <div className="work-list">
        {projects.map((project, index) => (
          <article key={project.name} className="work-item">
            <figure className="work-thumb">
              <img src={projectImages[index % projectImages.length]} alt={project.name} />
            </figure>
            <h3>{project.name}</h3>
            <p>{project.type}</p>
            <span>{project.year}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export default WorkPage

