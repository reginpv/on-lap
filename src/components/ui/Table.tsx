'use client'

import { format } from 'date-fns'
import React from 'react'
import { DEFAULT_DATE_FORMAT } from '@/config/constants'

export default function Table({
  className = '',
  data,
  columns = [],
}: {
  className?: string
  data?: any[]
  columns?: {
    Header: string
    accessor: string
    dataType?: string | React.Component
    className?: string
  }[]
}) {
  return (
    <div
      className={`border-t border-l border-r border-secondary overflow-x-auto ${className}`}
    >
      <table className="table table--default">
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i} className={column?.className}>
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-sm text-gray-500"
              >
                There is no available data.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                id={row.id}
                key={i}
                className="even:bg-secondary hover:bg-white hover:dark:bg-gray-500 animated"
              >
                {columns.map((column, j) => (
                  <td key={j} className={`${column?.className ?? ''}`}>
                    {column.dataType === 'date' && row[column.accessor]
                      ? format(
                          new Date(row[column.accessor]),
                          DEFAULT_DATE_FORMAT
                        )
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
