import React from 'react'

const ConfirmSelItem = ({ onSubmit, onCancel, themeColor}) => {
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
            <p className="text-lg">Are you sure you want to proceed without choosing an item?</p>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4 mt-3'>
            <button className="text-white mr-6 bg-black w-28 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px'}}
                type="button"
                onClick={onSubmit}
            >
                Continue
            </button>
            <button className="text-white w-28 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: themeColor}}
                type="button"
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    </div>
  )
}

export default ConfirmSelItem