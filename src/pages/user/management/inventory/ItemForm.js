import React, { useState, useRef } from 'react';
import '../../../../styles/item_form.css';

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

function ItemForm({itemForm, performOp, resetItemForm}) {
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
        <div id="item-form-wrapper">
            <h2 className="item-form">{itemForm.op === "add" ? "Add" : "Edit"} an item</h2>
            <form id="item-form" name="item-form" onSubmit={(e)=>checkNullFirst(e)}>
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
                            ref={qty}
                            defaultValue={item.qty}/>
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
                            ref={thresh}
                            defaultValue={item.qtyThresh}/>
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
                            ref={maxAddon}
                            defaultValue={item.maxAddon}/>
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
                            onClick={resetItemForm}>Cancel</button>
                        <button className="item-form" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ItemForm;