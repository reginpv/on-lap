import { Metadata } from 'next'
import Main from '@/components/globals/Main'
import { Plus } from 'lucide-react'
import { getSubjects } from '@/lib/actions/subject'
import Table from '@/components/ui/Table'
import { Subject } from '@prisma/client'
import { Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

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

  console.log('resSubjects: ', resSubjects)

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
          <div className="overflow-x-auto">
            <Table
              className="mb-10 rounded-xl"
              data={subjects.map((subject: Subject) => ({
                ...subject,
                level: subject.level.toLowerCase(),
                difficulty: subject.difficulty.toLowerCase(),
                category: subject.category.toLowerCase(),
                area: subject.area.toLowerCase(),
                action: <SubjectAction subject={subject} />,
              }))}
              columns={[
                {
                  Header: 'Subject code',
                  accessor: 'code',
                },
                {
                  Header: 'Subject name',
                  accessor: 'name',
                },
                {
                  Header: 'Level',
                  accessor: 'level',
                  className: 'capitalize',
                },
                {
                  Header: 'Difficulty',
                  accessor: 'difficulty',
                  className: 'capitalize',
                },
                {
                  Header: 'Category',
                  accessor: 'category',
                  className: 'capitalize',
                },
                {
                  Header: 'Area',
                  accessor: 'area',
                  className: 'capitalize',
                },
                {
                  Header: '',
                  accessor: 'action',
                  dataType: 'component',
                  className: 'flex justify-end',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Main>
  )
}

function SubjectAction({
  subject,
  setDeleteOpen,
}: {
  subject: Subject
  setDeleteOpen?: React.Dispatch<
    React.SetStateAction<{
      status: boolean
      user: User | null
      confirm: boolean
    }>
  >
}) {
  return (
    <div className="flex space-x-4 justify-end ">
      {/* Edit */}
      <Link
        href={`/dashboard/subject/${subject.id}/edit`}
        className="button button--circle"
      >
        <Edit className="w-5 h-5" />
      </Link>

      <button className="button button--circle">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
