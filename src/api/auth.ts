const DEFAULT_PRODUCTION_API_BASE_URL = 'https://api-dasmido.sliplane.app'
const AUTH_TOKEN_STORAGE_KEY = 'blog-admin-token'

function normalizeApiBaseUrl(value: string): string {
  return value
    .trim()
    .replace(/\/$/, '')
    .replace(/\/api\/auth$/, '')
    .replace(/\/api$/, '')
}

function resolveApiBaseUrl(): string {
  const configuredBaseUrl = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL ?? '')
  if (configuredBaseUrl) {
    return configuredBaseUrl
  }

  return DEFAULT_PRODUCTION_API_BASE_URL
}

const API_BASE_URL = resolveApiBaseUrl()

export type AuthUser = {
  id: number
  email: string
}

export type LoginResponse = {
  access_token: string
  token_type: string
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return (await response.json()) as T
}

export async function register(email: string, password: string): Promise<AuthUser> {
  return requestJson<AuthUser>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const data = await requestJson<LoginResponse>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  setAuthToken(data.access_token)
  return data
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const token = getAuthToken()
  if (!token) {
    throw new Error('No auth token')
  }

  return requestJson<AuthUser>('/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token)
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') {
    return
  }
  window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}

