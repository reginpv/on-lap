'use server'

import prisma from '@/lib/prisma'
import { ResetPasswordToken } from '@prisma/client'

const table = 'resetPasswordToken'

// GET ONE
// Because Session returns ID as string, we need to parse it to integer
export async function getResetPasswordToken(
  _prevState: any,
  formData: FormData
) {
  const email = formData.get('email')?.toString().trim()
  const token = formData.get('token')?.toString().trim()

  if (!email || !token) {
    return {
      success: false,
      payload: null,
      message: 'Email and token are required.',
    }
  }

  try {
    const data = await prisma[table].findFirst({
      where: {
        email,
        token,
      },
    })

    if (data.expires < new Date()) {
      return {
        success: false,
        payload: null,
        message: 'Token has expired.',
      }
    }

    return {
      success: true,
      payload: data,
      message: 'Token fetched successfully.',
    }
  } catch (error) {
    return {
      success: false,
      payload: null,
      message: 'Failed to get token.',
    }
  }
}
