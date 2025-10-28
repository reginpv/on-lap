import FormSignup from '@/components/forms/FormSignup'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'
import Logo from '@/components/globals/Logo'

export default async function Signup() {
  // Public only
  const session = await getServerSession(authOptions)
  if (session) {
    redirect('/dashboard')
  }
  return (
    <section className="h-dvh">
      <div className="h-full">
        <div className="flex flex-col md:flex-row h-full">
          {/** Left side */}
          <div className="bg-primary flex-1 p-5 flex flex-col gap-5 items-center justify-center">
            <div>
              <Logo />
            </div>
            <h1>Signup</h1>

            <div>
              <FormSignup className="w-full max-w-80" />
            </div>

            <div className="mt-7 flex flex-col gap-3 text-center">
              <p>
                <Link href="/">Home</Link>
              </p>
              <p>
                Already have an account? <Link href="/login">Login here</Link>
              </p>
              <p>
                <Link href="/forgot-password">Forgot password</Link>
              </p>
            </div>
          </div>
          {/** Right side */}
          <div className="flex-1 bg-secondary p-5 flex items-center justify-center">
            <div className="max-w-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
