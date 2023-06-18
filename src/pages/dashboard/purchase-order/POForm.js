import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../graphql/queries';
import { createItems } from '../../../graphql/mutations';
import { formatDate } from '../../../utility/DateTimeFunctions';
import '../../../styles/management_form.css';

const initialPOState = {
    vendorId: "",
    date: formatDate(new Date()),
    orderedProducts: [],
    isOpen: true
};

function POForm({poForm, setPOForm, opRes, setOpRes, performOp}) {
    const [po, setPO] = useState(poForm.op === "edit" ? poForm.po : initialPOState);
    //Ensure the component doesn't render until the inventory has been fetched
    const [isFetching, setIsFetching] = useState(true);
    //Fetch entire inventory to give recommendations for adding items
    //Map item code to index in the inventory array
    const [invMap, setInvMap] = useState(()=>new Map());

    function formatDateFields(setNull) {
        //Sets the date field to either empty string or null to match API request format,
        //or to render in the react component (non-null)
        for(let i = 0; i < po.orderedProducts.length; i++) {
            if(setNull) {
                if(po.orderedProducts[i].receivedDate === "") {
                    po.orderedProducts[i].receivedDate = null;
                }
                if(po.orderedProducts[i].goodTill === "") {
                    po.orderedProducts[i].goodTill = null;
                }
            } else {
                if(po.orderedProducts[i].receivedDate === null) {
                    po.orderedProducts[i].receivedDate = "";
                }
                if(po.orderedProducts[i].goodTill === null) {
                    po.orderedProducts[i].goodTill = "";
                }
            }
        }
    }
    //Postcondition: Returns true for success, false for failure
    async function createNewItem(item) {
        try {
            await API.graphql({ query: createItems, 
                variables: {input: item}, 
                authMode: "AMAZON_COGNITO_USER_POOLS"
            });
            return true;
        } catch(e) {
            console.log(e);
            setOpRes({...opRes, failureMsg: 
                "Error: Item " + item.itemCode + " could not be added to the inventory"});
            return false;
        }
    }
    async function preparePO(e) {
        e.preventDefault();
        let poItem, newItem;
        //Check if the item SKU is in the inventory, if not create a new one
        for(let i = 0; i < po.orderedProducts.length; i++) {
            poItem = po.orderedProducts[i];
            if(!invMap.has(poItem.itemCode)) {
                newItem = {
                    itemCode: poItem.itemCode,
                    name: poItem.itemName,
                    price: 0.0,
                    cost: poItem.unitCost,
                    category: poItem.category,
                    qty: 0
                }
                //Stop if error occurs
                if(!(await createNewItem(newItem)))
                    return;
            }
        }

        //Match AWS format by converting empty dates to null
        formatDateFields(true);
        performOp(poForm.op, po);
        setPO({vendorId: "", date:"", orderedProducts:[], isOpen: true});
    }
    async function fetchInventory() {
        //Inits a map to check if an item exists and array of all the items
        try {
            const inventoryData = await API.graphql({query: listItems, 
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
            const items = inventoryData.data.listItems.items;
            const InvMap = new Map();
            for(let i = 0; i < items.length; i++) {
                InvMap.set(items[i].itemCode, items[i]);
            }
            setInvMap(InvMap);
            setIsFetching(false);
        } catch(e) {
            console.log(e);
            setOpRes({...opRes, failureMsg:"Error: Could not fetch inventory"});
        }
    }
    useEffect(()=>{
        fetchInventory();
    }, []);

    //Before rendering, ensure there are no null date fields
    formatDateFields(false);
    return(!isFetching && (
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
                                numPurchased: 1,
                                unitCost: 0.0, 
                                totalCost: 0.0, 
                                receivedDate: "",
                                numReceived: 0,
                                goodTill: ""
                            }]})}>
                            Add an item
                        </button>
                    </div>
                    <div className="col-75">
                        <button className="manage-form" type="button" 
                            onClick={()=>setPOForm({...poForm, 
                                op: poForm.op === "edit" ? "view-po" : "view-all"})}>
                                Discard Changes
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
                                <button className="manage-form"
                                    type="button"
                                    onClick={()=>setPO({...po,
                                        orderedProducts: po.orderedProducts.filter((elm, idx)=>
                                            idx !== index)})}> Remove Item
                                </button>
                            </div>
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
                                    <label className="manage-form" htmlFor={"cat-"+index}>Item Category:</label>
                                </div>
                                <div className="col-75">
                                    <label className="manage-form">
                                        <input className="manage-form" type="radio" name={"cat-"+index} value="PLAQUE" 
                                            defaultChecked={
                                                invMap.has(prod.itemCode) && 
                                                invMap.get(prod.itemCode).category === "PLAQUE"
                                            } 
                                            required
                                            disabled={invMap.has(prod.itemCode)}
                                            onClick={(e)=>setPO({...po, 
                                                orderedProducts: po.orderedProducts.map((elm, idx)=>
                                                idx === index ? {...elm, 
                                                    category: e.target.value
                                                } : elm
                                            )})}/>Plaque
                                    </label>
                                    <label className="manage-form">
                                        <input className="manage-form" type="radio" name={"cat-"+index} value="DRINKWARE" 
                                            defaultChecked={
                                                invMap.has(prod.itemCode) && 
                                                invMap.get(prod.itemCode).category === "DRINKWARE"
                                            } 
                                            required
                                            disabled={invMap.has(prod.itemCode)}
                                            onClick={(e)=>setPO({...po, 
                                                orderedProducts: po.orderedProducts.map((elm, idx)=>
                                                idx === index ? {...elm, 
                                                    category: e.target.value
                                                } : elm
                                            )})}/>Drinkware
                                    </label>
                                    <label className="manage-form">
                                        <input className="manage-form" type="radio" name={"cat-"+index} value="GIFT" 
                                            defaultChecked={
                                                invMap.has(prod.itemCode) && 
                                                invMap.get(prod.itemCode).category === "GIFT"
                                            }
                                            required
                                            disabled={invMap.has(prod.itemCode)}
                                            onClick={(e)=>setPO({...po, 
                                                orderedProducts: po.orderedProducts.map((elm, idx)=>
                                                idx === index ? {...elm, 
                                                    category: e.target.value
                                                } : elm
                                            )})}/>Gift
                                    </label>
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
                                    <label className="manage-form" htmlFor={"poItemNumRecv-" + index}>Number of Items Received:</label>
                                </div>
                                <div className="col-75">
                                    <input className="manage-form"
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={prod.numReceived}
                                        name={"poItemNumRecv-" + index}
                                        onChange={(e)=>setPO({...po, 
                                            orderedProducts: po.orderedProducts.map((elm, idx)=>
                                                idx === index ? {...elm, 
                                                    numReceived: e.target.value
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
        </div>)
    )
}

export default POForm;