import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { animatedComponents, itemCategoryOptions } from '../../../data/uidata';
import './itemform.css'; 

const DEFAULT_CATEGORY = "PLAQUE";
const initialItemState = {
  itemCode: "",
  name: "",
  price: 0.0,
  cost: 0.0,
  category: DEFAULT_CATEGORY,
  qty: null
};

const ItemForm = ({btnBgColor, mode, dbOperation, submitForm, editObj}) => {
    const [item, setItem] = useState(mode === 'edit' ? editObj : initialItemState)
    
    const qty = useRef(null);
    const thresh = useRef(null);
    const maxAddon = useRef(null);

    //Checks if qty, qty threshold, max addon and desc are null before editing the item
    function checkNullFirst(e) {
      e.preventDefault();
  
        //Remove any empty strings and set to null
        item.qty = qty.current.value !== "" ? qty.current.value : null;
      
      //API call to add/edit item in database
      dbOperation(mode, item);
      
      //Call the submit form to close the component and add to the table
      submitForm(item);
      setItem({
          itemCode: "",
          name: "",
          price: 0.0,
          cost: 0.0,
          category: DEFAULT_CATEGORY,
          qty: null
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
                    onChange={(e)=>setItem({...item, itemCode: e.target.value})}
                    value={item.itemCode}
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
                <label className="text-lg font-semibold" htmlFor="item-category">Item Category:</label>
                <Select
                    className="w-full"
                    isSearchable={false}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={itemCategoryOptions}
                    onChange={e => setItem({...item, category: e.label})}
                    defaultValue={ mode === 'edit' ? [{value: -1, label: editObj.category }] : itemCategoryOptions[0]}
                />
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