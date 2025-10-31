import { JWT } from 'next-auth/jwt'

export type Token = JWT & {
  role?: string
}
