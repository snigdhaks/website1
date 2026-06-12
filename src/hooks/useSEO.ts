import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  canonical?: string
  author?: string
}

export const useSEO = ({
  title,
  description,
  keywords = 'Rotaract, MEC Thrikkakara, Community Service, Leadership, Volunteer',
  ogTitle,
  ogDescription,
  ogType = 'website',
  canonical,
  author = 'Rotaract Club MEC Thrikkakara',
}: SEOProps) => {
  useEffect(() => {
    // Set title
    document.title = `${title} | Rotaract Club MEC`

    // Set description
    const descriptionMeta = document.querySelector('meta[name="description"]')
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = description
      document.head.appendChild(meta)
    }

    // Set keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]')
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', keywords)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content = keywords
      document.head.appendChild(meta)
    }

    // Set author
    const authorMeta = document.querySelector('meta[name="author"]')
    if (authorMeta) {
      authorMeta.setAttribute('content', author)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'author'
      meta.content = author
      document.head.appendChild(meta)
    }

    // Set OG tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]')
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', ogTitle || title)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:title')
      meta.content = ogTitle || title
      document.head.appendChild(meta)
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]')
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', ogDescription || description)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:description')
      meta.content = ogDescription || description
      document.head.appendChild(meta)
    }

    const ogTypeMeta = document.querySelector('meta[property="og:type"]')
    if (ogTypeMeta) {
      ogTypeMeta.setAttribute('content', ogType)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('property', 'og:type')
      meta.content = ogType
      document.head.appendChild(meta)
    }

    // Set canonical
    if (canonical) {
      const canonicalLink = document.querySelector('link[rel="canonical"]')
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical)
      } else {
        const link = document.createElement('link')
        link.rel = 'canonical'
        link.href = canonical
        document.head.appendChild(link)
      }
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogType, canonical, author])
}
