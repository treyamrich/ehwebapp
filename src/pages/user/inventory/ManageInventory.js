import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../graphql/queries';
import { createItems, deleteItems, updateItems } from '../../../graphql/mutations';
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
        try {
            API.graphql({ query: updateItems, variables: {input: item}, authMode: "AMAZON_COGNITO_USER_POOLS"});
        } catch(e) {
            opRes.failItems.push(item.itemCode);
            return;
        }
        opRes.succItems.push(item.itemCode);
    }
    //Adds a SINGLE item to the database
    async function addItem(item) {
        try {
            API.graphql({ query: createItems, variables: {input: item}, authMode: "AMAZON_COGNITO_USER_POOLS"});
        } catch(e) {
            opRes.failItems.push(item.itemCode);
            return;
        }
        opRes.succItems.push(item.itemCode);
    }
    async function fetchInventory() {
        try {
            const inventoryData = await API.graphql({query: listItems, authMode: 'AMAZON_COGNITO_USER_POOLS'});
            setInventory(inventoryData.data.listItems.items);
        } catch(e) {
            setOpRes({...opRes, errorMsg:"Error: Could not fetch inventory"});
        }
    }

    async function performOp(op, items=null) {
        //items will be an array if the operation is import
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
                await editItem(items);
                itemForm.item = null;
                itemForm.op = "none";
                succMsg += "edited: ";
                failMsg += "edit: ";
                break;
            }
            case "add": {
                await addItem(items);
                succMsg += "added: ";
                failMsg += "add: ";
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
    //Chooses the operation based on the select value
    function selectOp(op) {
        switch(op) {
            case "delete": {
                performOp(op);
                break;
            }
            case "edit": {
                let elm = document.querySelectorAll('input[name="checkbox-item"]:checked');
                console.log(elm);
                //let updateItem = inventory.filter((val)=>val === elm[0].value);
                let updateItem;
                for(let i = 0; i < inventory.length; i++) {
                    if(inventory[i].code === elm[0].value) {
                        updateItem = inventory[i];
                        break;
                    }
                }
                console.log(updateItem);
                setItemForm({items: [updateItem], op: "edit", show: true});
                break;
            }
            default:{}
        }
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
                        <select onChange={(e)=>selectOp(e.target.value)}>
                            <option value="none">Actions</option>
                            {numSel < 1 ? null :
                                <option value="remove">Delete Items</option>
                            }
                            {numSel !== 1 ? null :
                                <option value="edit">Edit Item</option>
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