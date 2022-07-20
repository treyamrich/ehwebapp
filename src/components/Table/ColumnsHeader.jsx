import React from 'react'

const ColumnsHeader = ({children}) => {
  return (
    <thead>
        <tr>
            {children}
            </tr>
    </thead>
  )
}

export default ColumnsHeader