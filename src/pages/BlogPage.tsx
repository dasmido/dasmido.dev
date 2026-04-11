import { Link } from 'react-router-dom'
import { blogPosts } from '../content'
import brandScene from '../assets/brand-scene.svg'
import platformScene from '../assets/platform-scene.svg'
import securityScene from '../assets/security-scene.svg'

function BlogPage() {
  const blogImages = [brandScene, platformScene, securityScene]

  return (
    <section className="section-shell section-block route-page blog-page">
      <div className="blog-head">
        <p className="eyebrow">Blog</p>
        <h1>Articles on branding, design, and growth.</h1>
        <p className="blog-subtitle">
          Insights, frameworks, and practical notes from real client work.
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <article key={post.slug} className="blog-card">
            <figure className="blog-media">
              <img src={blogImages[index % blogImages.length]} alt={post.title} />
            </figure>
            <p className="blog-card-meta">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
            </p>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <div className="blog-card-footer">
              <time>{post.publishedAt}</time>
              <Link to={`/blog/${post.slug}`} className="text-link">
                Read article
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BlogPage

