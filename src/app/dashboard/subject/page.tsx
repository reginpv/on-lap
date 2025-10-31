import { Metadata } from 'next'
import Main from '@/components/globals/Main'
import { Plus } from 'lucide-react'
import { getSubjects } from '@/lib/actions/subject'
import SubjectTable from '@/components/SubjectTable'

export const metadata: Metadata = {
  title: 'Sublect list',
  description: 'Sublect list',
}

export default async function DashboardSubject() {
  //
  const PAGE = 1
  const resSubjects = await getSubjects(PAGE)
  const totalCount = resSubjects.totalCount
  const subjects = resSubjects.payload

  //

  return (
    <Main
      title={`Subject List ${totalCount && `(${totalCount})`}`}
      actions={[
        {
          label: `Create Subject`,
          href: '/dashboard/subject/create',
          icon: Plus,
        },
      ]}
    >
      <div>
        <div className="container container--custom ">
          {/** Table */}
          <SubjectTable subjects={subjects} />
        </div>
      </div>
    </Main>
  )
}
