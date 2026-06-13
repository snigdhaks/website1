import { Blog } from '@/types'
import {
  fetchStrapi,
  normalizeStrapiArray,
  normalizeStrapiItem,
} from './strapi'

export const blogService = {
  async getAll(): Promise<Blog[]> {
    try {
      const response = await fetchStrapi('/api/blogs?populate=*')
      if (response) {
        return normalizeStrapiArray<Blog>(response)
      }
      return []
    } catch (error) {
      console.error('Error fetching blogs from Strapi:', error)
      return []
    }
  },

  async getById(id: string): Promise<Blog | null> {
    try {
      if (/^\d+$/.test(id)) {
        const listResponse = await fetchStrapi(`/api/blogs?filters[id][$eq]=${id}&populate=*`)
        if (listResponse && listResponse.data && listResponse.data.length > 0) {
          return normalizeStrapiItem<Blog>(listResponse.data[0])
        }
      }
      const response = await fetchStrapi(`/api/blogs/${id}?populate=*`)
      if (response && response.data) {
        return normalizeStrapiItem<Blog>(response.data)
      }
      return null
    } catch (error) {
      console.error(`Error fetching blog by ID ${id} from Strapi:`, error)
      return null
    }
  },

  async getLatest(limit = 6): Promise<Blog[]> {
    try {
      const blogs = await this.getAll()
      return blogs
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit)
    } catch (error) {
      console.error('Error fetching latest blogs:', error)
      return []
    }
  },

  async getByTag(tag: string): Promise<Blog[]> {
    try {
      const blogs = await this.getAll()
      return blogs.filter((b) => b.tags?.includes(tag))
    } catch (error) {
      console.error('Error filtering blogs by tag:', error)
      return []
    }
  },

  async getByCategory(category: string): Promise<Blog[]> {
    try {
      const blogs = await this.getAll()
      return blogs.filter((b) => b.category === category)
    } catch (error) {
      console.error('Error filtering blogs by category:', error)
      return []
    }
  },

  async search(query: string): Promise<Blog[]> {
    try {
      const blogs = await this.getAll()
      const lowerQuery = query.toLowerCase()
      return blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(lowerQuery) ||
          b.content.toLowerCase().includes(lowerQuery) ||
          b.author.toLowerCase().includes(lowerQuery)
      )
    } catch (error) {
      console.error('Error searching blogs:', error)
      return []
    }
  },
}
