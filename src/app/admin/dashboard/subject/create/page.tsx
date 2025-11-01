import { Metadata } from 'next'
import Main from '@/components/globals/Main'
import { ChevronLeft } from 'lucide-react'
import FormSubject from '@/components/forms/FormSubject'

export const metadata: Metadata = {
  title: 'Subject Create',
  description: 'Subject Create',
}

export default async function DashboardSubjectCreatePage() {
  return (
    <Main
      title="Subject Create"
      actions={[
        {
          label: 'Back',
          href: '/admin/dashboard/subject',
          icon: ChevronLeft,
        },
      ]}
    >
      <div className="flex flex-col gap-5">
        <FormSubject className="bg-light rounded-xl" />
      </div>
    </Main>
  )
}
