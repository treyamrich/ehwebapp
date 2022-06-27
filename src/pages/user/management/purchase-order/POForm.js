import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../../graphql/queries';

const initialPOState = {
    vendorId: "",
    date: "",
    orderedProducts: [],
    isOpen: true
};

function POForm({poForm, setPOForm, performOp}) {
    
    const [po, setPO] = useState(poForm.op === "edit" ? poForm.po : initialPOState);
    const [inventory, setInventory] = useState([]);

    async function fetchInventory() {
        try {
            const inventoryData = await API.graphql({query: listItems, authMode: 'AMAZON_COGNITO_USER_POOLS'});
            setInventory(inventoryData.data.listItems.items);
        } catch(e) {
            //setOpRes({...opRes, errorMsg:"Error: Could not fetch inventory"});
        }
    }

    useEffect(()=>{
        fetchInventory();
    }, []);

    return(
        <div id="item-form-wrapper">
            <h2 className="item-form">{poForm.op === "add" ? "Create" : "Edit"} a purchase order</h2>
            <form id="item-form" name="item-form">
                <label htmlFor="vendId">Vendor ID:</label>
                <input type="text" 
                    placeholder="woodpenpro" 
                    name="vendId"
                    onChange={(e)=>setPO({...po, vendorId: e.target.value})}
                    value={po.vendorId}/>
                <label htmlFor="po-date">Order Date:</label>
                <input type="date"
                    name="po-date"
                    onChange={(e)=>setPO({...po, date: e.target.value})}
                    value={po.date}/>
                <label>
                    <input type="radio" name="po-status" value={true} 
                        defaultChecked={poForm.op === "add" || po.isOpen} 
                        onClick={(e)=>setPO({...po, isOpen: e.target.value})}
                        required/>Open
                </label>
                <label>
                    <input type="radio" name="po-status" value={false} 
                        defaultChecked={!po.isOpen} 
                        onClick={(e)=>setPO({...po, isOpen: e.target.value})}
                        required/>Closed
                </label>
                <div>
                    <button type="button">Add an item</button>
                </div>
            </form>
        </div>
    )
}

export default POForm;