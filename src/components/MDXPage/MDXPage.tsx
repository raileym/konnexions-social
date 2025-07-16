import type { FC } from 'react'

type MDXPageProps = {
  Component: FC
}

const MDXPage = ({ Component }: MDXPageProps) => {
  return (
    <div className="f3 mdx-content pt6 bg-white w-100 pa4 black overflow-y-auto">
      <Component />
    </div>
  )
}

export default MDXPage
