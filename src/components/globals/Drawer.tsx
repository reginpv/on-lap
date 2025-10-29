'use client'

import { useEffect, useRef } from 'react'
import { useDrawer } from '@/store/useDrawer'
import Link from 'next/link'
import Logo from '@/components/globals/Logo'
import { X, LayoutDashboard } from 'lucide-react'
import { menuAside } from '@/config/menu'

export default function Drawer() {
  // Refs
  const drawerRef = useRef<HTMLDivElement>(null)

  // Store
  const open = useDrawer((state) => state.show)
  const setShow = useDrawer((state) => state.setShow)
  const toggle = useDrawer((state) => state.toggleShow)

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setShow(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div
      ref={drawerRef}
      className={`${
        open
          ? 'w-64 z-10 opacity-100 border-r border-border'
          : 'w-0 -z-0 opacity-0'
      } fixed top-0 left-0 h-dvh max-w-64 animated overflow-hidden bg-secondary`}
    >
      {/* Header */}
      <div className="min-w-64 px-5 dark:border-gray-800">
        <div className="flex items-center justify-between gap-3 h-16">
          <h1 className="">
            <Logo />
          </h1>

          <button className="button button--circle -mr-3">
            <X onClick={toggle} />
          </button>
        </div>
      </div>

      {/** Body */}
      <div className="p-5">
        <div>
          <ul>
            {menuAside.map(
              (item: { label: string; href: string; icon: any }, i: number) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3"
                    onClick={() => setShow(!open)}
                  >
                    <span>
                      <item.icon />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
