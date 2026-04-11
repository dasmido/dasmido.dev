import { services } from '../content'

function ServicesPage() {
  return (
    <section className="section-shell section-block route-page">
      <p className="eyebrow">Services</p>
      <h1>What I can help you build.</h1>
      <div className="card-grid">
        {services.map((service) => (
          <article key={service.title} className="card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesPage

