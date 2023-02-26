import React from 'react';
import { useTableContext} from './TableIndex';
import { MyCheckbox} from '..';

import './table.css';

//selectable: boolean whether the row can be selected
const TableRow = ({ record}) => {
    const { selectedRecords, setNumSel, colComponents, selectable } = useTableContext();
    const selected = selectedRecords.current.has(record);
  return (
    <tr
        className={`table-row-border ${selected ? 'selected-table-row' : ''}`}
        onClick={selectable.current ? ()=>{
            //If already checked
            if(selected) {
                setNumSel(prevState => prevState -1);
                selectedRecords.current.delete(record);
            } else {
                setNumSel(prevState => prevState + 1);
                selectedRecords.current.add(record);
            }
        } : undefined}
    >
        {colComponents.current.map((colChild, idx)=>(
            <td key={colChild.props.field + '-' + idx}
                style={{textAlign: colChild.props.textAlign}}
                className="text-sm h-14 px-5 py-2 leading-5"
            >
                {colChild.props.type === 'checkbox' ? 
                    <MyCheckbox checked={selected} type="normal"/> :
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