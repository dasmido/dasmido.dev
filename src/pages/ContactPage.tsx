import businessCard from '../assets/business-card.svg'

function ContactPage() {
  return (
    <section className="section-shell cta route-page contact-page">
      <div>
        <p className="eyebrow">Contact</p>
        <p className="page-copy">
          Typically respond within 24 hours.
        </p>
       {/*} <a className="btn btn-primary" href="mailto:jamalmohamad.ik@gmail.com">
          jamalmohamad.ik@gmail.com
        </a>*/}
      </div>
      <figure className="page-media">
        <img src={businessCard} alt="Contact and discovery call visual" />
      </figure>
    </section>
  )
}

export default ContactPage

