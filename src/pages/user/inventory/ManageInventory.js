import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../graphql/queries';
import { deleteItems, updateItems } from '../../../graphql/mutations';
import InventoryContent from './InventoryContent';
import ItemForm from './ItemForm';
import '../../../styles/inventory.css';

const initialOpState = {
    successMsg: "",
    failureMsg: "",
    succItems: [], 
    failItems: [] 
};
const initialItemFormState = {
    op: "none",
    show: false,
    items: []
}

function ManageInventory({isAdmin}) {

    const [itemForm, setItemForm] = useState(initialItemFormState);
    const [inventory, setInventory] = useState([]);
    const [numSel, setNumSel] = useState(0);
    //Track items that failed/succeeded after an operation
    const [opRes, setOpRes] = useState(initialOpState);

    async function removeItems(selItems) {
        var itemCode;
        for(let i = 0; i < selItems.length; i++) {
            itemCode = selItems[i].value;
            try {
                API.graphql({ query: deleteItems, 
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
            selItems[i].checked = false;
        }
    }
    async function editItem(item) {

    }
    async function addItem(item) {

    }
    async function fetchInventory() {
        try {
            const inventoryData = await API.graphql({query: listItems, authMode: 'AMAZON_COGNITO_USER_POOLS'});
            setInventory(inventoryData.data.listItems.items);
        } catch(e) {
            setOpRes({...opRes, errorMsg:"Error: Could not fetch inventory"});
        }
    }

    async function performOp(op, item=null) {
        setOpRes({successMsg: "", failureMsg: "", succItems: [], failItems: []});
        var succMsg = "Successfully ";
        var failMsg = "Failed to ";

        //Choose an operation
        switch(op) {
            case "remove": {
                let selItems = document.querySelectorAll('input[name="checkbox-item"]:checked');
                await removeItems(selItems);
                succMsg += "removed item(s): ";
                failMsg += "remove item(s): ";
                break;
            }
            case "edit": {
                await editItem(item);
                break;
            }
            case "add": {
                await addItem(item);
                break;
            } 
            default: {}
        }

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
    
    if(!isAdmin) return <h1 style={{marginTop: "100px"}}>This page is not available.</h1>;
    
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
                        <select>
                            <option value="none">Actions</option>
                            {numSel < 1 ? null :
                                <option value="remove" onClick={(e)=>performOp(e.target.value)}>
                                    Delete Items
                                </option>
                            }
                            {numSel !== 1 ? null :
                                <option value="edit" onClick={()=>setItemForm({...itemForm, op: "edit", show: true})}>
                                    Edit Item
                                </option>
                            }
                            <option value="import">Import from CSV</option>
                            <option value="export">Export to CSV</option>
                        </select>
                        <button type="button" 
                            id="add-item-button" 
                            onClick={()=>setItemForm({...itemForm, op: "add", show: true})}>
                                Add Item
                        </button>
                    </form>
                </div>
                <InventoryContent items={inventory} numSel={numSel} setNumSel={setNumSel}/>
            </div>
            {itemForm.show ? <ItemForm itemForm={itemForm} setItemForm={setItemForm} performOp={performOp}/> : null}
        </div>
    );
}

export default ManageInventory;