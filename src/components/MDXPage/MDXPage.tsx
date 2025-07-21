import type { FC } from 'react'

type MDXPageProps = {
  Component: FC
}

const MDXPage = ({ Component }: MDXPageProps) => {
  return (
    <div className="f3 mdx-content pt6 bg-background w-100 pa4 background overflow-y-auto">
      <Component />
    </div>
  )
}

export default MDXPage
