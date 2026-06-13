import { Coordinator } from '@/types'
import {
  fetchStrapi,
  normalizeStrapiArray,
  normalizeStrapiItem,
} from './strapi'

export const coordinatorService = {
  async getAll(): Promise<Coordinator[]> {
    try {
      const response = await fetchStrapi('/api/coordinators?populate=*')
      if (response) {
        return normalizeStrapiArray<Coordinator>(response)
      }
      return []
    } catch (error) {
      console.error('Error fetching coordinators from Strapi:', error)
      return []
    }
  },

  async getById(id: string): Promise<Coordinator | null> {
    try {
      if (/^\d+$/.test(id)) {
        const listResponse = await fetchStrapi(`/api/coordinators?filters[id][$eq]=${id}&populate=*`)
        if (listResponse && listResponse.data && listResponse.data.length > 0) {
          return normalizeStrapiItem<Coordinator>(listResponse.data[0])
        }
      }
      const response = await fetchStrapi(`/api/coordinators/${id}?populate=*`)
      if (response && response.data) {
        return normalizeStrapiItem<Coordinator>(response.data)
      }
      return null
    } catch (error) {
      console.error(`Error fetching coordinator by ID ${id} from Strapi:`, error)
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
