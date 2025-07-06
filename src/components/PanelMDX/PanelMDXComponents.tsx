import { useState } from 'react'
import About from '@mdxPages/About.mdx'
import Welcome from '@mdxPages/Welcome.mdx'
import MDXPage from '@components/MDXPage/MDXPage'

const PanelMDXComponents = () => {
  // example: switch pages based on local state or context
  const [page,] = useState('about')

  let ComponentToRender = About
  if (page === 'welcome') ComponentToRender = Welcome

  return <MDXPage Component={ComponentToRender} />
}

export default PanelMDXComponents


