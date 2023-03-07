import React, { useState, useRef } from 'react';
import './itemform.css'; 

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

const ItemForm = ({btnBgColor, mode, dbOperation, submitForm, editObj}) => {
    const [item, setItem] = useState(mode === 'edit' ? editObj : initialItemState)
    
    const qty = useRef(null);
    const thresh = useRef(null);
    const maxAddon = useRef(null);

    //Checks if qty, qty threshold, max addon and desc are null before editing the item
    function checkNullFirst(e) {
      e.preventDefault();
  
      if(mode === 'edit') {
        //Remove any empty strings and set to null
          item.qty = qty.current.value !== "" ? qty.current.value : null;
          item.qtyThresh = thresh.current.value !== "" ? thresh.current.value : null;
          item.maxAddon = maxAddon.current.value !== "" ? maxAddon.current.value : null;
      }
        
      //API call to add/edit item in database
      dbOperation(mode, item);
      
      //Call the submit form to close the component and add to the table
      submitForm(item);
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
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
      <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5  m-auto overflow-y-auto">
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="item-code">Item Code:</label>
                <input className={`border px-3 py-2 w-full rounded-sm ${mode === "edit" ? "disabled" : ''}`} 
                    type="text" name="item-code" 
                    placeholder="DCP11013" 
                    onChange={(e)=>setItem({...item, code: e.target.value})}
                    value={item.code}
                    required
                    disabled={mode === "edit"}/>
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="item-name">Item Name:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="item-name" 
                    placeholder="Cherry 10x13 Plaque" 
                    onChange={(e)=>setItem({...item, name: e.target.value})}
                    value={item.name}
                    required
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="item-price">Item Price:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="number" name="item-price" 
                    placeholder="Enter the item price" 
                    min="0.0" 
                    step="0.01"
                    onChange={(e)=>setItem({...item, price: e.target.value})}
                    value={item.price}
                    required/>
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="item-cost">Item Cost:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="number" name="item-cost" 
                    placeholder="Enter the item cost" 
                    min="0.0" 
                    step="0.01"
                    onChange={(e)=>setItem({...item, cost: e.target.value})}
                    value={item.cost}
                    required/>
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="item-qty">Item Qty:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="number" name="item-qty" 
                    placeholder="Enter the item qty." 
                    min="0" 
                    step="1"
                    ref={qty}
                    defaultValue={item.qty}/>
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="item-rethresh">Reorder Threshold:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="number" name="item-rethresh" 
                    placeholder="Enter the item qty. threshold" 
                    min="0" 
                    step="1"
                    ref={thresh}
                    defaultValue={item.qtyThresh}/>
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="item-max-addon">Max Amount of Addons:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="number" name="item-max-addon" 
                    placeholder="Enter the cumulative max amount of lines, plates, cutouts, etc." 
                    min="0" 
                    step="1"
                    ref={maxAddon}
                    defaultValue={item.maxAddon}/>
            </div>
            <div className="p-3">
                <div className="flex text-center">
                    <label className="text-lg font-semibold" htmlFor="item-category">Item Category:</label>
                    <div className="flex justify-evenly w-4/5 items-center">
                        <label className="text-lg font-semibold radio-container hover:drop-shadow-xl">
                            Plaque
                            <input className="border px-3 py-2 w-full rounded-sm" 
                                style={{background: 'red', outline: 'none'}}
                                type="radio" name="item-category" value="PLAQUE" 
                                defaultChecked={mode === "add" || item.category === "PLAQUE"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>
                                <div className="radio-outer flex items-center justify-center">
                                    <span className="radio-inner"/>
                                </div>
                        </label>
                        <label className="text-lg font-semibold radio-container hover:drop-shadow-xl">
                            Drinkware
                            <input className="border px-3 py-2 w-full rounded-sm" type="radio" name="item-category" value="DRINKWARE" 
                                defaultChecked={item.category === "DRINKWARE"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>
                               <div className="radio-outer flex items-center justify-center">
                                    <span className="radio-inner"/>
                                </div>
                        </label>
                        <label className="text-lg font-semibold radio-container hover:drop-shadow-xl">
                            Gift
                            <input className="border px-3 py-2 w-full rounded-sm" type="radio" name="item-category" value="GIFT" 
                                defaultChecked={item.category === "GIFT"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>
                               <div className="radio-outer flex items-center justify-center">
                                    <span className="radio-inner"/>
                                </div>
                        </label>
                        <label className="text-lg font-semibold radio-container hover:drop-shadow-xl">
                            Service
                            <input className="border px-3 py-2 w-full rounded-sm" type="radio" name="item-category" value="SERVICE" 
                                defaultChecked={item.category === "SERVICE"} 
                                onClick={(e)=>setItem({...item, category: e.target.value})}
                                required/>
                               <div className="radio-outer flex items-center justify-center">
                                    <span className="radio-inner"/>
                                </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: btnBgColor}}
                onClick={checkNullFirst}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default ItemForm