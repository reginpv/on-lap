import { Metadata } from 'next'
import Main from '@/components/globals/Main'
import { Plus } from 'lucide-react'
import { getSubjects } from '@/lib/actions/subject'
import SubjectTable from '@/components/SubjectTable'
import Pagination from '@/components/ui/Pagination'
import { PAGINATION_PER_PAGE } from '@/config/constants'
import FormSearch from '@/components/forms/FormSearch'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

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
  // session
  const session = await getServerSession(authOptions)
  const role = session.user.role
  const path = ['SUPERADMIN', 'ADMIN'].includes(role)
    ? '/admin'
    : ['TEACHER'].includes(role)
    ? '/teacher'
    : ['STUDENT'].includes(role)
    ? '/student'
    : '/user' // TODO: <-- fix this

  //
  const { page, search } = await searchParams
  const PAGE = page ? +page : 1

  const resSubjects = await getSubjects(PAGE, PAGINATION_PER_PAGE, { search })
  const totalCount = resSubjects.totalCount
  const subjects = resSubjects.payload

  //
  return (
    <Main
      title={`Subject List ${totalCount && `(${totalCount})`}`}
      actions={[
        {
          label: `Create Subject`,
          href: '/admin/dashboard/subject/create',
          icon: Plus,
        },
      ]}
    >
      <div>
        {/** Table */}
        <div className="container container--custom flex flex-col gap-5">
          <FormSearch />
          {search && (
            <div className="pl-1">
              {totalCount ? totalCount : 0} search results for{' '}
              <strong>{search}</strong>.{' '}
              <Link href="/admin/dashboard/subject" className="underline">
                Clear search results.
              </Link>
            </div>
          )}
          <SubjectTable path={path} subjects={subjects} />
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
