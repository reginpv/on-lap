import { Metadata } from 'next'
import { ReactNode } from 'react'
import TemplateBlank from '@/templates/Blank'

export const metadata: Metadata = {
  title: 'Signup',
  description: 'Signup: Signup as a student or teacher',
}

export default function BlankLayout({ children }: { children: ReactNode }) {
  return <TemplateBlank>{children}</TemplateBlank>
}
