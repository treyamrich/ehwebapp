import React, { useState } from 'react';
import '../../../../styles/item_form.css';

const initialItemState = {
    code: "",
    name: "",
    price: 0.0,
    cost: 0.0,
    category: "PLAQUE",
    remainQty: undefined,
    qtyThresh: undefined,
    maxAddon: undefined,
    description: ""
};

function ItemForm({itemForm, setItemForm, performOp}) {
    
    const [item, setItem] = useState(itemForm.op === "edit" ? itemForm.item : initialItemState);

    return(
        <div id="item-form-wrapper">
            <h2 className="item-form">{itemForm.op === "add" ? "Add" : "Edit"} an item</h2>
            <form id="item-form" name="item-form">
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-code">Item Code:</label>
                    </div>
                    <div className="col-75">
                        <input className={itemForm.op === "edit" ? "item-form disabled" : "item-form"} 
                            type="text" name="item-code" 
                            placeholder="DCP11013" 
                            onChange={(e)=>setItem({...item, code: e.target.value})}
                            value={item.code}
                            required
                            disabled={itemForm.op === "edit"}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-name">Item Name:</label>
                    </div>
                    <div className="col-75">
                        <input className="item-form" type="text" name="item-name" 
                            placeholder="Cherry 10x13 Plaque" 
                            onChange={(e)=>setItem({...item, name: e.target.value})}
                            value={item.name}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-price">Item Price:</label>
                    </div>
                    <div className="col-75">
                        <input className="item-form" type="number" name="item-price" 
                            placeholder="Enter the item price" 
                            min="0.0" 
                            step="0.1"
                            onChange={(e)=>setItem({...item, price: e.target.value})}
                            value={item.price}
                            required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-cost">Item Cost:</label>
                    </div>
                    <div className="col-75">
                        <input className="item-form" type="number" name="item-cost" 
                            placeholder="Enter the item cost" 
                            min="0.0" 
                            step="0.1"
                            onChange={(e)=>setItem({...item, cost: e.target.value})}
                            value={item.cost}
                            required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-qty">Item Qty:</label>
                    </div>
                    <div className="col-75">
                        <input className="item-form" type="number" name="item-qty" 
                            placeholder="Enter the item qty." 
                            min="0" 
                            step="1"
                            onChange={(e)=>setItem({...item, remainQty: e.target.value})}
                            value={item.remainQty ? item.remainQty : undefined}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-rethresh">Reorder Threshold:</label>
                    </div>
                    <div className="col-75">
                        <input className="item-form" type="number" name="item-rethresh" 
                            placeholder="Enter the item qty. threshold" 
                            min="0" 
                            step="1"
                            onChange={(e)=>setItem({...item, qtyThresh: e.target.value})}
                            value={item.qtyThresh ? item.qtyThresh : undefined}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-max-addon">Max Amount of Addons:</label>
                    </div>
                    <div className="col-75">
                        <input className="item-form" type="number" name="item-max-addon" 
                            placeholder="Enter the cumulative max amount of lines, plates, cutouts, etc." 
                            min="0" 
                            step="1"
                            onChange={(e)=>setItem({...item, maxAddon: e.target.value})}
                            value={item.maxAddon ? item.maxAddon : undefined}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-desc">Description:</label>
                    </div>
                    <div className="col-75">
                        <input className="item-form" type="text" name="item-desc" 
                            placeholder="Write your optional notes here"
                            onChange={(e)=>setItem({...item, description: e.target.value})}
                            value={item.description ? item.description : ""}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="item-form" htmlFor="item-category">Item Category:</label>
                    </div>
                    <div className="col-75">
                        <label className="item-form">
                            <input className="item-form" type="radio" name="item-category" value="PLAQUE" 
                                defaultChecked={itemForm.op === "add" || item.category === "PLAQUE"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>Plaque
                        </label>
                        <label className="item-form">
                            <input className="item-form" type="radio" name="item-category" value="DRINKWARE" 
                                defaultChecked={item.category === "DRINKWARE"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>Drinkware
                        </label>
                        <label className="item-form">
                            <input className="item-form" type="radio" name="item-category" value="GIFT" 
                                defaultChecked={item.category === "GIFT"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>Gift
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25"></div>
                    <div className="col-75">
                        <button className="item-form" type="button"
                            onClick={()=>setItemForm({...itemForm, op: "none", show: false})}>Cancel</button>
                        <button className="item-form" type="button"
                            onClick={()=>performOp(itemForm.op, item)}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ItemForm;