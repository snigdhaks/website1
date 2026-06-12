import { Blog } from '@/types'

const BLOGS_URL = '/data/blogs.json'

export const blogService = {
  async getAll(): Promise<Blog[]> {
    try {
      const response = await fetch(BLOGS_URL)
      if (!response.ok) throw new Error('Failed to fetch blogs')
      return await response.json()
    } catch (error) {
      console.error('Error fetching blogs:', error)
      return []
    }
  },

  async getById(id: string): Promise<Blog | null> {
    try {
      const blogs = await this.getAll()
      return blogs.find((b) => b.id === id) || null
    } catch (error) {
      console.error('Error fetching blog:', error)
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
