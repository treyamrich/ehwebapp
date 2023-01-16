import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { Alert } from '../../components';
import Select from 'react-select';
import { RUSH_FEES, EH_COLOR_DARK, locations, animatedComponents } from '../../data/uidata';

import { formatDate } from '../../utility/DateTimeFunctions';

const OrderSummary = ({ order, setOrder, orderCost }) => {
    const { subtotal, total, numRushDays } = orderCost;
    const { name, phone, email } = order.contactInfo;

    //Returns true if a string in arr is empty
    const hasEmptyStr = arr => {
        let hadEmpty = false;
        arr.forEach(str =>{if(str === "") hadEmpty = true});
        return hadEmpty;
    }
    
    //Check that the order is valid
    const strFields = [order.location, name, phone, email];
    const canSubmit = order.cart.length > 0 && !hasEmptyStr(strFields);

    //Form state
    const [error, setError] = useState(!canSubmit);
    const [isEditing, setIsEditing] = useState(false);
    const today = useRef(formatDate(new Date()));

    //Adds the order to the database and resets the entire app by refreshing
    const submitOrder = () => {
        console.log("ORDER SUBMITTED");
    }
    
    //Get today's date 
    useEffect(()=>{
        setOrder({...order, dateNeeded: today.current});
    }, []);
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        {error && (
            <div className='w-11/12 m-auto mb-3'>
                <Alert variant="danger" dismissible onClose={()=>setError(false)}>
                    {hasEmptyStr([name, phone, email]) ? "Contact info is incomplete. " : "" }
                    {order.location === "" ? "Pickup location is not specified." : ""}
                </Alert>
            </div>
        )}
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
            <button className="fixed top-3 right-3 rounded-md text-xl p-3 hover:bg-light-gray"
                onClick={()=>setIsEditing(prev=>!prev)}
            >
                <AiOutlineEdit size={25} color={EH_COLOR_DARK}/>
            </button>
            <div className="flex flex-col md:flex-row md:gap-28">
                <div className="mb-3 mr-3">
                    <p className="text-gray-500 dark:text-gray-200 mb-1">Contact Info</p>
                    <ul className="text-xs">
                        {isEditing ? (
                            <li className="mb-1"><label className="mr-1">Name:</label><input/></li>
                        ) : <li className="mb-1">Name: {name}</li>}
                        
                        <li className="mb-1">Phone: {phone}</li>
                        <li>Email: {email}</li>
                    </ul>
                </div>
                <div className='mb-3'>
                    <p className="text-gray-500 dark:text-gray-200 mb-1">Pickup Location</p>
                    {isEditing ? (
                        <Select
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            options={locations}
                            defaultValue={order.location !== "" ? [{label: order.location, value: -1}] : []}
                            onChange={option=>setOrder({...order, location: option.label})}
                            className="mb-3"
                    />
                    ) : <p>{order.location}</p>}
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-200 mb-1">Date Needed</p>
                    {isEditing ? (
                        <input type="date" name="date-needed"
                            className="border px-3 py-2 w-full rounded-sm mb-4"
                            onChange={e=>setOrder({...order, dateNeeded: e.target.value})}
                            value={order.dateNeeded}
                            min={today.current}
                        />
                    ) : <p>{order.dateNeeded}</p>}
                </div>
            </div>
            <div className="mt-3">
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
                    <p className="font-semibold">${subtotal}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                    <p className="text-gray-500 dark:text-gray-200">Total</p>
                    <p className="font-semibold">${total}</p>
                </div>
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: EH_COLOR_DARK, opacity: canSubmit ? 1 : 0.3}}
                type="button"
                onClick={submitOrder}
                disabled={!canSubmit}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default OrderSummary