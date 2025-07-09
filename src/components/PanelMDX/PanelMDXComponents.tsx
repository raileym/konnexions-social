// src/components/PanelMDX/PanelMDXComponents.tsx

import About from '@mdxPages/About.mdx'
import MDXPage from '@components/MDXPage/MDXPage'
import { mdxPagesMap, type MdxPage } from '@cknTypes/types'

type PanelMDXComponentsProps = {
  page?: MdxPage
}

const PanelMDXComponents = ({ page }: PanelMDXComponentsProps) => {
  // Use the page prop to determine what to render, fallback to About
  const ComponentToRender = page ? mdxPagesMap[page] || About : About

  return (
    <MDXPage Component={ComponentToRender} />
  )
}

export default PanelMDXComponents
