import { Metadata } from 'next'
import Main from '@/components/globals/Main'
import { ChevronLeft } from 'lucide-react'
import FormSubject from '@/components/forms/FormSubject'
import { redirect } from 'next/navigation'
import { getSubject } from '@/lib/actions/subject'

export const metadata: Metadata = {
  title: 'Subject edit',
  description: 'Subject edit',
}

export default async function DashboardSubjectEditPage({
  params,
}: {
  params: Promise<{
    subjectId: string
  }>
}) {
  const { subjectId } = await params

  if (!subjectId) {
    redirect('/dashboard/subject')
  }

  const resSubject = await getSubject(subjectId)
  const subject = resSubject?.success ? resSubject.payload : null

  if (!resSubject.success) {
    redirect('/dashboard/subject')
  }

  return (
    <Main
      title="Subject Create"
      actions={[
        {
          label: 'Back',
          href: '/dashboard/subject',
          icon: ChevronLeft,
        },
      ]}
    >
      <div className="flex flex-col gap-5">
        <FormSubject s={subject} className="" />
      </div>
    </Main>
  )
}
