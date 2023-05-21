import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { updateItems } from '../../../graphql/mutations';
import { getItems, listItems } from '../../../graphql/queries';
import { POIncomingItems, POReceivedItems } from './index';
import { formatDate } from '../../../utility/DateTimeFunctions';
import { arrToString } from '../../../utility/Strings';

function PORunDown({poForm, setPOForm, opRes, setOpRes, performOp}) {
    const po = poForm.po;
    
    const [incItems, setIncItems] = useState([]);
    const [rcvItems, setRcvItems] = useState([]);
    //Used to easily change a POItem in a Purchase Order, and will be converted to an array
    const [POItemMap, setPOItemMap] = useState(null);
    //Used to access the item qty in the Items table 
    const [invItemMap, setInvItemMap] = useState(null);
 
    //Precondition: items must be of type POItem in the GraphQL schema
    async function updateItemsInInventory(items, adjustment=0) {
        let poItem, invItem;
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
        let promises = [];
        for(let i = 0; i < changedPOItems.length; i++) {
            //Update item qty
            invItem = invItemMap.get(changedPOItems[i].itemCode);
            invItem.qty += parseInt(adjustment === 0 ? 
                changedPOItems[i].numReceived : adjustment);
            invItemMap.set(invItem.itemCode, invItem);

            //REMOVE THIS LATER
            invItem.createdAt = undefined;
            invItem.updatedAt = undefined;

            let respPromise = API.graphql({ query: updateItems, 
                variables: {
                    input: invItem
                }, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            }).catch((e)=>{
                console.log(e);
                failItems.push(changedPOItems[i].itemCode);
                //Revert the PO edit operation since item failed to update
                poItem = POItemMap.get(changedPOItems[i].itemCode);
                poItem.numReceived = adjustment !== 0 ?
                    changedPOItems[i].numReceived - adjustment : 0;
                POItemMap.set(poItem.itemCode, poItem);
            });
            promises.push(respPromise);
        }
        //Wait for ALL items quantities to be updated
        await Promise.all(promises);

        if(failItems.length > 0) {
            //Redo the PO edit database operation
            po.orderedProducts = Array.from(POItemMap.values());
            await performOp("edit", po, true, true);

            //Display failure message
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
        let poItem;
        for(let i = 0; i < po.orderedProducts.length; i++) {
            poItem = po.orderedProducts[i];
            poItem.numReceived > 0 || poItem.adjustments ?
            initRcvItems.push({...po.orderedProducts[i]}) :
            initIncItems.push({...po.orderedProducts[i], 
                receivedDate: formatDate(new Date())
            });
        }
        setIncItems(initIncItems);
        setRcvItems(initRcvItems);
    }
    async function initItemMaps() {
        //Initialize POItem map and Inventory Item map for efficient data modification
        const POItemMap = new Map();
        const InvItemMap = new Map();
        let iCode = "";
        let proms = [];

        for(let i = 0; i < po.orderedProducts.length; i++) {
            iCode = po.orderedProducts[i].itemCode;
            POItemMap.set(iCode, po.orderedProducts[i]);
            //Fetch inventory item then map it
            proms.push( 
                API.graphql({ query: getItems, 
                    variables: {
                        itemCode: iCode
                    }, 
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                }).catch((e)=> {
                    console.log(e);
                    return true;
                }).then((resp)=> {
                    if(resp === true) return;
                    InvItemMap.set(resp.data.getItems.itemCode, resp.data.getItems);
                })
            );
        }
        await Promise.all(proms);

        setPOItemMap(POItemMap);
        setInvItemMap(InvItemMap);
    }
    useEffect(()=>{
        sortItems();
    }, [poForm.po]);
    useEffect(()=>{
        initItemMaps();
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
                invItemMap={invItemMap}
                updateItemsInInventory={updateItemsInInventory}
            />
        </div>
    );
}

export default PORunDown;