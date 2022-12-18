import React from 'react';
import { useTableContext } from './TableIndex';
import { MyCheckbox } from '..';

const ColumnHeader = ({headerText, type, textAlign, width}) => {
    const { allSel, handleSelAll } = useTableContext();
    
    return (
        <th role="columnheader" 
            style={{textAlign}}
            className={`${type !== 'checkbox' ? 'text-gray-600' : ''} text-sm cursor-pointer h-10 px-3 py-0`}
        >
            <div className="h-8 leading-8 font-semibold flex" style={{textAlign}}>
                {type === 'checkbox' ? 
                    <MyCheckbox checked={allSel} customFunc={()=>handleSelAll()} /> :
                    <p className="truncate"
                        style={{width: width + 'px'}}
                    >{headerText}</p>
                }
            </div>
        </th>
    )
}

export default ColumnHeader