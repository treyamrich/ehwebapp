import React, { useState, useEffect } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import { Button } from '..';
import CartItem from './CartItem';
import "./cart.css";
import { addonFields, HAWAII_SALES_TAX, RUSH_FEES } from '../../data/uidata';
import { subtractDays } from '../../utility/DateTimeFunctions';

const InitOrderCost = {
  subtotal: 0,
  total: 0,
  numRushDays: 0
};

const Cart = ({ order, setOrder }) => {
  const { currentColor } = useStateContext();
  const [orderCost, setOrderCost] = useState(InitOrderCost);

  //Recursively calculates the total given a cart item
  const getTotalItemPrice = item => {
    let itemCost = item.price;

    //Current item cost
    addonFields.forEach(addonField => {
      //Skip subitems
      if(addonField === 'subItems') return;
      item[addonField].forEach(addon => itemCost += addon.price);
    });
    
    //Text lines DEAL WITH THIS LATER

    //Add cost of children items
    item.subItems.forEach(subItem => getTotalItemPrice(subItem) * subItem.quantity);
    return itemCost * item.quantity;
  }
  const round = num => Math.round((num + Number.EPSILON) * 100) / 100;
  const getTotal = () => {
    //Calculate subtotal
    let subtotal = 0; 
    order.cart.forEach(cartItem => subtotal += getTotalItemPrice(cartItem));
    //Apply rush fee if applicable
    subtotal += RUSH_FEES[orderCost.numRushDays];
    //Apply tax and additional fees
    let total = round(subtotal * (1 + HAWAII_SALES_TAX));
    return {...orderCost, subtotal: subtotal.toFixed(2), total: total.toFixed(2)};
  }
  //Returns the nearest integer amount of rush days
  const getNumRushDays = () => {
    let dateDiff = subtractDays(new Date(), new Date(order.dateNeeded));
    if(dateDiff >= 1) dateDiff -= 1; //Starts counting day after order is placed
    if(dateDiff <= 1) return 1; 
    if(dateDiff <= 3) return 3;
    return 0;
  }
  //Every time the order is updated, recalculate the cost
  useEffect(() => {
    //Must get # of rush days first since it's needed in cost calculation
    orderCost.numRushDays = getNumRushDays();
    setOrderCost(getTotal());
  }, [order]);
  const { numRushDays } = orderCost;
  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
      <div className="float-right h-screen duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 w-full p-8">
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
              getTotalItemPrice={getTotalItemPrice}
            />
          ))}
          </div>
          <div className="mt-3 mb-3">
            {orderCost.numRushDays > 0 && (
            <div>
              <p className="text-gray-500 dark:text-gray-200">Additional Charges</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-xs">Rush Fee - {numRushDays} day(s)</p>
                <p className="font-semibold text-xs">${RUSH_FEES[numRushDays].toFixed(2)}</p>
              </div>
            </div>
            )}
            <div className="flex justify-between items-center mt-3">
              <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
              <p className="font-semibold">${orderCost.subtotal}</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-gray-500 dark:text-gray-200">Total</p>
              <p className="font-semibold">${orderCost.total}</p>
            </div>
          </div>
          <div className="mt-5 mb-10">
            <Button
              color="white"
              bgColor={currentColor}
              text="Place Order"
              borderRadius="10px"
              width="full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;