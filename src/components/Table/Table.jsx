import React from 'react';
import { TableRow, useTableContext } from './TableIndex';

import './table.css';

//Contains the main table logic for selecting and performing operations
/*MYuniqSelATTR is the state of a record being selected, it's named this
    to avoid attribute conflicts with the data that is passed*/
const Table = ({children}) => {
    const { records, colComponents } = useTableContext();
    
    return(
        <div id="table-container" className="overflow-auto">
            <table className="table-border">
                <colgroup>
                    {colComponents.map((colChild, idx)=> (
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
                        <td colSpan={colComponents.length} 
                            style={{padding: "10px", textAlign:"center"}}
                        >
                            No records 
                        </td>
                    </tr> : null}
                {records.map((record, index) => {
                    if(record.MYuniqSelATTR === undefined) record.MYuniqSelATTR = false;
                    return <TableRow key={index} record={record} />
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Table