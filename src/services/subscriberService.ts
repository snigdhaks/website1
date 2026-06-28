import { fetchStrapi } from './strapi'

export const subscriberService = {
  async subscribe(email: string): Promise<{ success: boolean; message: string }> {
    try {
      await fetchStrapi('/api/subscribers', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            email,
          },
        }),
      })
      return { success: true, message: 'Thank you for subscribing to our blog!' }
    } catch (error: any) {
      console.error('Newsletter subscription error:', error)
      return {
        success: false,
        message: error.message || 'An unexpected error occurred. Please try again.',
      }
    }
  },
}
