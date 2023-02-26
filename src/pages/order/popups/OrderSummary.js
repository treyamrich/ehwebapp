import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';
import { Alert, MyInput } from '../../../components';
import { LocationSelector } from '../order-components';
import FinalizeOrder from './FinalizeOrder';
import { RUSH_FEES, EH_COLOR_DARK, HAWAII_SALES_TAX, locationOpts } from '../../../data/uidata';
import { formatDate, subtractDays } from '../../../utility/DateTimeFunctions';
import { useStateContext } from '../../../contexts/ContextProvider';
import "../../../styles/hidescrollbar.css";

const InitOrderCost = {
    subtotal: 0,
    total: 0,
    numRushDays: 0
};
  
const OrderSummary = ({ getItemPrice }) => {
    //Form state
    const [isEditing, setIsEditing] = useState(false);
    const [orderCost, setOrderCost] = useState(InitOrderCost);
    const { order, setOrder, pushPopUp, popPopUp } = useStateContext();
    const today = useRef(formatDate(new Date()));

    const round = num => Math.round((num + Number.EPSILON) * 100) / 100;

    //Returns the nearest integer amount of rush days
    const getNumRushDays = () => {
        let dateDiff = subtractDays(new Date(), new Date(order.dateNeeded));
        if(dateDiff >= 1) dateDiff -= 1; //Starts counting day after order is placed
        if(dateDiff <= 1) return 1; 
        if(dateDiff <= 3) return 3;
        return 0;
    }
    const updateRushStatus = numDays => {
        let status = "";
        switch(numDays) {
            case 1: {
                status = "ONE_DAY";
                break;
            }
            case 3: {
                status = "TWO_TO_THREE_DAYS";
                break
            }
            default: {
                status = "NONE";
            }
        }
        setOrder({...order, rushStatus: status});
    }
    const getOrderTotal = () => {
        //Update rush status
        orderCost.numRushDays = getNumRushDays();
        updateRushStatus(orderCost.numRushDays);
        //Calculate subtotal
        let subtotal = 0; 
        order.cart.forEach(cartItem => subtotal += getItemPrice(cartItem));
        //Apply rush fee if applicable
        subtotal += RUSH_FEES[orderCost.numRushDays];
        //Apply tax and additional fees
        let total = round(subtotal * (1 + HAWAII_SALES_TAX));
        return {...orderCost, subtotal: subtotal.toFixed(2), total: total.toFixed(2)};
    }

    const finalizeOrder = () => {
        popPopUp();
        pushPopUp(<FinalizeOrder
            title="Finalize Order"
        />);
    }
    //Get today's date 
    useEffect(()=>{
        setOrder({...order, dateNeeded: today.current});
    }, []);
    //Update order cost
    useEffect(()=>{
        setOrderCost(getOrderTotal());
    }, [order.dateNeeded]);

    const { total, subtotal, numRushDays } = orderCost;
    const { name, phone, email, dateNeeded, location } = order;
    //Check that the order is valid
    const noError = order.cart.length > 0 &&
        location !== "" && 
        name !== "" &&
        phone !== "" &&
        email !== "";
    const canSubmit = noError && !isEditing;
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        {!noError && (
            <div className='w-11/12 m-auto mb-3'>
                <Alert variant="danger">
                    {order.cart.length === 0 ? "Cart is empty. " : ""}
                    {name === "" || phone === "" || email === "" ? "Contact info is incomplete. " : "" }
                    {location === "" ? "Pickup location is not specified." : ""}
                </Alert>
            </div>
        )}
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto scrollbar-hide">
            <button className="fixed top-3 right-3 rounded-md text-xl p-1 hover:bg-light-gray"
                onClick={()=>setIsEditing(prev=>!prev)}
            >
                {isEditing ? <AiOutlineCheck size={25} color={"green"}/> : <AiOutlineEdit size={25} color={EH_COLOR_DARK}/>}
                
            </button>
            <div className="flex flex-col md:flex-row md:gap-28">
                <div className="mb-3 mr-3">
                    <p className="text-gray-500 dark:text-gray-200 mb-2">Contact Info</p>
                    <ul className="text-xs">
                        {isEditing ? (
                            <li className="mb-2">
                                <label className="mr-1">Name:</label>
                                <MyInput 
                                    type="text"
                                    onChange={(e)=>setOrder({...order, name: e.target.value})} 
                                    value={order.name}
                                    id="name"
                                    color={EH_COLOR_DARK}
                                />
                            </li>
                        ) : <li className="mb-1">Name: {order.name}</li>}
                        {isEditing ? (
                            <li className="mb-2">
                                <label className="mr-1">Phone:</label>
                                <MyInput 
                                    type="text"
                                    onChange={(e)=>setOrder({...order, phone: e.target.value})} 
                                    value={order.phone}
                                    id="phone"
                                    color={EH_COLOR_DARK}
                                />
                            </li>
                        ) : <li className="mb-1">Phone: {order.phone}</li>}
                        {isEditing ? (
                            <li className="mb-1">
                                <label className="mr-1">Email:</label>
                                <MyInput 
                                    type="text"
                                    onChange={(e)=>setOrder({...order, email: e.target.value})} 
                                    value={order.email}
                                    id="email"
                                    color={EH_COLOR_DARK}
                                />
                            </li>
                        ) : <li className="mb-1">Email: {order.email}</li>}
                    </ul>
                </div>
                <div className='mb-3'>
                    <p className="text-gray-500 dark:text-gray-200 mb-2">Pickup Location</p>
                    {isEditing ? (
                        <div className="w-52">
                            <LocationSelector/>
                        </div>
                    ) : <p>{locationOpts.find(opt => opt.value === location).label}</p>}
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-200 mb-2">Date Needed</p>
                    {isEditing ? (
                        <input type="date" name="date-needed"
                            className="border px-3 py-2 w-full rounded-sm mb-4"
                            onChange={e=>setOrder({...order, dateNeeded: e.target.value})}
                            value={dateNeeded}
                            min={today.current}
                        />
                    ) : <p>{dateNeeded}</p>}
                </div>
            </div>
            <div className="mt-3">
                {numRushDays > 0 && (
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
                onClick={finalizeOrder}
                disabled={!canSubmit}
            >
                Employee Verification
            </button>
        </div>
    </div>
  )
}

export default OrderSummary