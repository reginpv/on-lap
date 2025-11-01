'use client'

import LogoAside from '@/components/globals/LogoAside'
import { useAside } from '@/store/useAside'
import { adminMenuAside } from '@/config/menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminAside() {
  // Hooks
  const pathname = usePathname()

  // Store
  const minimize = useAside((state) => state.minimize)

  return (
    <aside
      className={`hidden md:block dark:bg-gray-800 dark:text-white ${
        minimize ? 'w-20' : 'w-64'
      } animated border-r border-gray-200 dark:border-gray-900 bg-gray-100`}
    >
      <LogoAside />

      {/** Body */}
      <div className="px-5 py-3">
        <div>
          <ul className="flex flex-col gap-2">
            {adminMenuAside.map(
              (item: { label: string; href: string; icon: any }, i: number) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center gap-3 hover:bg-gray-200 dark:hover:bg-gray-700 animated px-2 ${
                      minimize ? 'rounded-full' : 'rounded py-2'
                    } ${
                      pathname === item.href
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : ''
                    }`}
                  >
                    <span className={minimize ? 'button button--circle' : ''}>
                      <item.icon />
                    </span>
                    <span className={`flex-1 ${minimize ? 'hidden' : ''}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </aside>
  )
}
