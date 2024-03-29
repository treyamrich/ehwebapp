import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft, BsPersonCircle } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Cart, Chat, UserProfile, CustomerInfo, Alert } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = ({ themeColor, user, showUserProfile, setDisplay, handleEditCartItem, editItemIdx }) => {
  const { activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <div className="flex gap-3">
        {editItemIdx !== undefined && editItemIdx === -1 && (
          <NavButton title="Menu" customFunc={handleActiveMenu} color={themeColor} icon={<AiOutlineMenu />} />
        )}
        {editItemIdx !== undefined && editItemIdx !== -1 && (
          <div className="opacity-50 text-center">
              <Alert variant="success" size="small">Edit Mode</Alert>
          </div>
        )}
      </div>
      <div className="flex">
        <NavButton title="Cart" customFunc={() => handleClick('cart')} color={themeColor} icon={<FiShoppingCart />} />
        
        {showUserProfile && (<>
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={themeColor} icon={<BsChatLeft />} />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 pl-2 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick(`${showUserProfile ? 'userProfile' : 'customerInfo'}`)}
          >
            <BsPersonCircle color={themeColor} className="w-8 h-8"/>
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user.name.split(' ')[0]}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent></>)}
        {!showUserProfile && (<TooltipComponent content="Customer Info" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 pl-2 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick(`${showUserProfile ? 'userProfile' : 'customerInfo'}`)}
          >
            <BsPersonCircle color={themeColor} className="w-8 h-8"/>
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user.name.split(' ')[0]}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>)}
        {isClicked.cart && (<Cart handleEditCartItem={handleEditCartItem}/>)}
        {isClicked.chat && (<Chat />)}
        {isClicked.userProfile && (<UserProfile user={user}/>)}
        {isClicked.customerInfo && (<CustomerInfo setDisplay={setDisplay} themeColor={themeColor} user={user}/>)}
      </div>
    </div>
  );
};

export default Navbar;