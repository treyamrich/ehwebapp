import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../graphql/queries';
import { deleteItems, updateItems } from '../../../graphql/mutations';
import InventoryContent from './InventoryContent.js';
import '../../../styles/inventory.css';

const initialOpState = {
    successMsg: "",
    failureMsg: "",
    succItems: [], 
    failItems: [] 
};

function ManageInventory() {

    const [inventory, setInventory] = useState([]);
    const [numSel, setNumSel] = useState(0);
    //Track items that failed/succeeded after an operation
    const [opRes, setOpRes] = useState(initialOpState);

    async function removeItems(selItems) {
        var itemCode;
        for(let i = 0; i < selItems.length; i++) {
            itemCode = selItems[i].value;
            try {
                await API.graphql({ query: deleteItems, 
                    variables: { 
                        input: { 
                            code: itemCode
                        }
                    },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
            } catch(e) {
                opRes.failItems.push(itemCode);
                continue;
            }
            opRes.succItems.push(itemCode);
        }
    }
    async function fetchInventory() {
        try {
            const inventoryData = await API.graphql({query: listItems, authMode: 'AMAZON_COGNITO_USER_POOLS'});
            setInventory(inventoryData.data.listItems.items);
        } catch(e) {
            setOpRes({...opRes, errorMsg:"Error: Could not fetch inventory"});
        }
    }

    async function performOp(op) {
        setOpRes({successMsg: "", failureMsg: "", succItems: [], failItems: []});
        let selItems = document.querySelectorAll('input[name="checkbox-item"]:checked');
        var succMsg = "Successfully ";
        var failMsg = "Failed to ";

        //Choose an operation
        switch(op) {
            case "remove": {
                await removeItems(selItems);
                succMsg += "removed items: ";
                failMsg += "remove items: ";
                break;
            }
            default: {
                //editItem();
                break;
            }
        }

        //Uncheck all previously checked items
        for(let i = 0; i < selItems; i++)
            selItems[i].checked = false;

        //Display operation result
        for(let i = 0; i < opRes.succItems.length; i++) {
            succMsg += opRes.succItems[i];
            if(i !== opRes.succItems.length - 1 && opRes.succItems.length > 1)
                succMsg += ", ";
        }
        for(let i = 0; i < opRes.failItems.length; i++) {
            failMsg += opRes.failItems[i];
            if(i !== opRes.failItems.length - 1 && opRes.failItems.length > 1)
                failMsg += ", ";
        }

        //Regrab the inventory and display result
        setOpRes({...opRes, successMsg: succMsg, failureMsg: failMsg});
        setNumSel(0);
        fetchInventory();
    }
    useEffect(()=>{
		fetchInventory();
	}, []);
    
    return (
        <div>
            <h1>Inventory Management</h1>
            <div className="main-inventory-wrapper">
                {opRes.failItems.length !== 0 ? <h1>{opRes.failureMsg}</h1> : null}
                {opRes.succItems.length !== 0 ? <h1>{opRes.successMsg}</h1> : null}
                <div className="inventory-tool-bar">
                    <form>
                        <label>Item Count: {inventory.length}</label>
                        <label>Search:</label>
                        <input type="text"/>
                        <button>Find</button>
                        <select onChange={(e)=>performOp(e.target.value)}>
                            <option value="none">Actions</option>
                            {numSel >= 1 ? <option value="remove">Delete Items</option> : null}
                            {numSel === 1 ? <option value="edit">Edit Item</option> : null}
                            <option value="import">Import from CSV</option>
                            <option value="export">Export to CSV</option>
                        </select>
                        <button type="button" id="add-item-button">Add Item</button>
                    </form>
                </div>
                <InventoryContent items={inventory} numSel={numSel} setNumSel={setNumSel}/>
            </div>
        </div>
    );
}

export default ManageInventory;