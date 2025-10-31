'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { createUser } from '@/lib/actions/user'
import { useRouter } from 'next/navigation'
import { ActionResponse } from '@/types/actions'

export default function FormSignup({ className }: { className?: string }) {
  // Initial state
  const initialState: ActionResponse = {
    success: false,
    message: null,
    payload: null,
    errors: null,
  }

  // Hooks
  const { push: redirect } = useRouter()

  //
  const formRef = useRef<HTMLFormElement>(null)

  // States
  const [state, handleSubmit, pending] = useActionState(
    createUser,
    initialState
  )
  const [selectedRole, setSelectedRole] = useState('STUDENT')

  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset()
      // NOTE:
      // Use delay 1000 to show form message before redirect
      //
      setTimeout(() => {
        redirect('/login')
      }, 1000)
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      noValidate
      className={`flex flex-col gap-5 ${className}`}
    >
      <div className="form-control">
        <label>Full name</label>
        <input
          required
          type="text"
          name="name"
          defaultValue={state?.input?.name}
          placeholder="John Thomas"
          className={`input w-full`}
        />
        {state?.errors?.name && <p className="error">{state?.errors?.name}</p>}
      </div>

      <div className="form-control">
        <label>Email address</label>
        <input
          required
          type="email"
          name="email"
          defaultValue={state?.input?.email}
          placeholder="johnthomas@email.com"
          className={`input w-full`}
        />
        {state?.errors?.email && (
          <p className="error">{state?.errors?.email}</p>
        )}
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          placeholder="********"
          className={`input w-full`}
        />
        {state?.errors?.password && (
          <p className="error">{state?.errors?.password}</p>
        )}
      </div>

      {/** Group radio button */}
      <div className="form-control flex gap-1">
        {[
          {
            label: 'student',
            value: 'STUDENT',
            emoji: '🧑🏻',
          },
          {
            label: 'teacher',
            value: 'TEACHER',
            emoji: '🧑‍🏫',
          },
        ].map((role) => (
          <label
            htmlFor={role.value}
            key={role.value}
            className={`animated ml-0! mb-0! flex-1 p-3 flex items-center gap-1 justify-center  cursor-pointer text-center capitalize ${
              role.value === selectedRole
                ? 'bg-green-200 text-green-500 font-bold opacity-100'
                : 'bg-secondary opacity-50 grayscale-100 hover:grayscale-10'
            }`}
            onClick={() => setSelectedRole(role.value)}
          >
            <input
              id={role.value}
              type="radio"
              name="role"
              defaultValue={role.value}
              className="hidden"
              readOnly
              checked={role.value === selectedRole}
            />
            <span>{role.emoji}</span>
            <span>{role.label}</span>
          </label>
        ))}
      </div>

      <div>
        {state?.message && (
          <div
            className={`alert ${
              state.success ? `alert--success` : `alert--danger`
            }`}
          >
            {state?.message}
          </div>
        )}
        <button type="submit" className="w-full my-3" disabled={pending}>
          {pending ? 'Please wait...' : 'Signup'}
        </button>
      </div>
    </form>
  )
}
