import Link from 'next/link'
import { redirect } from 'next/navigation'
import FormResetPassword from '@/components/forms/FormResetPassword'
import { getResetPasswordToken } from '@/lib/actions/resetPasswordToken'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import Logo from '@/components/globals/Logo'

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{
    token: string
    email: string
  }>
}) {
  // Public only
  const session = await getServerSession(authOptions)
  if (session) {
    const role = session.user.role

    //
    if (['SUPERADMIN', 'ADMIN'].includes(role)) {
      redirect('/admin/dashboard')
    }

    //
    if (['TEACHER'].includes(role)) {
      redirect('/teacher/dashboard')
    }

    //
    if (['STUDENT'].includes(role)) {
      redirect('/student/dashboard')
    }

    //
    redirect(`/user`)
  }

  // Check if token is valid
  const { token, email } = await searchParams

  // Validate
  if (!token || !email) {
    redirect('/login')
  }

  // Check if token is valid (available and not expired)
  const hasValidToken = await getResetPasswordToken(email, token)
  if (!hasValidToken.success) {
    redirect('/login')
  }

  return (
    <section className="h-dvh flex items-center py-10 px-5">
      <main className="flex flex-col gap-5 items-center justify-center">
        <div>
          <Logo />
        </div>
        <div className="flex justify-center">
          <h1 className="font-bold">Reset your password</h1>
        </div>
        <div className="">
          <FormResetPassword className="w-full max-w-80" />
        </div>
        <div className="mt-7 flex flex-col gap-3 text-center">
          <Link href="/">Home</Link>
          <Link href="/signup">Create an account</Link>
          <Link href="/login">Login</Link>
          <Link href="/forgot-password">Forgot Password</Link>
        </div>
      </main>
    </section>
  )
}
