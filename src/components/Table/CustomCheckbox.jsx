import React from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';

const CustomCheckbox = ({checked}) => {
  const { currentColor } = useStateContext();
  return (
    <>
        <input type="checkbox" 
            name="checkbox-select-all" 
            className="checkbox w-0 h-0"
        />
        {checked ? 
          <MdCheckBox
            className="m-auto inline-block cursor-pointer"
            size={20}
            style={{color: currentColor}}
          /> :
          <MdCheckBoxOutlineBlank 
            className="m-auto inline-block cursor-pointer"
            size={20}
          />
        }
    </>
  )
}

export default CustomCheckbox