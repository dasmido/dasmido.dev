import { services } from '../content'
import brandScene from '../assets/brand-scene.svg'
import collaborationScene from '../assets/collaboration-scene.svg'
import platformScene from '../assets/platform-scene.svg'

function ServicesPage() {
  const serviceImages = [brandScene, collaborationScene, platformScene]

  return (
    <section className="section-shell section-block route-page services-page">
      <p className="eyebrow">Services</p>
      <h1>What I can help you build.</h1>
      <div className="card-grid">
        {services.map((service, index) => (
          <article key={service.title} className="card">
            <figure className="card-media">
              <img src={serviceImages[index % serviceImages.length]} alt={service.title} />
            </figure>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesPage

