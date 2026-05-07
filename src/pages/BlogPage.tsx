import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  canManageBlogs,
  createBlog,
  deleteBlog,
  fetchBlogPreviews,
  fetchManageBlogs,
  updateBlog,
  type BlogManageItem,
  type BlogPreview,
  type BlogMutationInput,
} from '../api/blogs'
import brandScene from '../assets/brand-scene.svg'
import platformScene from '../assets/platform-scene.svg'
import securityScene from '../assets/security-scene.svg'

const INITIAL_FORM: BlogMutationInput = {
  title: '',
  content: '',
  published: true,
}

function BlogPage() {
  const blogImages = [brandScene, platformScene, securityScene]
  const [posts, setPosts] = useState<BlogManageItem[]>([])
  const [form, setForm] = useState<BlogMutationInput>(INITIAL_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const isEditing = editingId !== null

  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditing ? 'Saving...' : 'Creating...'
    }

    return isEditing ? 'Save changes' : 'Create blog'
  }, [isEditing, isSubmitting])

  const loadBlogs = useCallback(async () => {
    setIsLoading(true)

    try {
      const nextPosts = canManageBlogs
        ? await fetchManageBlogs()
        : (await fetchBlogPreviews()).map(
            (post: BlogPreview): BlogManageItem => ({
              ...post,
              content: '',
              published: true,
              updatedAt: '',
            }),
          )
      setPosts(nextPosts)
      setError(null)
    } catch {
      setError('We could not load blog posts right now. Please try again shortly.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadBlogs()
  }, [loadBlogs])

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setEditingId(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setFormError(null)
    setIsEditorOpen(true)
  }

  const closeDialog = () => {
    if (isSubmitting) {
      return
    }

    setIsEditorOpen(false)
    setFormError(null)
    resetForm()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload: BlogMutationInput = {
      title: form.title.trim(),
      content: form.content.trim(),
      published: form.published,
    }

    if (!payload.title || !payload.content) {
      setFormError('Title and content are required.')
      return
    }

    setIsSubmitting(true)
    setFormError(null)
    setFeedback(null)

    try {
      if (editingId === null) {
        await createBlog(payload)
        setFeedback('Blog post created successfully.')
      } else {
        await updateBlog(editingId, payload)
        setFeedback('Blog post updated successfully.')
      }

      setIsEditorOpen(false)
      resetForm()
      await loadBlogs()
    } catch {
      setFormError('We could not save this blog post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (post: BlogManageItem) => {
    setEditingId(post.id)
    setForm({
      title: post.title,
      content: post.content,
      published: post.published,
    })
    setIsEditorOpen(true)
    setFeedback(null)
    setFormError(null)
  }

  const handleDelete = async (postId: number) => {
    const shouldDelete = window.confirm('Delete this blog post permanently?')
    if (!shouldDelete) {
      return
    }

    setFeedback(null)
    setFormError(null)

    try {
      await deleteBlog(postId)
      if (editingId === postId) {
        resetForm()
      }
      setFeedback('Blog post deleted successfully.')
      await loadBlogs()
    } catch {
      setFormError('We could not delete this blog post. Please try again.')
    }
  }

  return (
    <section className="section-shell section-block route-page blog-page">
      <div className="blog-head">
        <p className="eyebrow">{canManageBlogs ? 'Blog CMS' : 'Blog'}</p>
        {/*<h1>
          {canManageBlogs
            ? 'Create, update, and publish blog posts from the UI.'
            : 'Articles and practical notes from real projects.'}
        </h1>
        <p className="blog-subtitle">
          {canManageBlogs
            ? 'Write operations are protected with an admin key and sent securely through the API.'
            : 'Read-only mode. Configure VITE_BLOG_ADMIN_KEY to enable create, edit, and delete.'}
        </p>*/}
        {canManageBlogs ? (
          <div className="blog-page-actions">
            <button type="button" className="btn btn-primary" onClick={openCreateDialog}>
              New blog
            </button>
          </div>
        ) : null}
      </div>

      {canManageBlogs && isEditorOpen ? (
        <div className="blog-modal-backdrop" onClick={closeDialog}>
          <div
            className="blog-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-editor-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="blog-modal-header">
              <h2 id="blog-editor-title">{isEditing ? 'Edit blog' : 'Create new blog'}</h2>
              <button type="button" className="btn btn-ghost btn-sm" onClick={closeDialog} disabled={isSubmitting}>
                Close
              </button>
            </div>

            <form className="blog-editor" onSubmit={handleSubmit}>
              <label className="blog-editor-label" htmlFor="blog-title">
                Title
              </label>
              <input
                id="blog-title"
                className="blog-editor-input"
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="Enter blog title"
                maxLength={255}
                required
              />

              <label className="blog-editor-label" htmlFor="blog-content">
                Content (Markdown supported)
              </label>
              <textarea
                id="blog-content"
                className="blog-editor-textarea"
                value={form.content}
                onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                placeholder="Write your article here..."
                rows={10}
                required
              />

              <label className="blog-editor-checkbox">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, published: event.target.checked }))
                  }
                />
                Publish now
              </label>

              <div className="blog-editor-actions">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {submitLabel}
                </button>
                <button type="button" className="btn btn-ghost" onClick={closeDialog} disabled={isSubmitting}>
                  Cancel
                </button>
              </div>

              {formError ? <p className="blog-editor-error">{formError}</p> : null}
            </form>
          </div>
        </div>
      ) : null}

      {feedback ? <p className="blog-editor-success">{feedback}</p> : null}

      {isLoading ? <p>Loading articles...</p> : null}

      {error ? <p>{error}</p> : null}

      {!isLoading && !error && posts.length === 0 ? <p>No blog posts yet.</p> : null}

      <div className="blog-grid">
        {posts.map((post, index) => (
          <article key={post.id} className="blog-card">
            <figure className="blog-media">
              <img src={blogImages[index % blogImages.length]} alt={post.title} />
            </figure>
            <p className="blog-card-meta">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
              {canManageBlogs ? <span>{post.published ? 'Published' : 'Draft'}</span> : null}
            </p>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <div className="blog-card-footer">
              <time>{post.publishedAt}</time>
              <div className="blog-card-actions">
                <Link to={`/blog/${post.id}`} className="text-link">
                  Read
                </Link>
                {canManageBlogs ? (
                  <button type="button" className="text-link blog-link-button" onClick={() => handleEdit(post)}>
                    Edit
                  </button>
                ) : null}
                {canManageBlogs ? (
                  <button
                    type="button"
                    className="text-link blog-link-button blog-link-danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BlogPage

