import React from 'react'
import { MdOutlineCancel } from 'react-icons/md';

/*Interface invariant

PopUp Props
:closePopUp - a callback function that is called when the user closes the window
:title - a string for the header
:isNested - a boolean that indicates if the popup is inside of another popup.
  This is crucial for the popup to go over its parent.
*/
const PopUp = ({title, closePopUp, children, isNested}) => {
  return (
    <div className={`${isNested ? 'sticky' : 'fixed'} bg-half-transparent w-screen top-0 right-0 h-screen`}
    style={{zIndex: '10009'}}  
    >
      <div className="flex items-center justify-center h-full">
        <div className="py-4 px-2 bg-white dark:[#484b52] flex flex-col drop-shadow-2xl w-full lg:w-3/4 2xl:w-6/12 max-h-screen">
          <div className="flex justify-between items-center p-4 ml-4">
            <p className="font-semibold text-2xl">{title}</p>
            <button
              type="button"
              onClick={() => closePopUp()}
              style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopUp