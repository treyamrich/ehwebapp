import React, { useState, useEffect } from 'react';

const Table = ({data, headers}) => {
    const [allSel, setAllSel] = useState(false);
    const [visibleRecords, setVisibleRecords] = useState(data);
    const [fieldIdxs, setFieldIdxs] = useState(()=>new Map());

    //Selecting a single checkbox
    const handleSel = cbox => {
        if(cbox.checked) {
            selBoxes.add(cbox);
            setNumSel(numSel + 1);
        }
        else {
            selBoxes.delete(cbox);
            setNumSel(numSel - 1);
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
        setNumSel(isSelAll ? items.length : 0);
    }

    //Create a map that stores the index for a certain field
    const initFieldIndexes = () => {
        const FieldIdxs = new Map();
        for(let i = 0; i < headers.length; i++) {
            FieldIdxs.set(headers[i], i);
        }
        setFieldIdxs(FieldIdxs);
    };

    useEffect(()=>{
        setAllSel(items.length === numSel && numSel !== 0);
    }, [numSel]);
    useEffect(()=>{
        initFieldIndexes();
    }, []);
    return(
        <div>
            <TableToolbar/>
            <table className="inventory-items">
                <thead>
                    <tr>
                        <th><input type="checkbox" 
                            name="checkbox-select-all" 
                            className="checkbox"
                            onChange={(e)=>handleSelAll(e.currentTarget.checked)}
                            checked={allSel}/>
                        </th>
                        {headers.map((header)=>(
                            <th key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {data.length === 0 ? <tr><td colSpan="10" style={{padding: "10px", textAlign:"center"}}> No records </td></tr> : null}
                {
                    data.map((record, index) => (
                        <tr key={index}>
                            <td>
                                <input type="checkbox" 
                                    name="checkbox-item"
                                    id={"checkbox-"+ index}
                                    className="checkbox" 
                                    value={index} 
                                    onChange={(e)=>handleSel(e.target)}/> 
                            </td>
                            {Object.keys(record).map((field, idx)=>(
                                <td key={field + '-' + idx}>
                                    {record[field]}
                                </td>
                            ))}
                            <td> {item.code} </td>
                            <td> {item.name} </td>
                            <td> {item.price} </td>
                            <td> {item.cost} </td>
                            <td> {item.category} </td>
                            <td> {item.qty} </td>
                            <td> {item.qtyThresh} </td>
                            <td> {item.maxAddon} </td>
                            <td> {item.updatedAt} </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Table