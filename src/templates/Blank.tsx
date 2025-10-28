import { ReactNode } from 'react'
import ThemeProvider from './themeProvider'

export default async function TemplateBlank({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <ThemeProvider>
      <main className={`bg-primary ${className}`}>{children}</main>
    </ThemeProvider>
  )
}
