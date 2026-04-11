import brandScene from '../assets/brand-scene.svg'

function ContactPage() {
  return (
    <section className="section-shell cta route-page contact-page">
      <div>
        <p className="eyebrow">Contact</p>
        <h1>Ready to build a brand your audience trusts?</h1>
        <p className="page-copy">
          Share your project goals and timeline, and I will reply within 24 hours.
        </p>
        <a className="btn btn-primary" href="mailto:hello@yourbrand.com">
          hello@yourbrand.com
        </a>
      </div>
      <figure className="page-media">
        <img src={brandScene} alt="Contact and discovery call visual" />
      </figure>
    </section>
  )
}

export default ContactPage

