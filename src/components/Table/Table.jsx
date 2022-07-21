import React, { Children, useState, useEffect } from 'react';
import { useTableContext } from './contexts/TableContext';

const Table = ({data, children}) => {

    const [visibleRecords, setVisibleRecords] = useState(data);
    
    const { setAllSel, numSel, handleSel } = useTableContext();
    const childArr = Children.toArray(children);

    useEffect(()=>{
        setAllSel(visibleRecords.length === numSel && numSel !== 0);
    }, [numSel]);

    return(
        <div>
            {/*<TableToolbar/>*/}
            <table className="inventory-items" style={{ border: '1px black solid'}}>
                {children}
                <tbody>
                {visibleRecords.length === 0 ? <tr><td colSpan="10" style={{padding: "10px", textAlign:"center"}}> No records </td></tr> : null}
                {
                    visibleRecords.map((record, index) => (
                        <tr key={index}>
                            {childArr.map((column, idx)=>(
                                <td key={column.field + '-' + idx}>
                                    {column.field === 'checkbox' && (
                                        <input type="checkbox" 
                                            name="checkbox-item"
                                            id={"checkbox-"+ index}
                                            className="checkbox" 
                                            value={index} 
                                            onChange={(e)=>handleSel(e.target)}
                                        />
                                    )}
                                    {column.field !== 'checkbox' && record[column.field]}
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