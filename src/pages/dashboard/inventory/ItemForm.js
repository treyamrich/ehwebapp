import React, { useState, useRef } from 'react';

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

const ItemForm = ({btnBgColor, mode, submitForm, editObj}) => {
    const [item, setItem] = useState(mode === 'edit' ? editObj : initialItemState)
    
    const qty = useRef(null);
    const thresh = useRef(null);
    const maxAddon = useRef(null);

    //Checks if qty, qty threshold, max addon and desc are null before editing the item
    function checkNullFirst(e) {
      e.preventDefault();
  
      if(mode === "edit") {
          item.qty = qty.current.value != "" ? qty.current.value : null;
          item.qtyThresh = thresh.current.value != "" ? thresh.current.value : null;
          item.maxAddon = maxAddon.current.value != "" ? maxAddon.current.value : null;
      }
      
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
      <div className="w-11/12 bg-slate-50 rounded-md drop-shadow-xl p-3 m-auto overflow-y-auto">
        <div className="row">
          <div className="col-25">
              <label className="manage-form" htmlFor="item-code">Item Code:</label>
          </div>
          <div className="col-75">
              <input className={mode === "edit" ? "manage-form disabled" : "manage-form"} 
                  type="text" name="item-code" 
                  placeholder="DCP11013" 
                  onChange={(e)=>setItem({...item, code: e.target.value})}
                  value={item.code}
                  required
                  disabled={mode === "edit"}/>
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
                      defaultChecked={mode === "add" || item.category === "PLAQUE"} 
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

/*{colComponents.map((colHeader, idx)=>(
        <div key={`in-${idx}`} className="p-3">
          <label htmlFor={`in-${idx}`}
              className="text-lg font-semibold"
            >
              {colHeader}
            </label>
          <input name={`in-${idx}`}
            className="border px-3 py-2 w-full"
            placeholder={colHeader}
          />
        </div>
      ))}*/