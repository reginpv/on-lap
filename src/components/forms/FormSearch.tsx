'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function FormSearch() {
  // Hooks
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // On submit append search query string with the current one
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const query = formData.get('search') as string

    const params = new URLSearchParams(searchParams.toString())
    params.set('search', query)

    router.push(`?${params.toString()}`)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
        <input
          type="text"
          placeholder="Search"
          name="search"
          className="rounded-l-md"
        />
        <button className="rounded-r-md">Go</button>
      </div>
    </form>
  )
}
