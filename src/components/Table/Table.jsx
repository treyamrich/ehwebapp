import React from 'react';
import { TableRow } from './TableIndex';

import './table.css';

//Main <table> component
const Table = ({records, colComponents, children}) => {
    
    return(
        <div id="table-container" className="overflow-auto">
            <table className="w-full">
                <colgroup>
                    {colComponents.map((colChild, idx)=> (
                        <col key={idx} style={{width: colChild.props.width + 'px'}} />
                    ))}
                </colgroup>
                <thead className="table-border">
                    <tr>
                        {children}
                    </tr>
                </thead>
                <tbody>
                {records.length === 0 ? 
                    <tr className="border-y table-border">
                        <td colSpan={colComponents.length} 
                            className="text-center p-3"
                        >
                            No records 
                        </td>
                    </tr> : null}
                {records.map((record, index) =>
                    <TableRow key={index} record={record} />
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Table