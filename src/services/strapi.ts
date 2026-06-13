export const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || ''
export const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || ''

export function isStrapiEnabled(): boolean {
  return typeof STRAPI_API_URL === 'string' && STRAPI_API_URL.trim() !== ''
}

export function getStrapiMediaUrl(url: string | undefined): string | undefined {
  if (!url) return url
  if (url.startsWith('http') || url.startsWith('data:')) return url
  return `${STRAPI_API_URL}${url}`
}

export function normalizeStrapiItem<T>(item: any): T {
  if (!item) return item
  const id = item.documentId ? String(item.documentId) : String(item.id)
  const attributes = item.attributes ? item.attributes : item
  const normalized: any = { id, ...attributes }

  // Automatically parse and normalize typical Strapi v4/v5 media properties
  for (const key of Object.keys(normalized)) {
    const value = normalized[key]
    if (value && typeof value === 'object') {
      if ('data' in value) {
        const mediaData = value.data
        if (mediaData && mediaData.attributes && typeof mediaData.attributes.url === 'string') {
          const mediaUrl = mediaData.attributes.url
          normalized[key] = mediaUrl.startsWith('http') ? mediaUrl : `${STRAPI_API_URL}${mediaUrl}`
        }
      } else if ('url' in value && typeof value.url === 'string') {
        const mediaUrl = value.url
        normalized[key] = mediaUrl.startsWith('http') ? mediaUrl : `${STRAPI_API_URL}${mediaUrl}`
      }
    } else if (typeof value === 'string' && (value.startsWith('/uploads/') || value.startsWith('uploads/'))) {
      normalized[key] = getStrapiMediaUrl(value.startsWith('/') ? value : `/${value}`)
    }
  }

  return normalized as T
}

export function normalizeStrapiArray<T>(response: any): T[] {
  if (!response || !response.data) return []
  const data = response.data
  if (Array.isArray(data)) {
    return data.map((item: any) => normalizeStrapiItem<T>(item))
  }
  return []
}

export async function fetchStrapi(endpoint: string): Promise<any> {
  if (!isStrapiEnabled()) return null

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`
  }

  const response = await fetch(`${STRAPI_API_URL}${endpoint}`, { headers })
  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.statusText}`)
  }
  return await response.json()
}
