import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../../graphql/queries';

function PORunDown({poForm, setPOForm, opRes, setOpRes, performOp}) {
    const [onHand, setOnHand] = useState(new Map());
    const po = poForm.po;

    function handleEditPO() {
        //Process the PO items ensuring there are no null fields
        for(let i = 0; i < po.orderedProducts.length; i++) {
            if(po.orderedProducts[i].receivedDate === null) {
                po.orderedProducts[i].receivedDate = "";
            }
            if(po.orderedProducts[i].goodTill === null) {
                po.orderedProducts[i].goodTill = "";
            }
        }
        setPOForm({po: po, op: "edit"});
    }
    async function fetchOnHandItems() {
        //Queries the Item inventory and maps each item to its in stock qty
        try {
            const inventoryData = await API.graphql({query: listItems, 
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            const invItems = inventoryData.data.listItems.items;
            const invMap = new Map();
            for(let i = 0; i < invItems.length; i++) {
                invMap.set(invItems[i].code, invItems[i].qty);
            }
            setOnHand(invMap);
        } catch(e) {
            console.log(e);
            setOpRes({...opRes, errorMsg:"Error: Could not fetch On Hand Item Quantities"});
        }
    }
    useEffect(()=>{
        fetchOnHandItems();
    }, []);
    return(
        <div>
            <ul>
               <li>Order#: {po.id}</li> 
               <li>Vendor ID: {po.vendorId}</li>
               <li>Status: {po.isOpen ? "Open" : "Closed"}</li>
               <li>Date: {po.date}</li>
               <li>
                <button type="button" 
                    onClick={()=>setPOForm({...poForm, op: "view-all"})}>Back
                </button>
                </li>
               <li><button type="button" onClick={()=>handleEditPO()}>Edit Order</button></li>
               <li><button type="button" onClick={()=>performOp("remove", po)}>Delete Order</button></li>
               <li><button type="button">Send Order</button></li>
            </ul>
            <h3>Order Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>In Stock</th>
                        <th>Purchased</th>
                        <th>Unit Cost</th>
                        <th>Total Cost</th>
                        <th>Good Until</th>
                        <th>Date Received</th>
                        <th>Qty. Received</th>
                    </tr>
                </thead>
                <tbody>
                {po.orderedProducts.map((item, idx)=>(
                    <tr key={idx}>
                        <td>{item.itemCode}</td>
                        <td>{item.itemName}</td>
                        <td>{onHand.get(item.itemCode)}</td>
                        <td>{item.numPurchased}</td>
                        <td>{item.unitCost}</td>
                        <td>{item.totalCost}</td>
                        <td>{item.receivedDate}</td>
                        <td>{item.goodTill}</td>
                        <td><input type="number"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PORunDown;