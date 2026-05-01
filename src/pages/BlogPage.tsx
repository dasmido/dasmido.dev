import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchBlogPreviews, type BlogPreview } from '../api/blogs'
import brandScene from '../assets/brand-scene.svg'
import platformScene from '../assets/platform-scene.svg'
import securityScene from '../assets/security-scene.svg'

function BlogPage() {
  const blogImages = [brandScene, platformScene, securityScene]
  const [posts, setPosts] = useState<BlogPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadBlogs = async () => {
      try {
        const nextPosts = await fetchBlogPreviews()
        if (!isMounted) {
          return
        }

        setPosts(nextPosts)
        setError(null)
      } catch {
        if (!isMounted) {
          return
        }

        setError('We could not load articles right now. Please try again shortly.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadBlogs()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="section-shell section-block route-page blog-page">
      <div className="blog-head">
        <p className="eyebrow">Blog</p>
        {/*<h1>Articles on branding, design, and growth.</h1>
        <p className="blog-subtitle">
          Insights, frameworks, and practical notes from real client work.
        </p>*/}
      </div>

      {isLoading ? <p>Loading articles...</p> : null}

      {error ? <p>{error}</p> : null}

      {!isLoading && !error && posts.length === 0 ? <p>No published articles yet.</p> : null}

      <div className="blog-grid">
        {posts.map((post, index) => (
          <article key={post.id} className="blog-card">
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
              <Link to={`/blog/${post.id}`} className="text-link">
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

