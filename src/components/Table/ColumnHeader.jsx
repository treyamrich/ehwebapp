import React from 'react'

const ColumnHeader = ({headerText, width, height, type, textAlign, isPrimaryKey}) => {
    return (
        <th style={{ width, height, textAlign}}>
            {type === 'checkbox' ? 
                <input type="checkbox" 
                    name="checkbox-select-all" 
                    className="checkbox"
                    onChange={(e)=>handleSelAll(e.currentTarget.checked)}
                    checked={allSel}/> :
                headerText
            }
        </th>
    )
}

export default ColumnHeader