import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import { Button } from '..';
import CartItem from './CartItem';
import OrderSummary from '../../pages/order/popups/OrderSummary';
import "../../styles/hidescrollbar.css";
import { addonFields } from '../../data/uidata';

const Cart = ({ handleEditCartItem }) => {
  const { currentColor, pushPopUp, order, setOrder } = useStateContext();

  //Recursively calculates the total given a cart item
  const getItemPrice = item => {
    let itemCost = item.itemPrice ? item.itemPrice : 0;

    //Current item cost
    addonFields.forEach(addonField => {
      //Skip subitems
      if(addonField === 'subItems' || item[addonField] == undefined) return;
      item[addonField].forEach(addon => itemCost += addon.itemPrice ? addon.itemPrice : 0);
    });

    //Text lines DEAL WITH THIS LATER

    //Add the price of children plates
    if(item.subItems)
      item.subItems.forEach(subItem => itemCost += getItemPrice(subItem));

    return itemCost * item.quantity;
  }
  
  //The OrderSummary component will pass a function back to copy state values
  const showOrderSummary = () => {
    pushPopUp(<OrderSummary
      getItemPrice={getItemPrice}
      title="Order Summary"
    />)
  }
  
  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
      <div className="float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 w-full p-6">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Cart</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        <div className="overflow-auto overflow-x-hidden scrollbar-hide py-1" style={{height: "100%"}}>
          <div>
          {order.cart.length === 0 && (
            <div className="text-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
              No Items
            </div>
          )}
          {order.cart.map((item, index) => (
            <CartItem key={index}
              item={item}
              order={order}
              setOrder={setOrder}
              getItemPrice={getItemPrice}
              editCartItem={()=>{
                handleEditCartItem(item, index);
              }}
            />
          ))}
          </div>
          <div className="mt-5 mb-10">
            <Button
              color="white"
              bgColor={currentColor}
              text="Checkout"
              borderRadius="10px"
              width="full"
              customFunc={showOrderSummary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;