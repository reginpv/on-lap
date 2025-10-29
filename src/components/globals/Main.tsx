export default function Main({
  children,
  title,
  actions,
  className = '',
}: {
  children: React.ReactNode
  title?: string
  actions?: Object[]
  className?: string
}) {
  return (
    <section className={`main flex flex-col ${className}`}>
      {/** Top */}
      <div className="main__header font-semibold py-3 px-5 border-b bg-gray-100 dark:bg-gray-800 dark:text-white border-gray-200 dark:border-gray-900">
        <div>{title}</div>
        {actions && <div className="flex items-center gap-3"></div>}
      </div>

      {/** Content */}
      <div className="main__content py-5 px-5">
        <div className="">{children}</div>
      </div>
    </section>
  )
}
