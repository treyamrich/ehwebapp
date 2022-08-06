import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';

const CustomerInfo = ({user, themeColor, setDisplay}) => {

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Customer Info</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user.name} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.email}</p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.phone}</p>
        </div>
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={themeColor}
          text="Change Contact Info"
          borderRadius="10px"
          width="full"
          customFunc={()=>setDisplay('start')}
        />
      </div>
    </div>

  );
};

export default CustomerInfo;