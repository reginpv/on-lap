'use server'

import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { revalidateTag, unstable_cache as nextCache } from 'next/cache'
import { ActionResponse } from '@/types/actions'
import { cache } from 'react'
import {
  SubjectCategory,
  SubjectArea,
  SubjectType,
  AcademicLevel,
  DifficultyLevel,
} from '@prisma/client'
import { PAGINATION_PER_PAGE } from '@/config/constants'

const table = 'subject'

// GET ONE
// Because Session returns ID as string, we need to parse it to integer
export const getSubject = cache(async (id: string): Promise<ActionResponse> => {
  const data = await nextCache(
    async () => {
      try {
        const subject = await prisma[table].findFirst({
          where: {
            id: +id,
            deletedAt: null,
          },
        })

        console.log(`---DB HIT: GET ${table} with ID: ${id} from database---`)

        if (!subject) {
          return {
            success: true,
            payload: null,
            message: 'No subject found!',
          }
        }

        return {
          success: true,
          payload: subject,
          message: 'Subject fetched successfully!',
        }
      } catch (error) {
        console.error('[getSubject | Prisma | Error]:', error)
        return {
          success: false,
          payload: null,
          message: 'Failed to get subject',
        }
      }
    },
    ['subject', id],
    {
      tags: [`subject-${id}`, table, 'cache'],
    }
  )()

  return data
})

// GET ALL
export const getSubjects = cache(
  async (
    page: number = 1,
    limit: number = PAGINATION_PER_PAGE,
    filter: string = ''
  ): Promise<ActionResponse> => {
    const data = await nextCache(
      async () => {
        try {
          let whereCondition = {
            deletedAt: null,
          }

          if (filter) {
            const f = JSON.parse(JSON.stringify(filter))
            whereCondition = {
              ...whereCondition,
              ...(f.search
                ? {
                    OR: [
                      { name: { contains: f.search } },
                      { code: { contains: f.search } },
                    ],
                  }
                : {}),
            }
          }

          console.log(`---DB HIT: GET ALL ${table} from database---`)

          const subjects = await Promise.all([
            prisma[table].count({
              where: whereCondition,
            }),
            prisma[table].findMany({
              where: whereCondition,
              orderBy: {
                id: 'desc',
              },
              skip: page ? (+page - 1) * limit : 0,
              ...(limit ? { take: limit } : {}),
            }),
          ])

          if (!subjects[1] || subjects[1].length === 0) {
            return {
              success: true,
              payload: [],
              message: 'No subjects found!',
            }
          }

          return {
            success: true,
            payload: subjects[1],
            totalCount: subjects[0],
            message: 'Subjects fetched successfully!',
          }
        } catch (error) {
          console.error('[getSubjects | Prisma | Error]:', error)
          return {
            success: false,
            payload: null,
            message: 'Failed to get subjects',
          }
        }
      },
      ['subjects', JSON.stringify({ page, limit, filter })],
      {
        tags: [
          'subjects',
          `subjects-${JSON.stringify({ page, limit, filter })}`,
          table,
          'cache',
        ],
      }
    )()

    return data
  }
)

// CREATE
export async function createSubject(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const name = formData.get('name')?.toString().trim()
  const code = formData.get('code')?.toString().trim()
  const category = formData
    .get('category')
    ?.toString()
    .trim() as SubjectCategory
  const description = formData.get('description')?.toString().trim()
  const area = formData.get('area')?.toString().trim() as SubjectArea
  const level = formData.get('level')?.toString().trim() as AcademicLevel

  const difficulty = formData
    .get('difficulty')
    ?.toString()
    .trim() as DifficultyLevel

  // Validate

  // Check for missing required fields
  const requiredFields = [
    'name',
    'code',
    'description',
    'category',
    'area',
    'level',
    'difficulty',
  ] as const
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
        code,
        category,
        description,
        area,
        level,
        difficulty,
      },
    }
  }

  try {
    // Check if email already exists
    const subjectExist = await prisma[table].findFirst({
      where: {
        code,
      },
    })

    // If email already exists, return error
    if (subjectExist) {
      return {
        success: false,
        message: `Code ${code} already exists.`,
        payload: null,
        input: {
          name,
          code,
          category,
          description,
          area,
          level,
          difficulty,
        },
      }
    }

    // Create user
    const user = await prisma[table].create({
      data: {
        name,
        code,
        category,
        description,
        area,
        level,
        difficulty,
      },
    })

    // Revalidate cache tags
    revalidateTag('subjects')
    revalidateTag(table)

    return {
      success: true,
      message: 'Subject created successfully',
      payload: user,
    }
  } catch (error) {
    console.log('Subject create error: ', error)
    return {
      success: false,
      payload: null,
      message: 'Failed to create Subject. Please contact admin.',
      input: {
        name,
        code,
        category,
        description,
        area,
        level,
        difficulty,
      },
    }
  }
}

// DELETE SUBJECT
export async function deleteSubject(id: string) {
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
