import React, { useState, useRef } from 'react';
import '../../../../styles/management_form.css';

const initialItemState = {
    code: "",
    name: "",
    price: 0.0,
    cost: 0.0,
    category: "PLAQUE",
    qty: null,
    qtyThresh: null,
    maxAddon: null
};

function ItemForm({itemForm, setItemForm, performOp}) {
    const [item, setItem] = useState(itemForm.op === "edit" ? itemForm.item : initialItemState);
    const qty = useRef(null);
    const thresh = useRef(null);
    const maxAddon = useRef(null);

    //Checks if qty, qty threshold, max addon and desc are null before editing the item
    function checkNullFirst(e) {
        e.preventDefault();
    
        if(itemForm.op === "edit") {
            item.qty = qty.current.value != "" ? qty.current.value : null;
            item.qtyThresh = thresh.current.value != "" ? thresh.current.value : null;
            item.maxAddon = maxAddon.current.value != "" ? maxAddon.current.value : null;
        }
        performOp(itemForm.op, item);
        setItem({
            code: "",
            name: "",
            price: 0.0,
            cost: 0.0,
            category: "PLAQUE",
            qty: null,
            qtyThresh: null,
            maxAddon: null
        });
    }
    return(
        <div id="manage-form-wrapper">
            <h2 className="manage-form">{itemForm.op === "add" ? "Add" : "Edit"} an item</h2>
            <form id="manage-form" name="manage-form" onSubmit={(e)=>checkNullFirst(e)}>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="item-code">Item Code:</label>
                    </div>
                    <div className="col-75">
                        <input className={itemForm.op === "edit" ? "manage-form disabled" : "manage-form"} 
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
                        <label className="manage-form" htmlFor="item-name">Item Name:</label>
                    </div>
                    <div className="col-75">
                        <input className="manage-form" type="text" name="item-name" 
                            placeholder="Cherry 10x13 Plaque" 
                            onChange={(e)=>setItem({...item, name: e.target.value})}
                            value={item.name}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="item-price">Item Price:</label>
                    </div>
                    <div className="col-75">
                        <input className="manage-form" type="number" name="item-price" 
                            placeholder="Enter the item price" 
                            min="0.0" 
                            step="0.01"
                            onChange={(e)=>setItem({...item, price: e.target.value})}
                            value={item.price}
                            required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="item-cost">Item Cost:</label>
                    </div>
                    <div className="col-75">
                        <input className="manage-form" type="number" name="item-cost" 
                            placeholder="Enter the item cost" 
                            min="0.0" 
                            step="0.01"
                            onChange={(e)=>setItem({...item, cost: e.target.value})}
                            value={item.cost}
                            required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="item-qty">Item Qty:</label>
                    </div>
                    <div className="col-75">
                        <input className="manage-form" type="number" name="item-qty" 
                            placeholder="Enter the item qty." 
                            min="0" 
                            step="1"
                            ref={qty}
                            defaultValue={item.qty}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="item-rethresh">Reorder Threshold:</label>
                    </div>
                    <div className="col-75">
                        <input className="manage-form" type="number" name="item-rethresh" 
                            placeholder="Enter the item qty. threshold" 
                            min="0" 
                            step="1"
                            ref={thresh}
                            defaultValue={item.qtyThresh}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="item-max-addon">Max Amount of Addons:</label>
                    </div>
                    <div className="col-75">
                        <input className="manage-form" type="number" name="item-max-addon" 
                            placeholder="Enter the cumulative max amount of lines, plates, cutouts, etc." 
                            min="0" 
                            step="1"
                            ref={maxAddon}
                            defaultValue={item.maxAddon}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label className="manage-form" htmlFor="item-category">Item Category:</label>
                    </div>
                    <div className="col-75">
                        <label className="manage-form">
                            <input className="manage-form" type="radio" name="item-category" value="PLAQUE" 
                                defaultChecked={itemForm.op === "add" || item.category === "PLAQUE"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>Plaque
                        </label>
                        <label className="manage-form">
                            <input className="manage-form" type="radio" name="item-category" value="DRINKWARE" 
                                defaultChecked={item.category === "DRINKWARE"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>Drinkware
                        </label>
                        <label className="manage-form">
                            <input className="manage-form" type="radio" name="item-category" value="GIFT" 
                                defaultChecked={item.category === "GIFT"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>Gift
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25"></div>
                    <div className="col-75">
                        <button className="manage-form" type="button"
                            onClick={()=>setItemForm({item: null, op: "none", show: false})}>Cancel</button>
                        <button className="manage-form" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ItemForm;