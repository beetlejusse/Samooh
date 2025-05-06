export interface UserType {
    name: string
    email: string
    username?: string
    avatar?: string
    bio?: string
    phoneNumber?: string
    dateOfBirth?: string
    gender?: string
    collegeName?: string
    department?: string
    graduationYear?: number
    skills?: string[]
    address?: {
      street?: string
      city?: string
      state?: string
      country?: string
      postalCode?: string
    }
    socialMedia?: {
      instagram?: string
      twitter?: string
      linkedin?: string
      github?: string
      website?: string
    }
  }