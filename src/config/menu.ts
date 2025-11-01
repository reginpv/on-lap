import { LayoutDashboard, UsersRound, NotebookPen, Book } from 'lucide-react'

export const adminMenuAside = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Class',
    href: '/admin/dashboard/class',
    icon: UsersRound,
  },
  {
    label: 'Test Bank',
    href: '/admin/dashboard/test',
    icon: NotebookPen,
  },
  {
    label: 'Subject',
    href: '/admin/dashboard/subject',
    icon: Book,
  },
]
