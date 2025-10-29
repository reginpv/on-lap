// global.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role?: string | null
      image?: string | null
      name?: string | null
      email?: string | null
    }
  }

  interface User extends DefaultUser {
    id: string
    role?: string
    image?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role?: string
    image?: string
  }
}

// keep your global types (if needed)
declare global {
  type User = import('@prisma/client').User
}

export {}
