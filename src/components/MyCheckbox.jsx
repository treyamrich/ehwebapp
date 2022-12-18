import React from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

const checkBoxClass = "m-auto inline-block cursor-pointer";
const CHECKBOX_SIZE = 25;

const MyCheckbox = ({checked, customFunc, color}) => {
  return (
    <>
        {checked ? 
          <MdCheckBox
            className={checkBoxClass}
            size={CHECKBOX_SIZE}
            style={{color: color}}
            onClick={customFunc}
          /> :
          <MdCheckBoxOutlineBlank 
            className={checkBoxClass}
            size={CHECKBOX_SIZE}
            onClick={customFunc}
          />
        }
    </>
  )
}

export default MyCheckbox