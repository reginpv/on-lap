import ThemeProvider from './themeProvider'
import HeaderDashboard from '@/components/globals/HeaderDashboard'
import FooterDashboard from '@/components/globals/FooterDashboard'
import Aside from '@/components/globals/Aside'
import Drawer from '@/components/globals/Drawer'

export default async function TemplateDashboard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <section className="flex min-h-dvh">
        <Aside />
        <main className="bg-primary flex flex-col w-[calc(100vw-256px)]">
          <HeaderDashboard />
          <section className="flex-1">{children}</section>
          <FooterDashboard />
        </main>
      </section>
      <Drawer />
    </ThemeProvider>
  )
}
