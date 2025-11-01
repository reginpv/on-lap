'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PAGINATION_PER_PAGE } from '@/config/constants'

export default function Pagination({
  totalCount,
  currentPage,
  perPage,
}: {
  totalCount: number
  currentPage: number
  perPage?: number
}) {
  const totalPages = Math.ceil(totalCount / perPage || PAGINATION_PER_PAGE)
  if (totalPages <= 1) return null

  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  const searchParams = useSearchParams()
  const searchParamsString = searchParams.toString()
  const paramsNoPage = searchParamsString
    .replace(/page=\d+&?/, '')
    .replace(/&$/, '')

  // Pagination range window
  const maxPagesToShow = 5
  const currentGroup = Math.floor((currentPage - 1) / maxPagesToShow)
  const startPage = currentGroup * maxPagesToShow + 1
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages)
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  return (
    <div className="flex items-center justify-between">
      <div>
        <Link
          href={`?${paramsNoPage}&page=${+currentPage - 1 || 1}`}
          className={`${
            hasPreviousPage
              ? `button--info`
              : `button--default pointer-events-none opacity-50`
          } button`}
        >
          <ChevronLeft className="inline h-4 w-4" />
          <span className="hidden sm:flex">Prev</span>
        </Link>
      </div>

      <div className="items-center gap-px inline-flex">
        {pageNumbers.map((pageNum) => (
          <Link
            key={pageNum}
            href={`?${paramsNoPage}&page=${pageNum}`}
            className={`button aspect-square min-w-12 ${
              currentPage == pageNum ? 'button--info' : 'button--default'
            }`}
          >
            {pageNum}
          </Link>
        ))}
      </div>

      <div>
        <Link
          href={`?${paramsNoPage}&page=${+currentPage + 1}`}
          className={`${
            hasNextPage
              ? `button--info`
              : `button--default pointer-events-none opacity-50`
          } button button--xl button--rounded`}
        >
          <span className="hidden sm:flex">Next</span>
          <ChevronRight className="inline h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
