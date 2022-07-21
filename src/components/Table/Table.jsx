import React, { Children } from 'react';
import { TableToolbar, TableRow, useTableContext } from './TableIndex';

import './table.css';

//Contains the main table logic for selecting and performing operations
/*MYuniqSelATTR is the state of a record being selected, it's named this
    to avoid attribute conflicts with the data that is passed*/
const Table = ({children}) => {
    
    const childArr = Children.toArray(children);
    const { records } = useTableContext();
    
    return(
        <div className="table-wrapper border md:overflow-scroll">
            <TableToolbar />
            <table className="inventory-items table-border">
                <colgroup>
                    {childArr.map((colChild, idx)=> (
                        <col key={idx} style={{width: colChild.props.width + 'px'}} />
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        {children}
                    </tr>
                </thead>
                <tbody>
                {records.length === 0 ? 
                    <tr className="border-y table-border">
                        <td colSpan={childArr.length} 
                            style={{padding: "10px", textAlign:"center"}}
                        >
                            No records 
                        </td>
                    </tr> : null}
                {records.map((record, index) => {
                    if(record.MYuniqSelATTR === undefined) record.MYuniqSelATTR = false;
                    return <TableRow key={index} record={record} colHeaderArr={childArr}/>
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Table