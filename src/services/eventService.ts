import { Event } from '@/types'
import {
  fetchStrapi,
  normalizeStrapiArray,
  normalizeStrapiItem,
} from './strapi'

export const eventService = {
  async getAll(): Promise<Event[]> {
    try {
      const response = await fetchStrapi('/api/events?populate=*')
      if (response) {
        return normalizeStrapiArray<Event>(response)
      }
      return []
    } catch (error) {
      console.error('Error fetching events from Strapi:', error)
      return []
    }
  },

  async getById(id: string): Promise<Event | null> {
    try {
      if (/^\d+$/.test(id)) {
        const listResponse = await fetchStrapi(`/api/events?filters[id][$eq]=${id}&populate=*`)
        if (listResponse && listResponse.data && listResponse.data.length > 0) {
          return normalizeStrapiItem<Event>(listResponse.data[0])
        }
      }
      const response = await fetchStrapi(`/api/events/${id}?populate=*`)
      if (response && response.data) {
        return normalizeStrapiItem<Event>(response.data)
      }
      return null
    } catch (error) {
      console.error(`Error fetching event by ID ${id} from Strapi:`, error)
      return null
    }
  },

  async getUpcoming(): Promise<Event[]> {
    try {
      const events = await this.getAll()
      const now = new Date()
      return events
        .filter((e) => new Date(e.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } catch (error) {
      console.error('Error filtering upcoming events:', error)
      return []
    }
  },

  async getPast(): Promise<Event[]> {
    try {
      const events = await this.getAll()
      const now = new Date()
      return events
        .filter((e) => new Date(e.date) < now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
      console.error('Error filtering past events:', error)
      return []
    }
  },

  async getByCategory(category: string): Promise<Event[]> {
    try {
      const events = await this.getAll()
      return events.filter((e) => e.category === category)
    } catch (error) {
      console.error('Error filtering events by category:', error)
      return []
    }
  },
}
