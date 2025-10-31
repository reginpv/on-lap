// @/types/actions.ts

// Generic Server Action Response
export type ActionResponse<T = any> = {
  success: boolean
  payload: T
  message: string
  totalCount?: number
  errors?: Record<string, string>
  input?: Record<string, any>
}
