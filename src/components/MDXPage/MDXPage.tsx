import type { FC } from 'react'

type MDXPageProps = {
  Component: FC
}

const MDXPage = ({ Component }: MDXPageProps) => {
  return (
    <div tabIndex={-1} aria-disabled={false} className="f3 o-20 mdx-content pt6 bg-background w-100 pa4 background overflow-y-auto">
      <Component />
    </div>
  )
}

export default MDXPage
