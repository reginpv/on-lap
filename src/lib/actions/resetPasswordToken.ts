'use server'

import prisma from '@/lib/prisma'

const table = 'resetPasswordToken'

// GET ONE
export async function getResetPasswordToken(email: string, token: string) {
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

    if (!data) {
      return {
        success: false,
        payload: null,
        message: 'Token not found.',
      }
    }

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
