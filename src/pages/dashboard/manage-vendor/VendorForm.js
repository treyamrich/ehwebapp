import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { animatedComponents, itemCategoryOptions } from '../../../data/uidata';

const DEFAULT_CATEGORY = "PLAQUE";
const initialVendorState = {
  vendorCode: "",
  vendorName: "",
  shTerms: "",
  salesTaxTerms: "",
  notes: "",
};

const VendorForm = ({btnBgColor, mode, dbOperation, submitForm, editObj}) => {
    const [vendor, setVendorData] = useState(mode === 'edit' ? editObj : initialVendorState)
    
    const qty = useRef(null);
    const thresh = useRef(null);
    const maxAddon = useRef(null);

    //Checks if qty, qty threshold, max addon and desc are null before editing the item
    function checkNullFirst(e) {
      e.preventDefault();
  
        // //Remove any empty strings and set to null
        // item.qty = qty.current.value !== "" ? qty.current.value : null;
      
      //API call to add/edit item in database
      dbOperation(mode, vendor);
      
      //Call the submit form to close the component and add to the table
      submitForm(vendor);
      setVendorData({
        vendorCode: "",
        vendorName: "",
        shTerms: "",
        salesTaxTerms: "",
        notes: "",
      });
  }

  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
      <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5  m-auto overflow-y-auto">
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="vendor-code">Vendor Code:</label>
                <input className={`border px-3 py-2 w-full rounded-sm ${mode === "edit" ? "disabled" : ''}`} 
                    type="text" name="vendor-code" 
                    placeholder="DCP11013" 
                    onChange={(e)=>setVendorData({...vendor, vendorCode: e.target.value})}
                    value={vendor.vendorCode}
                    required
                    disabled={mode === "edit"}/>
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="vendor-name">Vendor Name:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="vendor-name" 
                    placeholder="Cherry 10x13 Plaque" 
                    onChange={(e)=>setVendorData({...vendor, name: e.target.value})}
                    value={vendor.vendorName}
                    required
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="vendor-price">Vendor Price:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="number" name="itvendorem-price" 
                    placeholder="Enter the vendor price" 
                    min="0.0" 
                    step="0.01"
                    onChange={(e)=>setVendorData({...vendor, price: e.target.value})}
                    value={vendor.shTerms}
                    required/>
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="vendor-cost">Vendor Cost:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="number" name="vendor-cost" 
                    placeholder="Enter the vendor cost" 
                    min="0.0" 
                    step="0.01"
                    onChange={(e)=>setVendorData({...vendor, cost: e.target.value})}
                    value={vemdpr.salesTaxTerms}
                    required/>
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="vendor-qty">Vendor Qty:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="number" name="vendor-qty" 
                    placeholder="Enter the vendor qty." 
                    min="0" 
                    step="1"
                    ref={qty}
                    defaultValue={vendor.notes}/>
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end vendor-center p-4 ml-4'>
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

export default VendorForm