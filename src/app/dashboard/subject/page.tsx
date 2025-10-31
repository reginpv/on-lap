import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { getUser } from '@/lib/actions/user'
import Main from '@/components/globals/Main'
import { Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Class',
  description: 'Class',
}

export default async function DashboardSubject() {
  const session = await getServerSession(authOptions)
  const res = await getUser(session.user.id)
  const user = res.payload

  return (
    <Main
      title="Subject List"
      actions={[
        {
          label: 'Create Subject',
          href: '/dashboard/subject/create',
          icon: Plus,
        },
      ]}
    >
      <div></div>
    </Main>
  )
}
