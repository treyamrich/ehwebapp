import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../../graphql/queries';
import { POIncomingItems, POReceivedItems } from './index';
import { formatDate } from '../../../../utility/DateTimeFunctions';

function PORunDown({poForm, setPOForm, opRes, setOpRes, performOp}) {
    const po = poForm.po;
    const initIncItems = [];
    const initRcvItems = [];

    //Process the PO items ensuring there are no null fields
    for(let i = 0; i < po.orderedProducts.length; i++) {
        if(po.orderedProducts[i].receivedDate === null) {
            po.orderedProducts[i].receivedDate = "";
        }
        if(po.orderedProducts[i].goodTill === null) {
            po.orderedProducts[i].goodTill = "";
        }
    }

    //ToDo are the POItems that need to be updated from the user
    //Received Products are the products that have been marked as received
    for(let i = 0; i < po.orderedProducts.length; i++) {
        po.orderedProducts[i].receivedDate ?
            initRcvItems.push(po.orderedProducts[i]) :
            initIncItems.push({...po.orderedProducts[i], 
                receivedDate: formatDate(new Date())
            });
    }
    const [incItems, setIncItems] = useState(initIncItems);
    const [rcvItems, setRcvItems] = useState(initRcvItems);
    
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
            <POIncomingItems incItems={incItems} setIncItems={setIncItems}/>
            <POReceivedItems rcvItems={rcvItems} setRcvItems={setRcvItems}/>
        </div>
    );
}

export default PORunDown;