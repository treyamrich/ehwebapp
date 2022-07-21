import React, { useState, useEffect } from 'react';

const Table = ({data, children}) => {
    const [allSel, setAllSel] = useState(false);
    const [selBoxes, setSelBoxes] = useState(()=>new Set());
    const [numSel, setNumSel] = useState(0);
    const [visibleRecords, setVisibleRecords] = useState(data);

    //Selecting a single checkbox
    const handleSel = cbox => {
        if(cbox.checked) {
            selBoxes.add(cbox);
            setNumSel(prevNumSel => prevNumSel + 1);
        }
        else {
            selBoxes.delete(cbox);
            setNumSel(prevNumSel => prevNumSel - 1);
        }
    }
    //Selecting all the checkboxes
    const handleSelAll = isSelAll => {
        const boxes = document.getElementsByClassName("checkbox");
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].checked = isSelAll;
            if(isSelAll) selBoxes.add(boxes[i]);
        }
        if(!isSelAll) {
            setSelBoxes(new Set());
        }
        //Rerenders component
        setNumSel(isSelAll ? visibleRecords.length : 0);
    }

    useEffect(()=>{
        setAllSel(visibleRecords.length === numSel && numSel !== 0);
    }, [numSel]);

    return(
        <div>
            {/*<TableToolbar/>*/}
            <table className="inventory-items">
                {children.map((childElm)=>{
                    childElm.props.handleSelAll = handleSelAll;
                    childElm.props.allSel = allSel;
                    return childElm;
                })}
                <tbody>
                {visibleRecords.length === 0 ? <tr><td colSpan="10" style={{padding: "10px", textAlign:"center"}}> No records </td></tr> : null}
                {
                    visibleRecords.map((record, index) => (
                        <tr key={index}>
                            {children.map((column, idx)=>(
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
                            {/*
                            <td> {item.code} </td>
                            <td> {item.name} </td>
                            <td> {item.price} </td>
                            <td> {item.cost} </td>
                            <td> {item.category} </td>
                            <td> {item.qty} </td>
                            <td> {item.qtyThresh} </td>
                            <td> {item.maxAddon} </td>
                            <td> {item.updatedAt} </td>*/}
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Table