import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { updateItems } from '../../../../graphql/mutations';
import { getItems, listItems } from '../../../../graphql/queries';
import { POIncomingItems, POReceivedItems } from './index';
import { formatDate } from '../../../../utility/DateTimeFunctions';
import { arrToString } from '../../../../utility/ArrayToString';

function PORunDown({poForm, setPOForm, opRes, setOpRes, performOp}) {
    const po = poForm.po;
    
    const [incItems, setIncItems] = useState([]);
    const [rcvItems, setRcvItems] = useState([]);
    //Used to easily change a POItem in a Purchase Order, and will be converted to an array
    const [POItemMap, setPOItemMap] = useState(null);
 
    //Precondition: items must be of type POItem in the GraphQL schema
    async function updateItemsInInventory(items, adjustment=0) {
        let poItem, dbItem, dbResp;
        let changedPOItems = [];
        let failItems = [];
        let failMsg = "Error: Item(s) ";

        //Filter out the items that have been modified and update the local POItems in the POItemMap
        for(let i = 0; i < items.length; i++) {
            poItem = POItemMap.get(items[i].itemCode);
            if(poItem.numReceived !== items[i].numReceived ||
                poItem.receivedDate !== items[i].receivedDate) {
                    changedPOItems.push(items[i]);
                    POItemMap.set(items[i].itemCode, items[i]);
                }
        }
        if(changedPOItems.length === 0) return;
        
        //Update the PO in the PurchaseOrder table and verify success
        po.orderedProducts = Array.from(POItemMap.values());
        if(!(await performOp("edit", po, true))) return;
    
        //Update the Item qty in the Items table
        for(let i = 0; i < changedPOItems.length; i++) {
            try {
                dbResp = await API.graphql({ query: getItems, 
                    variables: {
                        code: changedPOItems[i].itemCode
                    }, 
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });

                //Update item qty
                dbItem = dbResp.data.getItems;
                dbItem.qty += parseInt(adjustment === 0 ? 
                    changedPOItems[i].numReceived : adjustment);
                

                //REMOVE THIS LATER
                dbItem.createdAt = undefined;
                dbItem.updatedAt = undefined;

                await API.graphql({ query: updateItems, 
                    variables: {
                        input: dbItem
                    }, 
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                });
            } catch(e) {
                console.log(e);
                failItems.push(changedPOItems[i].itemCode);
                continue;
            }
        }
        if(failItems.length > 0) {
            failMsg += arrToString(failItems);
            failMsg += " could not be added to the inventory";
            setOpRes({...opRes, failureMsg: failMsg});
        }
        sortItems();
    }
    function sortItems() {
        //Initializes the state that is passed to the child components
        const initIncItems = [];
        const initRcvItems = [];
        //Traverse the PO Ordered Items and sort them by incoming or received
        //for the incoming/received items components
        for(let i = 0; i < po.orderedProducts.length; i++) {
            po.orderedProducts[i].numReceived > 0 ?
            initRcvItems.push({...po.orderedProducts[i]}) :
            initIncItems.push({...po.orderedProducts[i], 
                receivedDate: formatDate(new Date())
            });
        }
        setIncItems(initIncItems);
        setRcvItems(initRcvItems);
    }
    useEffect(()=>{
        sortItems();
    }, [poForm.po]);
    useEffect(()=>{
        const POItemMap = new Map();
        //Initialize map for efficient POItem updating
        for(let i = 0; i < po.orderedProducts.length; i++) {
            POItemMap.set(po.orderedProducts[i].itemCode, po.orderedProducts[i]);
        }
        setPOItemMap(POItemMap);
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
               <li><button type="button" onClick={()=>setPOForm({po: po, op: "edit"})}>Edit Order Items</button></li>
               <li><button type="button" onClick={()=>performOp("remove", po)}>Delete Order</button></li>
               <li><button type="button">Send Order</button></li>
            </ul>
            <h3>Order Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>On Hand</th>
                        <th>Purchased</th>
                        <th>Unit Cost</th>
                        <th>Total Cost</th>
                        <th>Good Until</th>
                    </tr>
                </thead>
                <tbody>
                {po.orderedProducts.map((item, idx)=>(
                    <tr key={"ItemInfo-"+idx}>
                        <td>{item.itemCode}</td>
                        <td>{item.itemName}</td>
                        <td>{item.numReceived}</td>
                        <td>{item.numPurchased}</td>
                        <td>{item.unitCost}</td>
                        <td>{item.totalCost}</td>
                        <td>{item.goodTill ? item.goodTill : "Forever"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <POIncomingItems 
                incItems={incItems} 
                setIncItems={setIncItems}
                updateItemsInInventory={updateItemsInInventory}
            />
            <POReceivedItems 
                rcvItems={rcvItems}
                updateItemsInInventory={updateItemsInInventory}
            />
        </div>
    );
}

export default PORunDown;