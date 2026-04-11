import { successStories } from '../content'
import deliveryScene from '../assets/delivery-scene.svg'
import dashboardScene from '../assets/dashboard-scene.svg'
import securityScene from '../assets/security-scene.svg'

function SuccessStoriesPage() {
  const storyImages = [deliveryScene, dashboardScene, securityScene]

  return (
    <section className="section-shell section-block route-page stories-page">
      <div className="stories-head">
        <p className="eyebrow">Success Stories</p>
        <h1>Projects delivered with measurable results.</h1>
        <p className="page-copy">
          A snapshot of successful client engagements across payments, reliability,
          and secure engineering delivery.
        </p>
      </div>

      <div className="stories-grid">
        {successStories.map((story, index) => (
          <article key={story.client + story.project} className="story-card">
            <figure className="story-media">
              <img src={storyImages[index % storyImages.length]} alt={story.project} />
            </figure>
            <p className="story-meta">
              <span>{story.client}</span>
              <span>{story.duration}</span>
            </p>
            <h2>{story.project}</h2>
            <p>{story.outcome}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SuccessStoriesPage

