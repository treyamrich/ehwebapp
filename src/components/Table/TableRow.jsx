import React from 'react';
import { TableCheckBox , useTableContext} from './TableIndex';

import './table.css';

/*MYuniqSelATTR is the state of a record being selected, it's named this
    to avoid attribute conflicts with the data that is passed*/
const TableRow = ({record}) => {
    const { setNumSel, colComponents } = useTableContext();

  return (
    <tr
        className={`table-row-border ${record.MYuniqSelATTR ? 'selected-table-row' : ''}`}
        onClick={()=>{
            setNumSel(prevState=> record.MYuniqSelATTR ? 
                prevState-1 : prevState+1);
            record.MYuniqSelATTR = !record.MYuniqSelATTR;
        }}
    >
        {colComponents.map((colChild, idx)=>(
            <td key={colChild.props.field + '-' + idx}
                style={{textAlign: colChild.props.textAlign}}
                className="text-sm h-14 px-5 py-2 leading-5"
            >
                {colChild.props.type === 'checkbox' ? 
                    <TableCheckBox checked={record.MYuniqSelATTR} type="normal"/> :
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