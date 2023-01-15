import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import { Button } from '..';
import CartItem from './CartItem';
import "./cart.css";
import { addonFields } from '../../data/uidata';

const InitOrderCost = {
  subtotal: 0,
  total: 0
};

const Cart = ({ order, setOrder }) => {
  const { currentColor } = useStateContext();
  const [orderCost, setOrderCost] = useState(InitOrderCost);

  const {subtotal, total} = orderCost;
  const cart = order.cart;

  const getTotalItemPrice = item => {
    let itemCost = item.price;
    addonFields.forEach(addonField => {
      if(addonField === 'subItems') return;
      item[addonField].forEach(addon => itemCost += addon.price);
    });
    return itemCost;
  }
  const getSubTotal = items => {
    let total = 0;
    let itemPrice = 0;
    for(let i = 0; i < items.length; i++) {
      itemPrice = getTotalItemPrice(items[i]);
      //Only recurse when there's a child item
      if(items[i].subItems.length > 0)
        itemPrice += getSubTotal(items[i].subItems);
      total += itemPrice * items[i].quantity;
    }
  }
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
          {cart.length === 0 && (
            <div className="text-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
              No Items
            </div>
          )}
          {cart.map((item, index) => (
            <CartItem key={index}
              item={item}
              order={order}
              setOrder={setOrder}
            />
          ))}
          </div>
          <div className="mt-3 mb-3">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
              <p className="font-semibold">${subtotal}</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-gray-500 dark:text-gray-200">Total</p>
              <p className="font-semibold">${total}</p>
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