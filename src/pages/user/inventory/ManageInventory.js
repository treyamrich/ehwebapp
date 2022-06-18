import React, { useState, useEffect } from 'react';
import InventoryContent from './InventoryContent.js';
import '../../../styles/inventory.css';

const i0 = {
    code: "DCP21013",
    name: "Black 10x13 Plaque",
    category: "Plaque",
    remainQty: 0,
    qtyThresh: 4,
    price: 15.59,
    cost: 5.29,
    maxAddon: 5,
    description: "None"
};
const i1 = {
    code: "DCP31013",
    name: "Walnut 10x13 Plaque",
    category: "Plaque",
    remainQty: 0,
    qtyThresh: 4,
    price: 15.59,
    cost: 5.29,
    maxAddon: 5,
    description: "None"
};
const i2 = {
    code: "DCP11013",
    name: "Cherry 10x13 Plaque",
    category: "Plaque",
    remainQty: 0,
    qtyThresh: 4,
    price: 15.59,
    cost: 5.29,
    maxAddon: 5,
    description: "None"
};
const inventory = [i0, i1, i2];

function ManageInventory({isAdmin}) {
    const [op, setOp] = useState("none");
    const [selItems, setSelItems] = useState([]);
    /*
    if(!isAdmin) {
        return <h1 style={{marginTop: "100px"}}>This page is not available.</h1>;
    }*/
    return (
        <div>
            <h1>Inventory Management</h1>
            <div className="main-inventory-wrapper">
                <div className="inventory-tool-bar">
                    <label>Search:</label>
                    <input type="text"/>
                    <button>Find</button>
                    <select onChange={(e)=>setOp(e.target.value)}>
                        <option value="none">Actions</option>
                        {selItems.length >= 1 ? <option value="delete">Delete Items</option> : null}
                        {selItems.length === 1 ? <option value="add">Edit Item</option> : null}
                        <option value="import">Import from CSV</option>
                        <option value="export">Export to CSV</option>
                    </select>
                    <button id="add-item-button">Add Item</button>
                </div>
                <InventoryContent items={inventory} selItems={selItems} setSelItems={setSelItems}/>
            </div>
        </div>
    );
}

export default ManageInventory;