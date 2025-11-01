import ThemeProvider from './themeProvider'
import HeaderDashboard from '@/components/globals/HeaderDashboard'
import FooterDashboard from '@/components/globals/FooterDashboard'
import AdminAside from '@/components/globals/AdminAside'
import AdminDrawer from '@/components/globals/AdminDrawer'

export default async function TemplateDashboard({
  role,
  children,
}: {
  role: string
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <section className="flex min-h-dvh">
        {role === 'ADMIN' && <AdminAside />}
        <main className="bg-primary flex flex-col w-[calc(100vw-256px)]">
          <HeaderDashboard />
          <section className="flex-1">{children}</section>
          <FooterDashboard />
        </main>
      </section>
      {role === 'ADMIN' && <AdminDrawer />}
    </ThemeProvider>
  )
}
