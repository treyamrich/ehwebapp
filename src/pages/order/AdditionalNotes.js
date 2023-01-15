import React from 'react'
import { MyInput } from '../../components'
import { EH_COLOR_DARK } from '../../data/uidata'

const AdditionalNotes = ({ cartItem, setCartItem, onSubmit }) => {
    const handleSubmit = () => {
        onSubmit();
    }
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
            <div className="py-2 px-1">
                <div className="mb-2 text-center">
                    <h4 className="text-lg font-semibold mb-1">Write your notes here...</h4>
                    <MyInput
                        type="text"
                        color={EH_COLOR_DARK}
                        value={cartItem.notes}
                        onChange={e=>setCartItem({...cartItem, notes: e.target.value})}
                    />
                </div>
                <div className="text-center">
                    <p className="text-sm text-slate-400">e.g Please mount the coin at the top right with the plane side up.</p>
                </div>
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 lg:ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: EH_COLOR_DARK}}
                type="button"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default AdditionalNotes