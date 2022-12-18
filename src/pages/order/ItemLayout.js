import React from 'react'
import { MyInput } from '../../components'

const ItemLayout = ({ themeColor, finalizeInfo, setFinalizeInfo, handleSubmit }) => {
  return (
    <div className="flex justify-center text-left flex-col"
        style={{maxHeight: '85vh'}}
    >
      <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
          <div className="py-2 px-1">
              <h4 className="text-lg font-semibold mb-1">Upload a picture of the layout:</h4>
              <MyInput
                type="check"
                color={themeColor}
                value={finalizeInfo.postTxt}
              />
              <div className="text-center">
                  <p className="text-sm text-slate-400"><strong>Tip:</strong> Dimensions are listed in format: <strong>Width x Height</strong> (W x H) and in the <strong>units of inches.</strong> The default color is black/gold because it usually goes with all plaque colors, although <strong>we recommend you choose the color that matches your other addons.</strong></p>
              </div>
          </div>
      </div>
      <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
          <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
              style={{borderRadius: '10px', backgroundColor: themeColor}}
              type="button"
              onClick={handleSubmit}
          >
              Save
          </button>
      </div>
  </div>
  )
}

export default ItemLayout