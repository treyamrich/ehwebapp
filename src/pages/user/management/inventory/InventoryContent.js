import React, { useState, useEffect } from 'react';

//This component displays all inventory items in a table, and handles checkbox select logic
function InventoryContent({items, selBoxes, setSelBoxes, numSel, setNumSel}) {
    const [allSel, setAllSel] = useState(false);

    //Selecting a single checkbox
    function selectOneCheckbox(cbox) {
        console.log(cbox);
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
    function selectAllCheckbox(isSelAll) {
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
    useEffect(()=>{
        setAllSel(items.length === numSel && numSel !== 0);
    }, [numSel]);
    return(
        <table className="inventory-items">
            <thead>
                <tr>
                    <th><input type="checkbox" 
                        name="checkbox-select-all" 
                        className="checkbox"
                        onChange={(e)=>selectAllCheckbox(e.currentTarget.checked)}
                        checked={allSel}/>
                    </th>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Cost</th>
                    <th>Category</th>
                    <th>Qty.</th>
                    <th>Reorder Threshold</th>
                    <th>Max Add-ons</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
            {items.length === 0 ? <tr><td colSpan="10" style={{padding: "10px", textAlign:"center"}}> No items </td></tr> : null}
            {
                items.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <input type="checkbox" 
                                name="checkbox-item"
                                id={"checkbox-"+ index}
                                className="checkbox" 
                                value={index} 
                                onChange={(e)=>selectOneCheckbox(e.target)}/> 
                        </td>
                        <td> {item.code} </td>
                        <td> {item.name} </td>
                        <td> {item.price} </td>
                        <td> {item.cost} </td>
                        <td> {item.category} </td>
                        <td> {item.qty} </td>
                        <td> {item.qtyThresh} </td>
                        <td> {item.maxAddon} </td>
                        <td> {item.description} </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default InventoryContent;