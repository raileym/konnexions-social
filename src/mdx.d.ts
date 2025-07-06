// src/mdx.d.ts
declare module '*.mdx' {
  import * as React from 'react'
  const MDXComponent: React.FC<{ children?: React.ReactNode }>
  export default MDXComponent
}
