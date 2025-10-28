'use client'

import { Menu } from 'lucide-react'
import { useAside } from '@/store/useAside'
import Logo from '@/components/globals/Logo'

export default function LogoAside() {
  // Store
  const toggleMinimize = useAside((state) => state.toggleMinimize)
  const minimize = useAside((state) => state.minimize)

  return (
    <div className="font-bold px-5 py-2 h-16 flex items-center justify-between gap-1 border-b border-gray-200 dark:border-gray-900">
      {!minimize && <Logo />}
      <button onClick={toggleMinimize} className="button button--circle">
        <Menu size={24} />
      </button>
    </div>
  )
}
