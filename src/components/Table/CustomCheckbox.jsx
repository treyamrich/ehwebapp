import React from 'react'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';

const CustomCheckbox = ({checked}) => {
  return (
    <>
        <input type="checkbox" 
            name="checkbox-select-all" 
            className="checkbox w-0 h-0"
        />
        {checked ? 
          <ImCheckboxChecked 
            className="m-auto inline-block"
            size={20}
          /> :
          <ImCheckboxUnchecked 
            className="m-auto inline-block"
            size={20}
          />
        }
    </>
  )
}

export default CustomCheckbox