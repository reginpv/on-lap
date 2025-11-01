import { Metadata } from 'next'
import Main from '@/components/globals/Main'
import { Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Loading',
  description: 'Loading',
}

export default async function LoadingDashboardSubject() {
  //

  return (
    <Main
      title={`Subject List loading...`}
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
          <p>Loading... </p>
        </div>
      </div>
    </Main>
  )
}
