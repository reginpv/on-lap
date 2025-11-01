'use client'

import { useEffect, useActionState, useRef } from 'react'
import { createSubject, updateSubject } from '@/lib/actions/subject'
import { ActionResponse } from '@/types/actions'
import { Subject } from '@prisma/client'
import {
  ACADEMIC_LEVELS,
  SUBJECT_AREAS,
  SUBJECT_CATEGORIES,
  SUBJECT_DIFFICULTIES,
} from '@/config/subject'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

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
    input: null,
    message: null,
    payload: null,
    errors: null,
  }

  // Hooks
  const session = useSession()
  const { push: redirect } = useRouter()

  // Ref
  const formRef = useRef<HTMLFormElement>(null)

  // State

  // Form
  const [state, handleSubmit, isPending] = useActionState(
    s ? updateSubject : createSubject,
    initialState
  )

  //
  useEffect(() => {
    console.log('state: ', state)
    if (state.success) {
      formRef.current?.reset()
      // Wait 1000
      setTimeout(() => {
        const role = session?.data?.user?.role
        const path = ['SUPERADMIN', 'ADMIN'].includes(role)
          ? '/admin'
          : ['TEACHER'].includes(role)
          ? '/teacher'
          : ['STUDENT'].includes(role)
          ? '/student'
          : '/user' // TODO: <-- fix this

        // Redirect
        redirect(`${path}/dashboard/subject`)
      }, 1000)
    } else {
      // Update fields to make sticky form
      if (state.input) {
        // select input
        formRef.current?.querySelectorAll('select').forEach((select) => {
          select.value = state.input[select.name]
        })
      }
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className={`p-5 md:p-10 mx-auto flex justify-center ${className}`}
      noValidate
      data-loading={isPending}
    >
      <div className="flex flex-col gap-5">
        {/*  */}
        <div className=" w-full flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Subject Name */}
            <div className="form-control flex-1">
              <label htmlFor="name">Subject name</label>
              <div className="flex relative">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="General Biology 1"
                  defaultValue={state?.input?.name ?? s?.name}
                  className={`w-full! ${
                    state.errors?.name ? 'has-errors' : ''
                  }`}
                  disabled={isPending}
                />
              </div>
              {/* Field Alert */}
              {state.errors?.name && (
                <div className="error">{state.errors.name}</div>
              )}
            </div>

            {/* Subject Code */}
            <div className="form-control flex-1">
              <label htmlFor="code">Subject code</label>
              <div className="flex relative">
                <input
                  id="code"
                  type="text"
                  name="code"
                  placeholder="BIO101"
                  defaultValue={state?.input?.code ?? s?.code}
                  className={`w-full! ${
                    state.errors?.name ? 'has-errors' : ''
                  }`}
                  disabled={isPending}
                />
              </div>
              {/* Field Alert */}
              {state.errors?.name && (
                <div className="error">{state.errors.name}</div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="What is this subject about?"
              defaultValue={state?.input?.description ?? s?.description}
              disabled={isPending}
            />
            {/* Field Alert */}
            {state.errors?.description && (
              <div className="error">{state?.errors?.description}</div>
            )}
          </div>

          {/** Category and area  */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* Subject category */}
            <div className="form-control flex-1">
              <label htmlFor="category">
                Subject category {state?.input?.category}
              </label>
              <div className="flex relative">
                <select
                  id="category"
                  name="category"
                  defaultValue={state?.input?.category ?? s?.category ?? ''}
                  className={`w-full! ${
                    state.errors?.category ? 'has-errors' : ''
                  }`}
                  disabled={isPending}
                >
                  <option value="">Select category</option>
                  {SUBJECT_CATEGORIES.map((category, i) => (
                    <option key={i} value={category.value} className="">
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Field Alert */}
              {state.errors?.category && (
                <div className="error">{state.errors.category}</div>
              )}
            </div>

            {/* Subject area */}
            <div className="form-control flex-1">
              <label htmlFor="area">Subject area</label>
              <div className="flex relative">
                <select
                  id="area"
                  name="area"
                  defaultValue={state?.input?.area ?? s?.area ?? ''}
                  className={`w-full! ${
                    state.errors?.area ? 'has-errors' : ''
                  }`}
                  disabled={isPending}
                >
                  <option value="">Select area</option>
                  {SUBJECT_AREAS.map((area) => (
                    <option key={area.value} value={area.value}>
                      {area.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Field Alert */}
              {state.errors?.area && (
                <div className="error">{state.errors.area}</div>
              )}
            </div>
          </div>

          {/** LEVEL & DIFF */}
          <div className="flex flex-col md:flex-row gap-5">
            {/* Subject level */}
            <div className="form-control flex-1">
              <label htmlFor="level">Academic level</label>
              <div className="flex relative">
                <select
                  id="level"
                  name="level"
                  defaultValue={state?.input?.level ?? s?.level ?? ''}
                  className={`w-full! ${
                    state.errors?.level ? 'has-errors' : ''
                  }`}
                  disabled={isPending}
                >
                  <option value="">Select level</option>
                  {ACADEMIC_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Field Alert */}
              {state.errors?.level && (
                <div className="error">{state?.errors?.level}</div>
              )}
            </div>

            {/* Subject difficulty */}
            <div className="form-control flex-1">
              <label htmlFor="difficulty">Subject difficulty</label>
              <div className="flex relative">
                <select
                  id="difficulty"
                  name="difficulty"
                  defaultValue={state?.input?.difficulty ?? s?.difficulty ?? ''}
                  className={`w-full! ${
                    state.errors?.difficulty ? 'has-errors' : ''
                  }`}
                  disabled={isPending}
                >
                  <option value="">Select difficulty</option>
                  {SUBJECT_DIFFICULTIES.map((difficulty) => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>
              {/* Field Alert */}
              {state?.errors?.difficulty && (
                <div className="error">{state?.errors?.difficulty}</div>
              )}
            </div>
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

          {/** Hiddens */}
          {s && <input type="hidden" name="id" value={s.id} />}

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
