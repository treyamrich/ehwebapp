import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../graphql/queries';
import InventoryContent from './InventoryContent.js';
import '../../../styles/inventory.css';

function ManageInventory({isAdmin}) {

    //if(!isAdmin) return <h1 style={{marginTop: "100px"}}>This page is not available.</h1>;

    const [op, setOp] = useState("none");
    const [inventory, setInventory] = useState([]);
    const [selItems, setSelItems] = useState(new Set());
    const [numSel, setNumSel] = useState(0);

    async function fetchInventory() {
        try {
            const inventoryData = await API.graphql({query: listItems});
            setInventory(inventoryData.data.listItems.items);
        } catch(e) {
            alert("Error fetching inventory.");
            console.log(e);
        }
    }

    useEffect(()=>{
		fetchInventory();
	}, []);
    
    return (
        <div>
            <h1>Inventory Management</h1>
            <div className="main-inventory-wrapper">
                <div className="inventory-tool-bar">
                    <form>
                        <label>Item Count: {inventory.length}</label>
                        <label>Search:</label>
                        <input type="text"/>
                        <button>Find</button>
                        <select onChange={(e)=>setOp(e.target.value)}>
                            <option value="none">Actions</option>
                            {numSel >= 1 ? <option value="delete">Delete Items</option> : null}
                            {numSel === 1 ? <option value="add">Edit Item</option> : null}
                            <option value="import">Import from CSV</option>
                            <option value="export">Export to CSV</option>
                        </select>
                        <button type="button" id="add-item-button">Add Item</button>
                    </form>
                </div>
                <InventoryContent items={inventory} setNumSel={setNumSel} selItems={selItems} setSelItems={setSelItems}/>
            </div>
        </div>
    );
}

export default ManageInventory;