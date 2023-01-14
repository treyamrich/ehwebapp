import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { useStateContext } from '../../contexts/ContextProvider';
import { Button } from '..';
import "./cart.css";

const InitOrderCost = {
  subtotal: 0,
  total: 0
};
const addonFields = ['graphics', 'cutouts', 'services'];

const Cart = ({ order, setOrder }) => {
  const { currentColor } = useStateContext();
  const [orderCost, setOrderCost] = useState(InitOrderCost);

  const {subtotal, total} = orderCost;
  const cart = order.cart;

  const getTxtFromEditorState = item => {
    let txt = "";
    let i = 0;
    const contentBlkArr = item.getCurrentContent().getBlocksAsArray();
    while(i < 2 && i < contentBlkArr.length) {
      txt += contentBlkArr[i++].getText() + '.';
    }

    const textJsx = contentBlkArr.map((blk, idx)=>{
      if(idx < 2) return <p key={idx}>{blk.getText()}<br/></p>
    });
    return txt.length > 0 ? textJsx : "No verbage";
  }
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
  const firstLetterUppercase = str => {
    return `${str.substring(0,1).toUpperCase()}${str.substring(1,str.length).toLowerCase()}`;
  }
  const toNameString = arr => {
    let str = "";
    for(let i = 0; i < arr.length; i++) {
      str += arr[i].name;
      if(i != arr.length - 1) str += ", ";
    }
    return str;
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
        <div className="overflow-auto scrollbar-hide" style={{height: "100%"}}>
        {cart.length === 0 && (
          <div className="text-center leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
            No Items
          </div>
        )}
        {cart.map((item, index) => (
          <div key={index}>
            <div>
              <div className="border-b-1 border-color dark:border-gray-600 p-4">
                <div className="flex items-center gap-5 leading-8">
                  <img className="rounded-lg h-80 w-24" src={item.image} alt="" />
                  <div>
                    <p className="font-semibold ">{item.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{firstLetterUppercase(item.category)}</p>
                    <div className="flex gap-4 mt-2 items-center">
                      <p className="font-semibold text-lg">{item.price}</p>
                      <div className="flex items-center border-1 border-r-0 border-color rounded">
                        <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 "><AiOutlineMinus /></p>
                        <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">{item.quantity}</p>
                        <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"><AiOutlinePlus /></p>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Item Details</h3>
                <ul>
                  <li className="text-xs">
                    <h4 className="font-semibold">Verbage</h4>
                    {getTxtFromEditorState(item.txtLines)}
                  </li>
                  {addonFields.map((field, key) =>
                    <li key={key} className="text-xs">
                      {item[field].length > 0 && (
                        <h4 className="font-semibold">{firstLetterUppercase(field)}</h4>
                      )}
                      {toNameString(item[field])}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
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