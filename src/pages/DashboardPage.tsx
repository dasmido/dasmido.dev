import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { clearAuthToken, fetchCurrentUser, getAuthToken, login, register, type AuthUser } from '../api/auth'
import {
  createBlog,
  deleteBlog,
  fetchManageBlogs,
  updateBlog,
  type BlogManageItem,
  type BlogMutationInput,
} from '../api/blogs'

const INITIAL_FORM: BlogMutationInput = {
  title: '',
  content: '',
  published: true,
}

function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const [posts, setPosts] = useState<BlogManageItem[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [postsError, setPostsError] = useState<string | null>(null)

  const [form, setForm] = useState<BlogMutationInput>(INITIAL_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return editingId === null ? 'Creating...' : 'Saving...'
    }
    return editingId === null ? 'Create post' : 'Save changes'
  }, [editingId, isSubmitting])

  const loadPosts = useCallback(async () => {
    setIsLoadingPosts(true)
    try {
      const data = await fetchManageBlogs()
      setPosts(data)
      setPostsError(null)
    } catch {
      setPostsError('Could not load posts. Please login again.')
    } finally {
      setIsLoadingPosts(false)
    }
  }, [])

  useEffect(() => {
    async function bootstrap() {
      if (!getAuthToken()) {
        return
      }

      try {
        const me = await fetchCurrentUser()
        setUser(me)
      } catch {
        clearAuthToken()
      }
    }

    void bootstrap()
  }, [])

  useEffect(() => {
    if (!user) {
      setPosts([])
      return
    }

    void loadPosts()
  }, [user, loadPosts])

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAuthError(null)
    setIsAuthLoading(true)

    try {
      const email = authEmail.trim().toLowerCase()
      if (isRegisterMode) {
        await register(email, authPassword)
      }

      await login(email, authPassword)
      const me = await fetchCurrentUser()
      setUser(me)
      setAuthPassword('')
    } catch {
      setAuthError(isRegisterMode ? 'Unable to register user.' : 'Invalid email or password.')
    } finally {
      setIsAuthLoading(false)
    }
  }

  const handleLogout = () => {
    clearAuthToken()
    setUser(null)
    setEditingId(null)
    setForm(INITIAL_FORM)
  }

  const handleCreateOrUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
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

    try {
      if (editingId === null) {
        await createBlog(payload)
      } else {
        await updateBlog(editingId, payload)
      }
      setEditingId(null)
      setForm(INITIAL_FORM)
      await loadPosts()
    } catch {
      setFormError('Could not save post.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const startEdit = (post: BlogManageItem) => {
    setEditingId(post.id)
    setForm({
      title: post.title,
      content: post.content,
      published: post.published,
    })
  }

  const removePost = async (postId: number) => {
    if (!window.confirm('Delete this post permanently?')) {
      return
    }

    try {
      await deleteBlog(postId)
      if (editingId === postId) {
        setEditingId(null)
        setForm(INITIAL_FORM)
      }
      await loadPosts()
    } catch {
      setPostsError('Could not delete post.')
    }
  }

  if (!user) {
    return (
      <section className="section-shell section-block route-page">
        <p className="eyebrow">Dashboard</p>
        <h1>Blog Admin Login</h1>
        <form className="blog-editor" onSubmit={handleAuthSubmit}>
          <label className="blog-editor-label" htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            className="blog-editor-input"
            type="email"
            value={authEmail}
            onChange={(event) => setAuthEmail(event.target.value)}
            required
          />

          <label className="blog-editor-label" htmlFor="auth-password">
            Password
          </label>
          <input
            id="auth-password"
            className="blog-editor-input"
            type="password"
            value={authPassword}
            onChange={(event) => setAuthPassword(event.target.value)}
            minLength={8}
            required
          />

          <div className="blog-editor-actions">
            <button className="btn btn-primary" type="submit" disabled={isAuthLoading}>
              {isAuthLoading ? 'Please wait...' : isRegisterMode ? 'Register & Login' : 'Login'}
            </button>
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setIsRegisterMode((current) => !current)}
              disabled={isAuthLoading}
            >
              {isRegisterMode ? 'Use existing account' : 'Create account'}
            </button>
          </div>
          {authError ? <p className="blog-editor-error">{authError}</p> : null}
        </form>
      </section>
    )
  }

  return (
    <section className="section-shell section-block route-page">
      <div className="blog-head">
        <p className="eyebrow">Dashboard</p>
        <h1>Manage blog posts</h1>
        <p>Logged in as {user.email}</p>
        <button type="button" className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form className="blog-editor" onSubmit={handleCreateOrUpdate}>
        <label className="blog-editor-label" htmlFor="dashboard-title">
          Title
        </label>
        <input
          id="dashboard-title"
          className="blog-editor-input"
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          maxLength={255}
          required
        />

        <label className="blog-editor-label" htmlFor="dashboard-content">
          Content
        </label>
        <textarea
          id="dashboard-content"
          className="blog-editor-textarea"
          value={form.content}
          onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
          rows={8}
          required
        />

        <label className="blog-editor-checkbox">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))}
          />
          Published
        </label>

        <div className="blog-editor-actions">
          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {submitLabel}
          </button>
          {editingId !== null ? (
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => {
                setEditingId(null)
                setForm(INITIAL_FORM)
              }}
              disabled={isSubmitting}
            >
              Cancel edit
            </button>
          ) : null}
        </div>
        {formError ? <p className="blog-editor-error">{formError}</p> : null}
      </form>

      {isLoadingPosts ? <p>Loading posts...</p> : null}
      {postsError ? <p>{postsError}</p> : null}

      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id} className="blog-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <p>{post.published ? 'Published' : 'Draft'}</p>
            <div className="blog-card-actions">
              <button type="button" className="text-link blog-link-button" onClick={() => startEdit(post)}>
                Edit
              </button>
              <button
                type="button"
                className="text-link blog-link-button blog-link-danger"
                onClick={() => void removePost(post.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DashboardPage

