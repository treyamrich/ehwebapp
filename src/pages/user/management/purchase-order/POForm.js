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
                    <button type="button" 
                        onClick={()=>setPO({...po, orderedProducts: [...po.orderedProducts, {
                            itemCode: "", 
                            itemName: "", 
                            numPurchased: 0,
                            unitCost: 0.0, 
                            totalCost: 0.0, 
                            receivedDate: "",
                            goodTill: "" 
                        }]})}>
                        Add an item</button>
                    <div>
                        {po.orderedProducts.map((prod, index)=>(
                            <div key={index}>
                                <label htmlFor={"itemCode-"+index}>Item SKU:</label>
                                <input type="text"
                                    value={prod.itemCode}
                                    name={"itemCode-" + index}
                                    onChange={(e)=>setPO({...po, 
                                        orderedProducts: po.orderedProducts.map((elm, idx)=>
                                        idx === index ? {...elm, 
                                            itemCode: e.target.value
                                        } : elm
                                    )})}
                                />
                                <label htmlFor={"itemName-" + index}>Item Name:</label>
                                <input type="text"
                                    value={prod.itemName}
                                    name={"itemName-" + index}
                                    onChange={(e)=>setPO({...po, 
                                        orderedProducts: po.orderedProducts.map((elm, idx)=>
                                        idx === index ? {...elm, 
                                            itemName: e.target.value
                                        } : elm
                                    )})}
                                />
                                <label htmlFor={"poItemQty-" + index}>Qty:</label>
                                <input type="number"
                                    step="1"
                                    min="1"
                                    value={prod.numPurchased}
                                    name={"poItemQty-" + index}
                                    onChange={(e)=>setPO({...po, 
                                        orderedProducts: po.orderedProducts.map((elm, idx)=>
                                            idx === index ? {...elm, 
                                                numPurchased: e.target.value,
                                                totalCost: e.target.value * elm.unitCost
                                            } : elm
                                    )})}
                                />
                                <label htmlFor={"poItemUCost-" + index}>Unit Cost:</label>
                                <input type="number"
                                    step="0.01"
                                    min="0"
                                    value={prod.unitCost}
                                    name={"poItemUCost-" + index}
                                    onChange={(e)=>setPO({...po, 
                                        orderedProducts: po.orderedProducts.map((elm, idx)=>
                                            idx === index ? {...elm, 
                                                unitCost: e.target.value,
                                                totalCost: e.target.value * elm.numPurchased
                                            } : elm
                                    )})}
                                />
                                <label htmlFor={"poItemTotalCost-" + index}>Total Cost:</label>
                                <input type="text"
                                    value={prod.totalCost}
                                    name={"poItemTotalCost-" + index}
                                    readOnly
                                />
                                <label htmlFor={"poItemRecvDate-" + index}>Date Received:</label>
                                <input type="date"
                                    value={prod.receivedDate}
                                    name={"poItemRecvDate-" + index}
                                    onChange={(e)=>setPO({...po, 
                                        orderedProducts: po.orderedProducts.map((elm, idx)=>
                                            idx === index ? {...elm, 
                                                receivedDate: e.target.value
                                            } : elm
                                    )})}
                                />
                                <label htmlFor={"poItemGoodTill-" + index}>Good Till:</label>
                                <input type="date"
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
                        ))}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default POForm;