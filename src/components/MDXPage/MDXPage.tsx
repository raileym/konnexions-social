import type { FC } from 'react'

type MDXPageProps = {
  Component: FC
}

const MDXPage = ({ Component }: MDXPageProps) => {
  return (
    <div className="mdx-content bg-purple w-100 pa4 white overflow-y-auto" style={{paddingTop: '10em'}}>
      <Component />
    </div>
  )
}

export default MDXPage
