// Types
export interface Coordinator {
  id: string
  name: string
  role: string
  department?: string
  year?: string
  description?: string
  image?: string
  social?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
}

export interface Event {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  location?: string
  image?: string
  registrationLink?: string
  category?: string
}

export interface Blog {
  id: string
  title: string
  author: string
  date: string
  coverImage?: string
  content: string
  excerpt?: string
  tags?: string[]
  category?: string
}

export interface Activity {
  id: string
  title: string
  description: string
  date?: string
  category?: string
  image?: string
  details?: string
}

export interface Member {
  id: string
  name: string
  email: string
  joinDate: string
  role?: string
}
