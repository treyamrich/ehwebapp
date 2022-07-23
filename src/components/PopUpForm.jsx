import React from 'react'
import { Navigate } from 'react-router-dom';

const PopUpForm = ({closePopUp, submitForm, children}) => {
  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0 h-screen flex items-center justify-center">
        <div className="bg-white dark:[#484b52] relative flex flex-col drop-shadow-2xl">
          <div id="close-popup-wrapper">
            <button onClick={closePopUp}>Exit</button>
          </div>
          <div>
            {children}
          </div>
          <div id="submit-popup-form">
            <button onClick={()=>{closePopUp(); submitForm()}}>Save</button>
          </div>
        </div>
    </div>
  )
}

export default PopUpForm