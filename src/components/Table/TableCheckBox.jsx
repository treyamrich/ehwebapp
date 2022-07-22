import React from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';

const checkBoxClass = "m-auto inline-block cursor-pointer";
const CHECKBOX_SIZE = 25;

const TableCheckBox = ({checked, customFunc}) => {
  const { currentColor } = useStateContext();
  return (
    <>
        {checked ? 
          <MdCheckBox
            className={checkBoxClass}
            size={CHECKBOX_SIZE}
            style={{color: currentColor}}
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

export default TableCheckBox