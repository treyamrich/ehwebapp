import React, { Children } from 'react'
import { MdOutlineCancel } from 'react-icons/md';
/*Interface invariant

PopUp Props
:closePopUp - a callback function that is called when the user closes the window
:title - a string for the header
*/
const PopUp = ({title, closePopUp, children}) => {
  //Signal to the child component that the popup is closing
  const handleClosePopup = () => {
    const childComps = Children.toArray(children);
    childComps.forEach(comp => {
      if(comp.onClosePopup) comp.onClosePopup();
    });
    closePopUp();
  }
  return (
    <div className="fixed bg-half-transparent w-screen top-0 right-0 h-screen"
      style={{zIndex: '10009'}}  
    >
      <div className="flex items-center justify-center h-full relative">
        <div className="py-5 md:px-2 bg-white dark:[#484b52] flex flex-col drop-shadow-2xl w-full lg:w-3/4 2xl:w-6/12 max-h-screen">
          <div className="flex justify-between items-center px-3 py-1 mb-2 ml-4">
            <p className="font-semibold text-2xl">{title}</p>
            <button
              type="button"
              onClick={handleClosePopup}
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