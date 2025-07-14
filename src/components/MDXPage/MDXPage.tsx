import type { FC } from 'react'

type MDXPageProps = {
  Component: FC
}

const MDXPage = ({ Component }: MDXPageProps) => {
  return (
    <div className="f3 mdx-content bg-white w-100 pa4 black overflow-y-auto" style={{paddingTop: '10em'}}>
      <Component />
    </div>
  )
}

export default MDXPage
