import { Event } from '@/types'

const EVENTS_URL = '/data/events.json'

export const eventService = {
  async getAll(): Promise<Event[]> {
    try {
      const response = await fetch(EVENTS_URL)
      if (!response.ok) throw new Error('Failed to fetch events')
      return await response.json()
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  },

  async getById(id: string): Promise<Event | null> {
    try {
      const events = await this.getAll()
      return events.find((e) => e.id === id) || null
    } catch (error) {
      console.error('Error fetching event:', error)
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
