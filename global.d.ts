import "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare global {

  type User = import('@prisma/user').User

}