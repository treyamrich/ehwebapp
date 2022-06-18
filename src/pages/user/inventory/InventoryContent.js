import React, { useState } from 'react';

//This component displays all inventory items in a table, and handles checkbox select logic
function InventoryContent({items, setNumSel, selItems, setSelItems}) {
    const [allSel, setAllSel] = useState(false);

    //Selecting a single checkbox
    function selectCheckbox(checked, code) {
        checked ? selItems.add(code) : selItems.delete(code);
        setSelItems(selItems);
        setNumSel(selItems.size);
        setAllSel(items.length === selItems.size && selItems.size !== 0);
    }
    //Selecting all the checkboxes
    function selectAllCheckbox(op) {
        const boxes = document.getElementsByClassName("checkbox");
        if(op === "sel") {
            for(let i = 0; i < boxes.length; i++) {
                boxes[i].checked = true;
                selItems.add(boxes[i].value);
            }
            setSelItems(selItems);
            setNumSel(items.length);
            setAllSel(true);
        } 
        else {
            for(let i = 0; i < boxes.length; i++) 
                boxes[i].checked = false;
            setSelItems(new Set());
            setNumSel(0);
            setAllSel(false);
        }
    }
    return(
        <table className="inventory-items">
            <thead>
                <tr>
                    <th><input type="checkbox" 
                        name="checkbox-select-all" 
                        onChange={(e)=>e.currentTarget.checked ? selectAllCheckbox("sel") : selectAllCheckbox("unsel")}
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
                                name={"checkbox-item-" + index}
                                className="checkbox" 
                                value={item.code} 
                                onChange={(e)=>selectCheckbox(e.currentTarget.checked, item.code)}/> 
                        </td>
                        <td> {item.code} </td>
                        <td> {item.name} </td>
                        <td> {item.price} </td>
                        <td> {item.cost} </td>
                        <td> {item.category} </td>
                        <td> {item.remainQty} </td>
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