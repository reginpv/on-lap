import { LayoutDashboard, UsersRound, NotebookPen, Book } from 'lucide-react'

export const menuAside = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Class',
    href: '/dashboard/class',
    icon: UsersRound,
  },
  {
    label: 'Test Bank',
    href: '/dashboard/test',
    icon: NotebookPen,
  },
  {
    label: 'Subject',
    href: '/dashboard/subject',
    icon: Book,
  },
]
