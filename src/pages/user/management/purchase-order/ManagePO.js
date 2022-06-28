import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listPurchaseOrders } from '../../../../graphql/queries';
import POForm from './POForm';
import { createPurchaseOrder } from '../../../../graphql/mutations';

const initialPOFormState = {
    op: "view",
    show: false,
    po: undefined
};

function ManagePO({opRes, setOpRes}) {
    const [openPO, setOpenPO] = useState([]);
    const [closedPO, setClosedPO] = useState([]);
    const [poForm, setPOForm] = useState(initialPOFormState);

    async function addPO(po) {
        //Adds a purchase order to the database
        try {
            await API.graphql({ query: createPurchaseOrder, 
                variables: {input: po}, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        } catch(e) {
            opRes.failItems.push(po.id);
            return;
        }
        opRes.succItems.push(po.id);
    }
    async function fetchPO() {
        try {
            const openPOData = await API.graphql({query: listPurchaseOrders,
                variables: {
                    filter: {
                        isOpen: {
                            eq: true
                        }
                    }
                }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
            const closedPOData = await API.graphql({query: listPurchaseOrders, 
                variables: {
                    filter: {
                        isOpen: {
                            eq: false
                        }
                    }
                }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
            setOpenPO(openPOData.data.listPurchaseOrders.items);
            setClosedPO(closedPOData.data.listPurchaseOrders.items);
        } catch(e) {
            alert(e);
            //setOpRes({...opRes, errorMsg:"Error: Could not fetch purchase orders"});
        }
    }
    async function performOp(op, po=null) {
        //items will be an array if the operation is import
        opRes.succItems = [];
        opRes.failItems = [];
        opRes.succMsg = "";
        opRes.failMsg = "";
        var succMsg = "Successfully ";
        var failMsg = "Failed to ";
        
        //Choose an operation
        switch(op) {
            /*case "remove": {
                await removeItems();
                succMsg += "removed item(s): ";
                failMsg += "remove item(s): ";
                setSelBoxes(new Set());
                setNumSel(0);
                break;
            }
            case "edit": {
                await editItem(po);
                succMsg += "edited: ";
                failMsg += "edit: ";
                setItemForm({item: null, op: "none", show: false});
                break;
            }*/
            case "add": {
                await addPO(po);
                succMsg += "added PO#: ";
                failMsg += "add PO#: ";
                setPOForm({po: null, op: "view", show: false});
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
        fetchPO();
    }
    useEffect(()=>{
        if(poForm.op === "view")
            fetchPO();
    }, [poForm.op]);

    return(
        <div className="po-main-wrapper">
            {poForm.op === "view" && (
            <div>
                <div>
                    <button onClick={()=>setPOForm({po: null, show: true, op: "add"})}> Add PO</button>
                    </div>
                <div>
                    <h1>Open</h1>
                    <div className="po-item-wrapper">
                        {openPO.map((po, index)=> (
                            <ul key={index} onClick={()=>setPOForm({op: "edit", po: po, show: true})}>
                                <li>Vendor: {po.vendorId}</li>
                                <li>Date: {po.date}</li>
                                <li>Number of purchased products: {po.orderedProducts.length}</li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div>
                    <h1>Closed</h1>
                    <div className="po-item-wrapper">
                        {closedPO.map((po, index)=> (
                            <ul key={index} onClick={()=>setPOForm({op: "edit", po: po, show: true})}>
                                <li>Vendor: {po.vendorId}</li>
                                <li>Date: {po.date}</li>
                                <li>Number of purchased products: {po.orderedProducts.length}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            )}
            {poForm.show ? <POForm poForm={poForm} 
                setPOForm={setPOForm} 
                performOp={performOp}
                /> : null}
        </div>
    );
}

export default ManagePO;