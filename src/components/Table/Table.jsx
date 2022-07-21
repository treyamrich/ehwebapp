import React, { Children, useState, useEffect } from 'react';
import { TableToolbar } from './TableIndex';
import { useTableContext } from './contexts/TableContext';

const Table = ({data, children}) => {
    
    const { setAllSel, numSel, handleSel } = useTableContext();
    const childArr = Children.toArray(children);

    useEffect(()=>{
        setAllSel(data.length === numSel && numSel !== 0);
    }, [numSel]);

    return(
        <div className="table-wrapper overflow-x-hidden">
            <TableToolbar />
            <table className="inventory-items border-slate-300 border-1">
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
                        <tr key={index} className="border-slate-300 border-1">
                            {childArr.map((colChild, idx)=>(
                                <td key={colChild.props.field + '-' + idx}
                                    style={{textAlign: colChild.props.textAlign}}
                                    className="p-1 text-sm overflow-hidden"
                                >
                                    {colChild.props.type === 'checkbox' && (
                                        <input type="checkbox" 
                                            name="checkbox-item"
                                            id={"checkbox-"+ index}
                                            className="checkbox w-5 h-5" 
                                            value={index} 
                                            onChange={(e)=>handleSel(e.target)}
                                        />
                                    )}
                                    {colChild.props.type !== 'checkbox' && record[colChild.props.field]}
                                </td>
                            ))}
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Table