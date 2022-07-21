import React, { Children, useState, useEffect } from 'react';
import { TableToolbar } from './TableIndex';
import { useTableContext } from './contexts/TableContext';

const Table = ({data, children}) => {
    
    const [visibleRecords, setVisibleRecords] = useState([]);
    const { setAllSel, numSel, handleSel } = useTableContext();
    const childArr = Children.toArray(children);

    useEffect(()=>{
        setAllSel(visibleRecords.length === numSel && numSel !== 0);
    }, [numSel]);
    useEffect(()=>{
        setVisibleRecords([...data]);
    }, []);

    return(
        <div className="table-wrapper">
            <TableToolbar />
            <table className="inventory-items" style={{ border: '1px black solid'}}>
                <thead>
                    <tr>
                        {children}
                    </tr>
                </thead>
                <tbody>
                {visibleRecords.length === 0 ? <tr><td colSpan="10" style={{padding: "10px", textAlign:"center"}}> No records </td></tr> : null}
                {
                    visibleRecords.map((record, index) => (
                        <tr key={index}>
                            {childArr.map((colChild, idx)=>(
                                <td key={colChild.props.field + '-' + idx}>
                                    {colChild.props.type === 'checkbox' && (
                                        <input type="checkbox" 
                                            name="checkbox-item"
                                            id={"checkbox-"+ index}
                                            className="checkbox" 
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