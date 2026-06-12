import { Activity } from '@/types'

const ACTIVITIES_URL = '/data/activities.json'

export const activityService = {
  async getAll(): Promise<Activity[]> {
    try {
      const response = await fetch(ACTIVITIES_URL)
      if (!response.ok) throw new Error('Failed to fetch activities')
      return await response.json()
    } catch (error) {
      console.error('Error fetching activities:', error)
      return []
    }
  },

  async getById(id: string): Promise<Activity | null> {
    try {
      const activities = await this.getAll()
      return activities.find((a) => a.id === id) || null
    } catch (error) {
      console.error('Error fetching activity:', error)
      return null
    }
  },

  async getByCategory(category: string): Promise<Activity[]> {
    try {
      const activities = await this.getAll()
      return activities.filter((a) => a.category === category)
    } catch (error) {
      console.error('Error filtering activities by category:', error)
      return []
    }
  },

  async getRecent(limit = 6): Promise<Activity[]> {
    try {
      const activities = await this.getAll()
      return activities
        .sort((a, b) => {
          if (!a.date || !b.date) return 0
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        .slice(0, limit)
    } catch (error) {
      console.error('Error fetching recent activities:', error)
      return []
    }
  },
}
