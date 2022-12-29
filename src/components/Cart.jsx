import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '.';

const InitOrderCost = {
  subtotal: 0,
  total: 0
};

const Cart = ({ order, setOrder }) => {
  const { currentColor } = useStateContext();
  const [orderCost, setOrderCost] = useState(InitOrderCost);

  const {subtotal, total} = orderCost;
  const cart = order.cart;
  const addonFields = ['graphics', 'cutouts', 'services'];

  const getTotalItemPrice = item => {
    let itemCost = item.price;
    addonFields.forEach(addonField => {
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
  const formatItemCategory = category => {
    return `${category.substring(0,1)}${category.substring(1,category.length).toLowerCase()}`;
  }
  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
      <div className="float-right h-screen  duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
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
        {cart.length === 0 && (
          <div className="text-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
            No Items
          </div>
        )}
        {cart.map((item, index) => (
          <div key={index}>
            <div>
              <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                <img className="rounded-lg h-80 w-24" src={item.image} alt="" />
                <div>
                  <p className="font-semibold ">{item.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{formatItemCategory(item.category)}</p>
                  <div className="flex gap-4 mt-2 items-center">
                    <p className="font-semibold text-lg">{item.price}</p>
                    <div className="flex items-center border-1 border-r-0 border-color rounded">
                      <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 "><AiOutlineMinus /></p>
                      <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">0</p>
                      <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"><AiOutlinePlus /></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
        <div className="mt-5">
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
  );
};

export default Cart;