import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { getUser } from '@/lib/actions/user'
import Main from '@/components/globals/Main'

export const metadata: Metadata = {
  title: 'Class',
  description: 'Class',
}

export default async function DashboardClass() {
  const session = await getServerSession(authOptions)
  const res = await getUser(session.user.id)
  const user = res.payload

  return (
    <Main title="Class">
      <div></div>
    </Main>
  )
}
