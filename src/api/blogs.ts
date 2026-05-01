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

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const BLOG_CATEGORY = 'Blog article'

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
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

function byNewest(first: ApiBlog, second: ApiBlog): number {
  return new Date(second.created_at).getTime() - new Date(first.created_at).getTime()
}

export async function fetchBlogPreviews(): Promise<BlogPreview[]> {
  const blogs = await requestJson<ApiBlog[]>('/api/blogs?skip=0&limit=100')

  return blogs.filter((blog) => blog.published).sort(byNewest).map(toBlogPreview)
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

