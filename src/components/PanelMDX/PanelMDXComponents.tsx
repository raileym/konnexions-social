import { useState } from 'react'
import About from '@mdxPages/About.mdx'
import Welcome from '@mdxPages/Welcome.mdx'
import FAQ from '@mdxPages/FAQ.mdx'
import One from '@mdxPages/One.mdx'
import Two from '@mdxPages/Two.mdx'
import Three from '@mdxPages/Three.mdx'

import MDXPage from '@components/MDXPage/MDXPage'
import type { FC } from 'react'

// Map keys to React components (MDX components are React components)
const mdxPagesMap: Record<string, FC> = {
  about: About,
  welcome: Welcome,
  faq: FAQ,
  one: One,
  two: Two,
  three: Three
}

const PanelMDXComponents: FC = () => {
  const [page, setPage] = useState<keyof typeof mdxPagesMap>('about')

  // Get the component to render, fallback to About if not found
  const ComponentToRender = mdxPagesMap[page] || About

  return (
    <>
      <nav className="w-100 h2X flex justify-between pv3 ph3 bg-light-gray absolute top-0 left-0" style={{paddingTop: '6rem', height: '10em'}}>
        {Object.keys(mdxPagesMap).map(key => (
          <button
            key={key}
            onClick={() => setPage(key as keyof typeof mdxPagesMap)}
            disabled={key === page}
            className="pa1 bg-black white b--black ma1 w4 b--black"
          >
            {key}
          </button>
        ))}
      </nav>
      <MDXPage Component={ComponentToRender} />
    </>
  )
}

export default PanelMDXComponents
