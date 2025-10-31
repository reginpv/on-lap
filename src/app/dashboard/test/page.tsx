import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { getUser } from '@/lib/actions/user'
import Main from '@/components/globals/Main'
import { Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Test',
  description: 'Test',
}

export default async function DashboardTest() {
  const session = await getServerSession(authOptions)
  const res = await getUser(session.user.id)
  const user = res.payload

  return (
    <Main
      title="Test"
      actions={[
        {
          label: 'Create Test',
          href: '/dashboard/test/create',
          icon: Plus,
        },
      ]}
    >
      <div></div>
    </Main>
  )
}
