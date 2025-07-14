// src/components/PanelMDX/PanelMDXComponents.tsx

import MDXPage from '@components/MDXPage/MDXPage'
import About from '@mdxPages/About.mdx'
import { useAppContext } from '@context/AppContext/AppContext'
import type { PanelMDXComponentsProps } from '@cknTypes/types'

const PanelMDXComponents = ({ page }: PanelMDXComponentsProps) => {
  const { mdxPagesMap } = useAppContext()
  
  // Use the page prop to determine what to render, fallback to About
  const ComponentToRender = page ? mdxPagesMap[page] || About : About

  return (
    <MDXPage Component={ComponentToRender} />
  )
}

export default PanelMDXComponents
