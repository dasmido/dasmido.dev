import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../content'
import brandScene from '../assets/brand-scene.svg'
import platformScene from '../assets/platform-scene.svg'
import securityScene from '../assets/security-scene.svg'

function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((item) => item.slug === slug)
  const imageByCategory: Record<string, string> = {
    'Brand Strategy': brandScene,
    Portfolio: platformScene,
    'Web Design': securityScene,
  }

  if (!post) {
    return (
      <section className="section-shell section-block route-page blog-post-page">
        <p className="eyebrow">Article not found</p>
        <h1>We could not find this article.</h1>
        <Link to="/blog" className="btn btn-ghost">
          Back to blog
        </Link>
      </section>
    )
  }

  return (
    <article className="section-shell section-block route-page blog-post-page">
      <Link to="/blog" className="text-link back-link">
        ← Back to all articles
      </Link>

      <header className="blog-post-header">
        <p className="blog-card-meta">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </p>
        <h1>{post.title}</h1>
        <time>{post.publishedAt}</time>
      </header>

      <figure className="blog-post-media">
        <img src={imageByCategory[post.category] ?? brandScene} alt={post.title} />
      </figure>

      <div className="blog-post-content">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}

export default BlogPostPage

