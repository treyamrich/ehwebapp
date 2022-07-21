import React from 'react';
import { CustomCheckbox } from './TableIndex';
import { useTableContext } from './contexts/TableContext';

const ColumnHeader = ({headerText, type, textAlign, width}) => {
    const { handleSelAll, allSel } = useTableContext();
    
    return (
        <th role="columnheader" 
            style={{textAlign}}
            className="text-gray-600 text-sm cursor-pointer h-10 px-3 py-0"
        >
            <div className="h-8 leading-8 font-semibold flex" style={{textAlign}}>
                {type === 'checkbox' ? <CustomCheckbox /> :
                    <p className="truncate"
                        style={{width: width + 'px'}}
                    >{headerText}</p>
                }
            </div>
        </th>
    )
}

export default ColumnHeader