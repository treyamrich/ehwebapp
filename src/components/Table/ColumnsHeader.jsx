import React from 'react'

const ColumnsHeader = ({children, handleSelAll}) => {
  return (
    <thead>
        <tr>
            {/*Add the selection handler*/}
            {children.map(elm=>{
                if(elm.props.type === 'checkbox')
                    elm.props.handleSelAll = handleSelAll;
                return elm;
            })}
        </tr>
    </thead>
  )
}

export default ColumnsHeader