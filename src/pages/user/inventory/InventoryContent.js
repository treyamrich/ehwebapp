import React from 'react';

function InventoryContent({items, selItems, setSelItems}) {
    function selectAllCheckbox(op) {
        console.log(op);
    }
    return(
        <table className="inventory-items">
            <thead>
                <tr>
                    <th><input type="checkbox" name="checkbox-select-all" onChange={(e)=>e.currentTarget.checked ? selectAllCheckbox("sel") : selectAllCheckbox("unsel")}/></th>
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
            {items.length === 0 ? <h2 style={{padding: "10px", textAlign:"center"}}> No items </h2> : null}
            {
                items.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <input type="checkbox" 
                                name={"checkbox-item-" + index} 
                                value={item.code} 
                                onChange={(e)=>e.currentTarget.checked ? setSelItems([...selItems]) : setSelItems([...selItems])}/> 
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