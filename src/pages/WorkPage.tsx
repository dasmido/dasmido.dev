import { Link } from 'react-router-dom'
import { projects } from '../content'

function WorkPage() {
  return (
    <section className="section-shell section-block route-page">
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
        {projects.map((project) => (
          <article key={project.name} className="work-item">
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

