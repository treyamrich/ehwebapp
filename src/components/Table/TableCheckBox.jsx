import React from 'react'
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';

const TableCheckBox = ({checked, customFunc}) => {
  const { currentColor } = useStateContext();
  return (
    <>
        {checked ? 
          <MdCheckBox
            className="m-auto inline-block cursor-pointer"
            size={20}
            style={{color: currentColor}}
            onClick={customFunc}
          /> :
          <MdCheckBoxOutlineBlank 
            className="m-auto inline-block cursor-pointer"
            size={20}
            onClick={customFunc}
          />
        }
    </>
  )
}

export default TableCheckBox