import React from 'react';
import { TableCheckBox , useTableContext} from './TableIndex';

import './table.css';

const TableRow = ({record}) => {
    const { selectedRecords, setNumSel, colComponents } = useTableContext();
    const selected = selectedRecords.current.has(record);
  return (
    <tr
        className={`table-row-border ${selected ? 'selected-table-row' : ''}`}
        onClick={()=>{
            //If already checked
            if(selected) {
                setNumSel(prevState => prevState -1);
                selectedRecords.current.delete(record);
            } else {
                setNumSel(prevState => prevState + 1);
                selectedRecords.current.add(record);
            }
        }}
    >
        {colComponents.current.map((colChild, idx)=>(
            <td key={colChild.props.field + '-' + idx}
                style={{textAlign: colChild.props.textAlign}}
                className="text-sm h-14 px-5 py-2 leading-5"
            >
                {colChild.props.type === 'checkbox' ? 
                    <TableCheckBox checked={selected} type="normal"/> :
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