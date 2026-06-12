import { Coordinator } from '@/types'

const COORDINATORS_URL = '/data/coordinators.json'

export const coordinatorService = {
  async getAll(): Promise<Coordinator[]> {
    try {
      const response = await fetch(COORDINATORS_URL)
      if (!response.ok) throw new Error('Failed to fetch coordinators')
      return await response.json()
    } catch (error) {
      console.error('Error fetching coordinators:', error)
      return []
    }
  },

  async getById(id: string): Promise<Coordinator | null> {
    try {
      const coordinators = await this.getAll()
      return coordinators.find((c) => c.id === id) || null
    } catch (error) {
      console.error('Error fetching coordinator:', error)
      return null
    }
  },

  async getByRole(role: string): Promise<Coordinator[]> {
    try {
      const coordinators = await this.getAll()
      return coordinators.filter((c) => c.role === role)
    } catch (error) {
      console.error('Error filtering coordinators:', error)
      return []
    }
  },
}
