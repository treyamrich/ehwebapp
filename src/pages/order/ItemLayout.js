import React from 'react'
import { MyCheckbox } from '../../components';

const ItemLayout = ({ cartItem, setCartItem }) => {
  return (
    <div className="flex justify-center text-left flex-col"
        style={{maxHeight: '85vh'}}
    >
      <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
          <div className="py-2 px-1">
              <h4 className="text-lg font-semibold mb-1">Upload a picture of the layout:</h4>
              <input className="border px-3 py-2 w-full rounded-sm" 
                id="nif"
                type="file" name="item-layout"
                onChange={e=>setCartItem({...cartItem, layoutImg: e.target.files[0]})}
            />
          </div>
          <div id="post-order-txt" className="mt-5 text-center">
            <label className="text-xs text-slate-400 mb-3 mr-1">I will send the layout via email</label>
            <MyCheckbox checked={cartItem.postLayout}
              customFunc={()=>setCartItem({...cartItem, postLayout: !cartItem.postLayout})}
            />
          </div>
      </div>
  </div>
  )
}

export default ItemLayout