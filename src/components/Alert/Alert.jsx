import React from 'react'
import './alert.css';
import { AiOutlineClose } from 'react-icons/ai';

const Alert = ({children, variant, dismissible, onClose}) => {
  return (
    <div role="alert" aria-label="Close alert" className={`${variant} alert ${dismissible ? 'alert-dismissible' : ''}`}>
      
        {dismissible ? <button className="px-4 py-5 absolute top-0 right-0 box-border"
          onClick={()=>onClose()}
        >
          <AiOutlineClose className="text-2xl" />
        </button> : null}
        {children}lkdfsljasdoifghasdfi
    </div>
  )
}

export default Alert