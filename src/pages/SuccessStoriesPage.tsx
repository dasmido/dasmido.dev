import { successStories } from '../content'
import itpScene from '../assets/itp.png'
import grafanaScene from '../assets/grafana.png'

function SuccessStoriesPage() {
  const storyImages = [itpScene, grafanaScene]

  return (
    <section className="section-shell section-block route-page stories-page">
      <div className="stories-head">
        <p className="eyebrow">Success Stories</p>
        <p className="page-copy">
          A snapshot of successful delivery software.
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

