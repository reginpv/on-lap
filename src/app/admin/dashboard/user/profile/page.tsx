import FormProfile from '@/components/forms/FormProfile'
import { redirect } from 'next/navigation'
import { getMe } from '@/lib/actions/me'
import Main from '@/components/globals/Main'

export default async function DashboardUserProfilePage() {
  // Me
  const resMe = await getMe()
  const me = resMe.success ? resMe.payload : null

  !me && redirect('/')

  return (
    <Main title="Profile">
      <FormProfile m={me} className="w-full max-w-80" />
    </Main>
  )
}
