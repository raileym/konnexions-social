import type { FC } from 'react'

type MDXPageProps = {
  Component: FC
}

const MDXPage = ({ Component }: MDXPageProps) => {
  return (
    <div className="mdx-content overflow-y-auto">
      <Component />
    </div>
  )
}

export default MDXPage
