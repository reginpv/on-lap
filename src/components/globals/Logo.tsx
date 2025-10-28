import Link from 'next/link'
import { APP_NAME } from '@/config/constants'

export default function Logo() {
  return (
    <Link href="/">
      <span className="truncate font-header text-3xl text-neutral-800 dark:text-white">
        {APP_NAME}
      </span>
    </Link>
  )
}
