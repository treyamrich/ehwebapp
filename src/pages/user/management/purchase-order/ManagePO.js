import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems, listPurchaseOrders } from '../../../../graphql/queries';
import POForm from './POForm';
import PORunDown from './PORunDown';
import { createPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } from '../../../../graphql/mutations';

const initialPOFormState = {
    op: "view-all",
    po: undefined
};

function ManagePO({opRes, setOpRes}) {
    const [openPO, setOpenPO] = useState([]);
    const [closedPO, setClosedPO] = useState([]);
    const [poForm, setPOForm] = useState(initialPOFormState);
    const [onHand, setOnHand] = useState(null);

    async function removePO(po) {
        try {
            await API.graphql({ query: deletePurchaseOrder, 
                variables: {
                    input: {
                        id: po.id
                    }
                }, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        } catch(e) {
            opRes.failItems.push(po.id);
            console.log(e);
            return;
        }
        opRes.succItems.push(po.id);
    }
    async function addPO(po) {
        let addPOData;
        try {
            addPOData = await API.graphql({ query: createPurchaseOrder, 
                variables: {input: po}, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });

        } catch(e) {
            opRes.failItems.push(po.id);
            console.log(e);
            return;
        }
        opRes.succItems.push(addPOData.data.createPurchaseOrder.id);
    }
    async function editPO(po) {
        po.createdAt = undefined; //REMOVE THIS LATER AND USE AN OPTIMIZED GRAPHQL QUERY
        po.updatedAt = undefined;
        try {
            await API.graphql({ query: updatePurchaseOrder, 
                variables: {input: po}, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
        }
        catch (e) {
            opRes.failItems.push(po.id);
            console.log(e);
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
            console.log(e);
            setOpRes({...opRes, errorMsg:"Error: Could not fetch Purchase Orders"});
        }
    }
    async function performOp(op, po=null) {
        //Performs a database operation, displays the result, resets state
        // and refetches database items

        opRes.succItems = [];
        opRes.failItems = [];
        opRes.succMsg = "";
        opRes.failMsg = "";
        var succMsg = "Successfully ";
        var failMsg = "Failed to ";
        
        //Choose an operation
        switch(op) {
            case "remove": {
                await removePO(po);
                succMsg += "removed PO#: ";
                failMsg += "remove PO#: ";
                break;
            }
            case "edit": {
                await editPO(po);
                succMsg += "edited PO#: ";
                failMsg += "edit PO#: ";
                break;
            }
            case "add": {
                await addPO(po);
                succMsg += "created PO#: ";
                failMsg += "create PO#: ";
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
        //Regrab the PO and display result
        setPOForm(op === "edit" ? {po: po, op: "view-po"} : {po: null, op: "view-all"});
        setOpRes({...opRes, successMsg: succMsg, failureMsg: failMsg});    
        fetchPO();
    }
    useEffect(()=>{
        if(poForm.op === "view-all") {
            fetchPO();
        }
    }, [poForm.op]);

    return(
        <div className="po-main-wrapper">
            {poForm.op === "view-all" && (
            <div>
                <div>
                    <button onClick={()=>setPOForm({po: null, op: "add"})}> Add PO</button>
                    </div>
                <div>
                    <h1>Open</h1>
                    <div className="po-item-wrapper">
                        {openPO.map((po, index)=> (
                            <ul key={index} onClick={()=>setPOForm({po: po, op: "view-po"})}>
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
                            <ul key={index} onClick={()=>setPOForm({po: po, op: "view-po"})}>
                                <li>Vendor: {po.vendorId}</li>
                                <li>Date: {po.date}</li>
                                <li>Number of purchased products: {po.orderedProducts.length}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            )}
            {poForm.op === "view-po" ? <PORunDown poForm={poForm} 
                setPOForm={setPOForm}
                opRes={opRes}
                setOpRes={setOpRes}
                performOp={performOp} /> : null}
            {poForm.op === "add" || poForm.op === "edit" ? <POForm poForm={poForm} 
                setPOForm={setPOForm}
                opRes={opRes}
                setOpRes={setOpRes}
                performOp={performOp} /> : null}
        </div>
    );
}

export default ManagePO;