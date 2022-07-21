import React, { useState } from 'react'
import { CustomCheckbox } from './TableIndex';
import './table.css';

const TableRow = ({record, colHeaderArr}) => {
    const [selected, setSelected] = useState(false);
  return (
    <tr
        className={`border-y table-border ${selected ? 'selected-table-row' : ''}`}
        onClick={()=>setSelected(prevSelState=>!prevSelState)}
    >
        {colHeaderArr.map((colChild, idx)=>(
            <td key={colChild.props.field + '-' + idx}
                style={{textAlign: colChild.props.textAlign}}
                className="text-sm h-14 px-5 py-2 leading-5"
            >
                {colChild.props.type === 'checkbox' ? 
                    <CustomCheckbox checked={selected}/> :
                    <p className="truncate"
                        style={{width: colChild.props.width + 'px'}}
                    >{record[colChild.props.field]}</p>
                }
            </td>
        ))}
    </tr>
  )
}

export default TableRow