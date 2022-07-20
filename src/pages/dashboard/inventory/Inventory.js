import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../graphql/queries';
import { createItems, deleteItems, updateItems } from '../../../graphql/mutations';
import InventoryContent from './InventoryContent';
import ItemForm from './ItemForm';
import { arrToString } from '../../../utility/ArrayToString';
import '../../../styles/inventory.css';

const initialItemFormState = {
    op: "none",
    show: false,
    item: null
}

function ManageInventory({opRes, setOpRes}) {

    //Show item operation form for: add and 
    const [itemForm, setItemForm] = useState(initialItemFormState);

    const [inventory, setInventory] = useState([]);

    //Track number of checkboxes checked instead of reallocating a new set every time
    //Checkbox values hold the corresponding inventory index to get the item info
    const [selBoxes, setSelBoxes] = useState(new Set());
    const [numSel, setNumSel] = useState(0);

    async function removeItems() {
        //Removes the items that are in the selBoxes set and unchecks the boxes
        var itemCode;
        var promises = [];
        
        selBoxes.forEach(cbox =>{
            cbox.checked = false;
            if(cbox.name === "checkbox-select-all") return;

            //Get item code from inventory arr and uncheck the checkboxes
            itemCode = inventory[cbox.value].code;

            let respPromise = API.graphql({ 
                    query: deleteItems, 
                    variables: { 
                        input: { 
                            code: itemCode
                        }
                    },
                    authMode: "AMAZON_COGNITO_USER_POOLS"
            }).catch((e)=> { 
                opRes.failItems.push(itemCode); 
                console.log(e);
                return true;
            }).then(err => {if(err !== true) opRes.succItems.push(err.data.deleteItems.code)});
            promises.push(respPromise);
        });
        //Wait for all of the requests to finish
        await Promise.all(promises);
    }
    async function editItem(item) {
        item.createdAt = undefined; //REMOVE THIS LATER AND USE AN OPTIMIZED GRAPHQL QUERY
        item.updatedAt = undefined;
        try {
            await API.graphql({ query: updateItems, 
                variables: {input: item}, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        }
        catch (e) {
            opRes.failItems.push(item.code);
            console.log(e);
            return;
        }
        opRes.succItems.push(item.code);
    }
    async function addItem(item) {
        //Adds a SINGLE item to the database
        try {
            await API.graphql({ query: createItems, 
                variables: {input: item}, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        } catch(e) {
            opRes.failItems.push(item.code);
            console.log(e);
            return;
        }
        opRes.succItems.push(item.code);
    }
    async function fetchInventory() {
        try {
            const inventoryData = await API.graphql({query: listItems, 
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            setInventory(inventoryData.data.listItems.items);
        } catch(e) {
            console.log(e);
            setOpRes({...opRes, errorMsg:"Error: Could not fetch inventory"});
        }
    }

    async function performOp(op, items=null) {
        //items will be an array if the operation is import
        opRes.succItems = [];
        opRes.failItems = [];
        var succMsg = "Successfully ";
        var failMsg = "Failed to ";
        
        //Choose an operation
        switch(op) {
            case "remove": {
                await removeItems();
                succMsg += "removed item(s): ";
                failMsg += "remove item(s): ";
                setSelBoxes(new Set());
                setNumSel(0);
                break;
            }
            case "edit": {
                await editItem(items);
                succMsg += "edited: ";
                failMsg += "edit: ";
                setItemForm({item: null, op: "none", show: false});
                break;
            }
            case "add": {
                await addItem(items);
                succMsg += "added: ";
                failMsg += "add: ";
                setItemForm({item: null, op: "none", show: false});
                break;
            } 
            default: {}
        }

        //Display operation result
        //Remove msg if no items.
        succMsg = opRes.succItems.length === 0 ? 
            "" : 
            succMsg + arrToString(opRes.succItems);
        
        failMsg = opRes.failItems.length === 0 ?
            "" :
            failMsg + arrToString(opRes.failItems);

        //Regrab the inventory and display result
        setOpRes({...opRes, successMsg: succMsg, failureMsg: failMsg});    
        fetchInventory();
    }
    //Chooses the operation based on the select value
    function selectOp(op) {
        switch(op) {
            case "remove": {
                performOp(op);
                break;
            }
            case "edit": {
                var updateItem;
                //Edge Case: 1 item in inventory and select-all box is clicked
                selBoxes.forEach((cbox)=>{
                    if(cbox.name !== "checkbox-select-all") 
                        updateItem = inventory[cbox.value];
                    cbox.checked = false;
                });
                setNumSel(0);
                setItemForm({
                    item: updateItem,  
                    op: "edit", 
                    show: true
                });
                break;
            }
            default:{}
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
                <InventoryContent items={inventory} 
                    selBoxes={selBoxes} 
                    setSelBoxes={setSelBoxes} 
                    numSel={numSel} 
                    setNumSel={setNumSel}/>
            </div>
            {itemForm.show ? 
            <ItemForm itemForm={itemForm} 
                setItemForm={setItemForm}
                performOp={performOp}/> : null}
        </div>
    );
}

export default ManageInventory;