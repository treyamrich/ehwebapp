import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../../graphql/queries';
import '../../../../styles/management_form.css';

const initialPOState = {
    vendorId: "",
    date: "",
    orderedProducts: [],
    isOpen: true
};

function POForm({poForm, setPOForm, performOp}) {
    
    const [po, setPO] = useState(poForm.op === "edit" ? poForm.po : initialPOState);
    const [inventory, setInventory] = useState([]);
    
    function preparePO(e) {
        e.preventDefault();
        performOp(poForm.op, po);
        setPO({vendorId: "", date:"", orderedProducts:[], isOpen: true});
    }
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
        <div id="manage-form-wrapper">
            <h2 className="manage-form">{poForm.op === "add" ? "Create" : "Edit"} a purchase order</h2>
            <form id="manage-form" name="manage-form" onSubmit={preparePO}>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="vendId">Vendor ID:</label>
                    </div>
                    <div className="col-75">
                        <input type="text"
                            className="manage-form" 
                            placeholder="woodpenpro" 
                            name="vendId"
                            onChange={(e)=>setPO({...po, vendorId: e.target.value})}
                            value={po.vendorId}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="po-date">Order Date:</label>
                    </div>
                    <div className="col-75">
                        <input type="date"
                            className="manage-form"
                            name="po-date"
                            onChange={(e)=>setPO({...po, date: e.target.value})}
                            value={po.date}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="po-status">
                            Order Status:
                        </label>
                    </div>
                    <div className="col-75">
                        <label className="manage-form">
                            <input type="radio" name="po-status" value={true} 
                                className="manage-form"
                                defaultChecked={poForm.op === "add" || po.isOpen} 
                                onClick={(e)=>setPO({...po, isOpen: e.target.value})}
                                required/>Open
                        </label>
                        <label className="manage-form">
                            <input type="radio" name="po-status" value={false}
                                className="manage-form" 
                                defaultChecked={!po.isOpen} 
                                onClick={(e)=>setPO({...po, isOpen: e.target.value})}
                                required/>Closed
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <button type="button"
                            className="manage-form" 
                            onClick={()=>setPO({...po, orderedProducts: [...po.orderedProducts, {
                                itemCode: "", 
                                itemName: "", 
                                numPurchased: 0,
                                unitCost: 0.0, 
                                totalCost: 0.0, 
                                receivedDate: "",
                                goodTill: "" 
                            }]})}>
                            Add an item
                        </button>
                    </div>
                    <div className="col-75">
                        <button className="manage-form" type="button" 
                            onClick={()=>setPOForm({...poForm, 
                                show: false, op: "view"})}
                            >Discard Changes
                        </button>
                        <button className="manage-form" type="submit">
                            Submit Changes
                        </button>
                    </div>
                </div>
                <div className="row">
                    {po.orderedProducts.map((prod, index)=>(
                        <div className="row" key={index}>
                            <div className="row">
                                <div className="col-25">
                                    <label className="manage-form" htmlFor={"itemCode-"+index}>
                                        Item SKU:
                                    </label>
                                </div>
                                <div className="col-75">
                                    <input className="manage-form"
                                        type="text"
                                        value={prod.itemCode}
                                        name={"itemCode-" + index}
                                        required
                                        onChange={(e)=>setPO({...po, 
                                            orderedProducts: po.orderedProducts.map((elm, idx)=>
                                            idx === index ? {...elm, 
                                                itemCode: e.target.value
                                            } : elm
                                        )})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-25">
                                <label className="manage-form" htmlFor={"itemName-" + index}>Item Name:</label>
                            </div>
                                <div className="col-75">
                                    <input className="manage-form"
                                        type="text"
                                        value={prod.itemName}
                                        name={"itemName-" + index}
                                        required
                                        onChange={(e)=>setPO({...po, 
                                            orderedProducts: po.orderedProducts.map((elm, idx)=>
                                            idx === index ? {...elm, 
                                                itemName: e.target.value
                                            } : elm
                                        )})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-25">
                                <label className="manage-form" htmlFor={"poItemQty-" + index}>Qty:</label>
                            </div>
                                <div className="col-75">
                                    <input className="manage-form"
                                        type="number"
                                        step="1"
                                        min="1"
                                        value={prod.numPurchased}
                                        name={"poItemQty-" + index}
                                        required
                                        onChange={(e)=>setPO({...po, 
                                            orderedProducts: po.orderedProducts.map((elm, idx)=>
                                                idx === index ? {...elm, 
                                                    numPurchased: e.target.value,
                                                    totalCost: e.target.value * elm.unitCost
                                                } : elm
                                        )})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label className="manage-form" htmlFor={"poItemUCost-" + index}>Unit Cost:</label>
                                </div>
                                <div className="col-75">
                                    <input className="manage-form"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={prod.unitCost}
                                        name={"poItemUCost-" + index}
                                        required
                                        onChange={(e)=>setPO({...po, 
                                            orderedProducts: po.orderedProducts.map((elm, idx)=>
                                                idx === index ? {...elm, 
                                                    unitCost: e.target.value,
                                                    totalCost: e.target.value * elm.numPurchased
                                                } : elm
                                        )})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label className="manage-form" htmlFor={"poItemTotalCost-" + index}>Total Cost:</label>
                                </div>
                                <div className="col-75">
                                    <input className="manage-form"
                                        type="text"
                                        value={prod.totalCost}
                                        name={"poItemTotalCost-" + index}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label className="manage-form" htmlFor={"poItemRecvDate-" + index}>Date Received:</label>
                                </div>
                                <div className="col-75">
                                    <input className="manage-form"
                                        type="date"
                                        value={prod.receivedDate}
                                        name={"poItemRecvDate-" + index}
                                        onChange={(e)=>setPO({...po, 
                                            orderedProducts: po.orderedProducts.map((elm, idx)=>
                                                idx === index ? {...elm, 
                                                    receivedDate: e.target.value
                                                } : elm
                                        )})}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label className="manage-form" htmlFor={"poItemGoodTill-" + index}>Good Till:</label>
                                </div>
                                <div className="col-75">
                                    <input className="manage-form"
                                        type="date"
                                        value={prod.goodTill}
                                        name={"poItemGoodTill-" + index}
                                        onChange={(e)=>setPO({...po, 
                                            orderedProducts: po.orderedProducts.map((elm, idx)=>
                                                idx === index ? {...elm, 
                                                    goodTill: e.target.value
                                                } : elm
                                        )})}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default POForm;