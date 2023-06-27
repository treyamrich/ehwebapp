import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { animatedComponents, itemCategoryOptions } from '../../../data/uidata';

const initialVendorState = {
  vendorCode: "",
  vendorName: "",
  contactInfo: {
    name: "",
    phone: "",
    faxPhone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  },
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
        contactInfo: {},
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
                <label className="text-lg font-semibold" htmlFor="vendorName">Vendor Name:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="vendorName" 
                    placeholder="Cherry 10x13 Plaque" 
                    onChange={(e)=>setVendorData({...vendor, vendorName: e.target.value})}
                    value={vendor.vendorName}
                    required
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="shTerms">Shipping Terms:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="shTerms" 
                    placeholder="Cherry 10x13 Plaque" 
                    onChange={(e)=>setVendorData({...vendor, shTerms: e.target.value})}
                    value={vendor.shTerms}
                    required
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="salesTaxTerms">Sales Tax Terms:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="salesTaxTerms" 
                    placeholder="Cherry 10x13 Plaque" 
                    onChange={(e)=>setVendorData({...vendor, salesTaxTerms: e.target.value})}
                    value={vendor.salesTaxTerms}
                    required
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="notes">Ntoes:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="notes" 
                    placeholder="Cherry 10x13 Plaque" 
                    onChange={(e)=>setVendorData({...vendor, notes: e.target.value})}
                    value={vendor.notes}
                    required    
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="contactName">Contact Name:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="contactName" 
                    placeholder="Contact Name"
                    onChange={(e)=>setVendorData({...vendor, contactInfo: { ...vendor.contactInfo, name: e.target.value }})}
                    value={vendor.contactInfo.name}  
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="phone">Phone:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="phone" 
                    placeholder="Phone"
                    onChange={(e)=>setVendorData({...vendor, contactInfo: { ...vendor.contactInfo, phone: e.target.value }})}
                    value={vendor.contactInfo.phone}  
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="faxPhone">Fax Phone:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="text" name="faxPhone" 
                    placeholder="Fax Phone"
                    onChange={(e)=>setVendorData({...vendor, contactInfo: { ...vendor.contactInfo, faxPhone: e.target.value }})}
                    value={vendor.contactInfo.faxPhone}  
                />
            </div>
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="email">Email:</label>
                <input className="border px-3 py-2 w-full rounded-sm" type="email" name="email" 
                    placeholder="Email"
                    onChange={(e)=>setVendorData({...vendor, contactInfo: { ...vendor.contactInfo, email: e.target.value }})}
                    value={vendor.contactInfo.email}  
                />
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