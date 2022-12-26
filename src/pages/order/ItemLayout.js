import React from 'react'
import { MyInput } from '../../components'

const ItemLayout = ({ themeColor, handleSubmit }) => {
  return (
    <div className="flex justify-center text-left flex-col"
        style={{maxHeight: '85vh'}}
    >
      <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
          <div className="py-2 px-1">
              <h4 className="text-lg font-semibold mb-1">Upload a picture of the layout:</h4>
              <MyInput
                type="file"
                color={themeColor}
              />
          </div>
      </div>
  </div>
  )
}

export default ItemLayout