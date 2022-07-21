import React, { Children, useState, useEffect } from 'react';
import { TableToolbar, TableRow } from './TableIndex';
import { useTableContext } from './contexts/TableContext';

import './table.css';

const Table = ({data, children}) => {
    
    const { setAllSel, numSel, handleSel } = useTableContext();
    const childArr = Children.toArray(children);

    useEffect(()=>{
        setAllSel(data.length === numSel && numSel !== 0);
    }, [numSel]);

    return(
        <div className="table-wrapper">
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
                {data.length === 0 ? <tr><td colSpan="10" style={{padding: "10px", textAlign:"center"}}> No records </td></tr> : null}
                {
                    data.map((record, index) => (
                        <TableRow key={index} record={record} colHeaderArr={childArr}/>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Table