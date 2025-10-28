import Link from 'next/link'
import { redirect } from 'next/navigation'
import FormResetPassword from '@/components/forms/FormResetPassword'
import { getResetPasswordToken } from '@/lib/actions/resetPasswordToken'

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{
    token: string
    email: string
  }>
}) {
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
    <section className="min-h-dvh h-full flex items-center py-10 px-5">
      <main className="flex flex-col gap-5 items-center justify-center">
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
