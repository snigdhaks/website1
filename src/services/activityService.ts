import { Activity } from '@/types'
import {
  fetchStrapi,
  normalizeStrapiArray,
  normalizeStrapiItem,
} from './strapi'

export const activityService = {
  async getAll(): Promise<Activity[]> {
    try {
      const response = await fetchStrapi('/api/activities?populate=*')
      if (response) {
        return normalizeStrapiArray<Activity>(response)
      }
      return []
    } catch (error) {
      console.error('Error fetching activities from Strapi:', error)
      return []
    }
  },

  async getById(id: string): Promise<Activity | null> {
    try {
      if (/^\d+$/.test(id)) {
        const listResponse = await fetchStrapi(`/api/activities?filters[id][$eq]=${id}&populate=*`)
        if (listResponse && listResponse.data && listResponse.data.length > 0) {
          return normalizeStrapiItem<Activity>(listResponse.data[0])
        }
      }
      const response = await fetchStrapi(`/api/activities/${id}?populate=*`)
      if (response && response.data) {
        return normalizeStrapiItem<Activity>(response.data)
      }
      return null
    } catch (error) {
      console.error(`Error fetching activity by ID ${id} from Strapi:`, error)
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
