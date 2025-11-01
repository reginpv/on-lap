import { Metadata } from 'next'
import Main from '@/components/globals/Main'
import { Plus } from 'lucide-react'
import { getSubjects } from '@/lib/actions/subject'
import SubjectTable from '@/components/SubjectTable'
import Pagination from '@/components/ui/Pagination'
import { PAGINATION_PER_PAGE } from '@/config/constants'

export const metadata: Metadata = {
  title: 'Sublect list',
  description: 'Sublect list',
}

export default async function DashboardSubject({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}) {
  //
  const { page } = await searchParams
  const PAGE = page ? +page : 1

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
        {/** Table */}
        <div className="container container--custom ">
          <SubjectTable subjects={subjects} />
        </div>

        {/** Pagination */}
        {totalCount && (
          <div className="container container--custom ">
            <Pagination
              totalCount={totalCount}
              currentPage={PAGE}
              perPage={PAGINATION_PER_PAGE}
            />
          </div>
        )}
      </div>
    </Main>
  )
}
