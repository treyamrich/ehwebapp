import React from 'react';

import { useTableContext } from './contexts/TableContext';

const ColumnHeader = ({headerText, type, textAlign}) => {
    const { handleSelAll, allSel } = useTableContext();
    
    return (
        <th role="columnheader" 
            style={{textAlign}}
            className="text-gray-500 text-sm pr-1 cursor-pointer font-bold overflow-hidden"
        >
            {type === 'checkbox' ? 
                <input type="checkbox" 
                    name="checkbox-select-all" 
                    className="checkbox w-5 h-5"
                    onChange={(e)=>handleSelAll(e.currentTarget.checked)}
                    checked={allSel}
                    /> :
                <span>{headerText}</span>
            }
        </th>
    )
}

export default ColumnHeader