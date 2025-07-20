import { useEffect, useState } from 'react'

const NavbarColor = () => {
  const [widthRem, setWidthRem] = useState(0)

  const updateWidth = () => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    const rems = window.innerWidth / rootFontSize
    setWidthRem(parseFloat(rems.toFixed(2)))
  }

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Determine background color class based on rem width
  let bgClass = 'bg-green'
  if (widthRem < 25) {
    bgClass = 'bg-blue'
  } else if (widthRem < 30) {
    bgClass = 'bg-red'
  } else if (widthRem < 45) {
    bgClass = 'bg-orange'
  } else if (widthRem < 60) {
    bgClass = 'bg-yellow'
  }

  return (
    <div className={`navbar-color absolute top-0 right-0 ${bgClass} w-10X h5 mt2X z-9999`} style={{width: '1rem'}}>
    </div>
  )
}

export default NavbarColor
