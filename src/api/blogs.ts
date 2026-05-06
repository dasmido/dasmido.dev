export type ApiBlog = {
  id: number
  title: string
  content: string
  published: boolean
  created_at: string
  updated_at: string
}

export type BlogPreview = {
  id: number
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
}

export type BlogDetail = BlogPreview & {
  content: string
}

export type BlogMutationInput = {
  title: string
  content: string
  published: boolean
}

export type BlogManageItem = BlogDetail & {
  published: boolean
  updatedAt: string
}

const DEFAULT_PRODUCTION_API_BASE_URL = 'https://api-dasmido.sliplane.app'

function normalizeApiBaseUrl(value: string): string {
  return value
    .trim()
    .replace(/\/$/, '')
    .replace(/\/api\/blogs$/, '')
    .replace(/\/api$/, '')
}

function resolveApiBaseUrl(): string {
  const configuredBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL ?? '')
  if (configuredBaseUrl) {
    return configuredBaseUrl
  }

  if (typeof window === 'undefined') {
    return DEFAULT_PRODUCTION_API_BASE_URL
  }

  const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  if (isLocalhost) {
    return DEFAULT_PRODUCTION_API_BASE_URL // Updated to use production API base URL for consistency.
  }

  return DEFAULT_PRODUCTION_API_BASE_URL
}

const API_BASE_URL = resolveApiBaseUrl()
const BLOG_CATEGORY = 'Blog article'
const AUTH_TOKEN_STORAGE_KEY = 'blog-admin-token'

export const canManageBlogs = false

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

async function requestVoid(path: string, init: RequestInit): Promise<void> {
  const response = await fetch(`${API_BASE_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
}

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') {
    throw new Error('Authentication is only available in the browser')
  }

  const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  if (!token) {
    throw new Error('Missing auth token')
  }

  return {
    Authorization: `Bearer ${token}`,
  }
}

function formatPublishedAt(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function estimateReadTime(content: string): string {
  const words = stripMarkdown(content).split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

function buildExcerpt(content: string): string {
  const normalized = stripMarkdown(content).replace(/\s+/g, ' ').trim()
  if (normalized.length <= 140) {
    return normalized
  }

  return `${normalized.slice(0, 137).trimEnd()}...`
}

function stripMarkdown(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[`*_~>-]/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function toBlogPreview(blog: ApiBlog): BlogPreview {
  return {
    id: blog.id,
    title: blog.title,
    excerpt: buildExcerpt(blog.content),
    category: BLOG_CATEGORY,
    readTime: estimateReadTime(blog.content),
    publishedAt: formatPublishedAt(blog.created_at),
  }
}

function toBlogManageItem(blog: ApiBlog): BlogManageItem {
  return {
    ...toBlogPreview(blog),
    content: blog.content,
    published: blog.published,
    updatedAt: blog.updated_at,
  }
}

function byNewest(first: ApiBlog, second: ApiBlog): number {
  return new Date(second.created_at).getTime() - new Date(first.created_at).getTime()
}

export async function fetchBlogPreviews(): Promise<BlogPreview[]> {
  const blogs = await requestJson<ApiBlog[]>('/api/blogs?skip=0&limit=100')

  return blogs.filter((blog) => blog.published).sort(byNewest).map(toBlogPreview)
}

export async function fetchManageBlogs(): Promise<BlogManageItem[]> {
  const blogs = await requestJson<ApiBlog[]>('/api/blogs?skip=0&limit=100')

  return blogs.sort(byNewest).map(toBlogManageItem)
}

export async function fetchBlogDetail(blogId: number): Promise<BlogDetail> {
  const blog = await requestJson<ApiBlog>(`/api/blogs/${blogId}`)

  if (!blog.published) {
    throw new Error('Request failed with status 404')
  }

  return {
    ...toBlogPreview(blog),
    content: blog.content,
  }
}

export async function createBlog(payload: BlogMutationInput): Promise<BlogManageItem> {
  const blog = await requestJson<ApiBlog>('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  })

  return toBlogManageItem(blog)
}

export async function updateBlog(blogId: number, payload: BlogMutationInput): Promise<BlogManageItem> {
  const blog = await requestJson<ApiBlog>(`/api/blogs/${blogId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  })

  return toBlogManageItem(blog)
}

export async function deleteBlog(blogId: number): Promise<void> {
  await requestVoid(`/api/blogs/${blogId}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  })
}
