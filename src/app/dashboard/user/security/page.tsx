import { redirect } from 'next/navigation'
import { getMe } from '@/lib/actions/me'
import FormSecurity from '@/components/forms/FormSecurity'
import Main from '@/components/globals/Main'

export default async function DashboardUserSecurityPage() {
  // Me
  const resMe = await getMe()
  const me = resMe.success ? resMe.payload : null

  !me && redirect('/')

  return (
    <Main title="Security">
      <FormSecurity className="w-full max-w-80" />
    </Main>
  )
}
