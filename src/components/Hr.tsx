import React from 'react'

type HrProps = {
  color?: string
  thickness?: string
  width?: string
  margin?: string
}

const Hr: React.FC<HrProps> = ({
  color = '#ccc',
  thickness = '4px',
  width = '100%',
  margin = '1rem 0'
}) => {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: `${thickness} solid ${color}`,
        width,
        margin
      }}
    />
  )
}

export default Hr
