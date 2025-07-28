import { TABINDEX_NEVER } from '@cknTypes/constants'
import type { FC } from 'react'

type MDXPageProps = {
  Component: FC
}

const MDXPage = ({ Component }: MDXPageProps) => {
  return (
  <>
    <div tabIndex={TABINDEX_NEVER} aria-disabled={false} className="f3 o-20X mdx-content pt6 bg-background w-100 pa4 background overflow-y-auto">
      <Component />
    </div>
  </>
  )
}

export default MDXPage
