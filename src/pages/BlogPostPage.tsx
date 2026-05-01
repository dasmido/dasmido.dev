import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { fetchBlogDetail, type BlogDetail } from '../api/blogs'
import brandScene from '../assets/brand-scene.svg'
import platformScene from '../assets/platform-scene.svg'
import securityScene from '../assets/security-scene.svg'

function BlogPostPage() {
  const { blogId } = useParams()
  const [post, setPost] = useState<BlogDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const parsedBlogId = Number(blogId)

    if (!blogId || Number.isNaN(parsedBlogId)) {
      setPost(null)
      setIsLoading(false)
      setIsNotFound(true)
      setError(null)
      return
    }

    let isMounted = true

    const loadBlog = async () => {
      try {
        const nextPost = await fetchBlogDetail(parsedBlogId)
        if (!isMounted) {
          return
        }

        setPost(nextPost)
        setIsNotFound(false)
        setError(null)
      } catch (error) {
        if (!isMounted) {
          return
        }

        const isMissing = error instanceof Error && error.message.includes('404')
        setPost(null)
        setIsNotFound(isMissing)
        setError(isMissing ? null : 'We could not load this article right now. Please try again shortly.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    setIsLoading(true)
    void loadBlog()

    return () => {
      isMounted = false
    }
  }, [blogId])

  const blogImages = [brandScene, platformScene, securityScene]

  if (isLoading) {
    return (
      <section className="section-shell section-block route-page blog-post-page">
        <p className="eyebrow">Loading article</p>
        <h1>Please wait while we fetch the article.</h1>
      </section>
    )
  }

  if (isNotFound) {
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

  if (error) {
    return (
      <section className="section-shell section-block route-page blog-post-page">
        <p className="eyebrow">Unable to load article</p>
        <h1>{error}</h1>
        <Link to="/blog" className="btn btn-ghost">
          Back to blog
        </Link>
      </section>
    )
  }

  if (!post) {
    return null
  }

  const image = blogImages[post.id % blogImages.length] ?? brandScene

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
        <img src={image} alt={post.title} />
      </figure>

      <div className="blog-post-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ alt, src, title }) => (
              <figure className="blog-inline-figure">
                <img src={src ?? ''} alt={alt ?? title ?? 'Blog illustration'} />
                {title || alt ? <figcaption>{title ?? alt}</figcaption> : null}
              </figure>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default BlogPostPage

