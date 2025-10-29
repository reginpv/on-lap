import Link from 'next/link'
import DrawerProfile from '@/components/globals/DrawerProfile'
import ButtonDrawer from '@/components/ui/ButtonDrawer'
import RoleSelector from '../ui/RoleSelector'

export default function HeaderDashboard() {
  return (
    <header className="bg-gray-200  dark:bg-gray-900 dark:text-white sticky top-0 z-10">
      <div className="px-5 py-2 h-16 flex items-center justify-between">
        <div className="flex justify-between items-center gap-5 w-full">
          <div className="flex items-center gap-3">
            <ButtonDrawer />

            <RoleSelector />
          </div>

          <div className="flex items-center gap-5">
            <DrawerProfile />
          </div>
        </div>
      </div>
    </header>
  )
}
