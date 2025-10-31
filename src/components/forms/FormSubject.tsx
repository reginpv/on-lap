'use client'

import { useEffect, useState, useActionState, useRef } from 'react'
import Image from 'next/image'
import { updateMe } from '@/lib/actions/me'
import { useSession } from 'next-auth/react'
import { UserRoundPen } from 'lucide-react'
import { Trash } from 'lucide-react'
import { deleteMedia, uploadMedia } from '@/lib/actions/media'
import { ActionResponse } from '@/types/actions'
import { Subject } from '@prisma/client'

export default function FormSubject({
  s,
  className,
}: {
  s?: Subject
  className?: string
}) {
  // Initial state
  const initialState: ActionResponse = {
    success: false,
    message: null,
    payload: null,
    errors: null,
  }

  //
  const { data: session, update } = useSession()

  //
  const formRef = useRef<HTMLFormElement>(null)

  // States
  const [state, handleSubmit, isPending] = useActionState(
    updateMe,
    initialState
  )

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className={`p-5 md:p-10 mx-auto flex justify-center ${className}`}
      noValidate
      data-loading={isPending}
    >
      <div className="flex flex-col gap-5">
        {/* Profile Information */}
        <div className="profile-information-container mb-10 w-full flex flex-col gap-y-4">
          {/* Name */}
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <div className="flex relative">
              <input
                type="text"
                name="name"
                defaultValue={s?.name}
                className={`!w-full ${state.errors?.name ? 'has-errors' : ''}`}
                disabled={isPending}
              />
            </div>
            {/* Field Alert */}
            {state.errors?.name && (
              <div className="error">{state.errors.name}</div>
            )}
          </div>
          {/* Email Address */}
          <div className="form-control">
            <label htmlFor="email">Email Address</label>
            <input
              name="email"
              type="email"
              className={`!w-full ${state.errors?.name ? 'has-errors' : ''}`}
            />
          </div>
          {/* Role */}
          <div className="form-control opacity-30 cursor-not-allowed">
            <label htmlFor="role" className="cursor-not-allowed">
              Role
            </label>
            <input
              name="role"
              type="text"
              className={`!w-full cursor-not-allowed ${
                state.errors?.name ? 'has-errors' : ''
              }`}
              readOnly
            />
          </div>

          {state?.message && (
            <div
              className={`alert ${
                state.success ? 'alert--success' : 'alert--danger'
              }`}
            >
              {state.message}
            </div>
          )}

          {/* Save Button */}
          <button
            className={`button button--default flex justify-center my-3 ${
              isPending ? 'cursor-wait opacity-50' : 'cursor-pointer'
            }`}
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </form>
  )
}
