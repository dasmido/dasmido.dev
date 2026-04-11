import collaborationScene from '../assets/collaboration-scene.svg'
import deliveryScene from '../assets/delivery-scene.svg'

function AboutPage() {
  return (
    <section className="section-shell section-block route-page about-page">
      <div className="about-layout">
        <div>
          <p className="eyebrow">About</p>
          <h1>Design strategy with a clear point of view.</h1>
          <p className="page-copy">
            I work with founders and growing teams to turn early ideas into premium,
            trustworthy brands. Every project balances clarity and personality so your
            audience understands what you do in seconds and remembers you for longer.
          </p>
          <p className="page-copy">
            My process covers positioning, visual direction, and digital execution,
            from first concept to launch-ready assets.
          </p>
        </div>
        <figure className="page-media">
          <img src={collaborationScene} alt="Team collaboration and creative direction" />
        </figure>
      </div>

      <figure className="page-media page-media-wide">
        <img src={deliveryScene} alt="Project delivery workflow visual" />
      </figure>
    </section>
  )
}

export default AboutPage

