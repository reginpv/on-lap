'use server'

import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { revalidateTag, unstable_cache as nextCache } from 'next/cache'
import { ActionResponse } from '@/types/actions'
import { cache } from 'react'
import { Role } from '@prisma/client'

const table = 'user'

// GET ONE
// Because Session returns ID as string, we need to parse it to integer
export const getUser = cache(async (id: string): Promise<ActionResponse> => {
  const data = await nextCache(
    async () => {
      try {
        const user = await prisma[table].findFirst({
          where: {
            id: +id,
            deletedAt: null,
          },
        })

        console.log(`---DB HIT: GET USER with ID: ${id} from database---`)

        if (!user) {
          return {
            success: true,
            payload: null,
            message: 'No user found!',
          }
        }

        return {
          success: true,
          payload: user,
          message: 'User fetched successfully!',
        }
      } catch (error) {
        console.error('[getUser | Prisma | Error]:', error)
        return {
          success: false,
          payload: null,
          message: 'Failed to get user',
        }
      }
    },
    ['user', id],
    {
      tags: ['user', table, 'cache'],
    }
  )()

  return data
})

// GET ALL
export const getUsers = cache(async (): Promise<ActionResponse> => {
  const data = await nextCache(
    async () => {
      try {
        const users = await prisma[table].findMany({
          where: {
            deletedAt: null,
          },
        })

        console.log(`---DB HIT: GET ALL USERS from database---`)

        if (!users || users.length === 0) {
          return {
            success: true,
            payload: [],
            message: 'No users found!',
          }
        }

        return {
          success: true,
          payload: users,
          message: 'Users fetched successfully!',
        }
      } catch (error) {
        console.error('[getUsers | Prisma | Error]:', error)
        return {
          success: false,
          payload: null,
          message: 'Failed to get users',
        }
      }
    },
    ['users'],
    {
      tags: ['users', table, 'cache'],
    }
  )()

  return data
})

// CREATE
export async function createUser(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const name = formData.get('name')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const password = formData.get('password')?.toString().trim()
  const role = formData.get('role')?.toString().trim() as Role

  // Validate

  // Check for missing required fields
  const requiredFields = ['name', 'email', 'password', 'role'] as const
  type Field = (typeof requiredFields)[number]
  let errors: { [key in Field]?: string } = {}
  requiredFields.forEach((field) => {
    if (!formData.get(field)?.toString().trim()) {
      errors[field] = `${field} is required.`
    }
  })

  // Has error, return data
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      payload: null,
      message: null,
      input: {
        name,
        email,
        role,
      },
    }
  }

  try {
    // Check if email already exists
    const userExist = await prisma[table].findFirst({
      where: {
        email: email,
      },
    })

    // If email already exists, return error
    if (userExist) {
      return {
        success: false,
        message: `Email ${email} already exists.`,
        payload: null,
        input: {
          name,
          email,
          role,
        },
      }
    }

    // Create user
    const user = await prisma[table].create({
      data: {
        name,
        email,
        role,
        password: await hash(password, 12),
      },
    })

    // Revalidate cache tags
    revalidateTag('users')
    revalidateTag(table)

    return {
      success: true,
      message: 'User created successfully',
      payload: user,
    }
  } catch (error) {
    console.log('User create error: ', error)
    return {
      success: false,
      payload: null,
      message: 'Failed to create user. Please contact admin.',
    }
  }
}

// DELETE
export async function deleteUser(id: string) {
  try {
    const user = await prisma[table].update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    })

    // Revalidate cache tags
    revalidateTag('users')
    revalidateTag('user')

    return {
      success: true,
      payload: user,
      message: 'User deleted successfully',
    }
  } catch (error) {
    console.error('[deleteUser | Prisma | Error]:', error)
    return {
      success: false,
      payload: null,
      message: 'Failed to delete user',
    }
  }
}
