import Link from 'next/link'
import FormForgotPassword from '@/components/forms/FormForgotPassword'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'

export default async function ForgotPassword() {
  // Public only
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/dashboard')
  }

  return (
    <section className="min-h-dvh h-full flex items-center py-10 px-5">
      <main className="flex flex-col gap-5 items-center justify-center">
        <div className="flex justify-center">
          <h1 className="font-bold">Forgot your password?</h1>
        </div>
        <div className="">
          <FormForgotPassword className="w-full max-w-80" />
        </div>
        <div className="mt-7 flex flex-col gap-3 text-center">
          <Link href="/">Home</Link>
          <Link href="/signup">Create an account</Link>
          <Link href="/login">Login</Link>
        </div>
      </main>
    </section>
  )
}
