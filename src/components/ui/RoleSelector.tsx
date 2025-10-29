'use client'

import { useSession } from 'next-auth/react'

export default function RoleSelector() {
  // Hooks
  const { data: session } = useSession()
  const name = session?.user?.name
  const role = session?.user?.role

  if (!name || !role) return null

  return (
    <div className="flex flex-col">
      <span className="font-semibold capitalize leading-tight">
        {name.toLowerCase()}
      </span>
      <span className="text-xs capitalize">{role.toLowerCase()}</span>
    </div>
  )
}
