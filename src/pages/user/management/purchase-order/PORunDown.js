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
    const [POItemMap, setPOItemMap] = useState(null);
 
    async function updatePOItems(updatedItems) {
        //Use map to update the item received date and qty if the user entered one
        for(let i = 0; i < updatedItems.length; i++) {
            if(updatedItems[i].numReceived > 0) {
                POItemMap.set(updatedItems[i].itemCode, updatedItems[i]);
            }
        }
        let newPOItems = Array.from(POItemMap.values());
        po.orderedProducts = newPOItems;

        let success = performOp("edit", po, true);
        setPOForm({...poForm, po: {...po, orderedProducts: newPOItems}});
        return success;
    }

    async function addPOItemsToInventory(items) {
        if(!(await updatePOItems(items))) return;
    
        //Track items if they fail to be updated
        let failItems = [];
        let succItemObjs = [];
        let failMsg = "Error: Item(s) ";

        for(let i = 0; i < items.length; i++) {
            if(items[i].numReceived > 0) {
                try {
                    const dbResp = await API.graphql({ query: getItems, 
                        variables: {
                            code: items[i].itemCode
                        }, 
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    });

                    //Update item qty
                    const item = dbResp.data.getItems;
                    item.qty += parseInt(items[i].numReceived);

                    //REMOVE THIS LATER
                    item.createdAt = undefined;
                    item.updatedAt = undefined;

                    await API.graphql({ query: updateItems, 
                        variables: {
                            input: item
                        }, 
                        authMode: "AMAZON_COGNITO_USER_POOLS"
                    });
                } catch(e) {
                    console.log(e);
                    failItems.push(items[i].itemCode);
                    continue;
                }
                succItemObjs.push(items[i]);
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

        //Traverse the PO Ordered Items and sort them by incoming or received
        //for the incoming/received items components
        const initIncItems = [];
        const initRcvItems = [];
        for(let i = 0; i < po.orderedProducts.length; i++) {
            po.orderedProducts[i].numReceived > 0 ?
            initRcvItems.push(po.orderedProducts[i]) :
            initIncItems.push({...po.orderedProducts[i], 
                receivedDate: formatDate(new Date())
            });
        }
        setIncItems(initIncItems);
        setRcvItems(initRcvItems);
    }
    useEffect(()=>{
        const POItemMap = new Map();
        //Initialize map for efficient POItem updating
        for(let i = 0; i < po.orderedProducts.length; i++) {
            POItemMap.set(po.orderedProducts[i].itemCode, po.orderedProducts[i]);
        }
        setPOItemMap(POItemMap);
        sortItems();
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
                addPOItemsToInventory={addPOItemsToInventory}
            />
            <POReceivedItems rcvItems={rcvItems} setRcvItems={setRcvItems}/>
        </div>
    );
}

export default PORunDown;