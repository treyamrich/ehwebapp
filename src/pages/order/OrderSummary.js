import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { Alert, MyInput } from '../../components';
import Select from 'react-select';
import { RUSH_FEES, EH_COLOR_DARK, locations, animatedComponents, HAWAII_SALES_TAX } from '../../data/uidata';
import { formatDate, subtractDays } from '../../utility/DateTimeFunctions';

const InitOrderCost = {
    subtotal: 0,
    total: 0,
    numRushDays: 0
  };

const OrderSummary = ({ order, setOrder, getItemPrice }) => {
    
    //Form state
    const [isEditing, setIsEditing] = useState(false);
    const [orderCost, setOrderCost] = useState(InitOrderCost);
    const today = useRef(formatDate(new Date()));
    //Must use separate state since this is a popup. Customer wants to change their order info
    const [orderInfo, setOrderInfo] = useState(()=>{
        const { name, phone, email } = order.contactInfo;
        return {
            name: name, 
            phone: phone, 
            email: email, 
            location: order.location, 
            dateNeeded: order.dateNeeded
        };
    });
    //Check that the order is valid
    const canSubmit = order.cart.length > 0 &&
        orderInfo.location !== "" && 
        orderInfo.name !== "" &&
        orderInfo.phone !== "" &&
        orderInfo.email !== "" &&
        !isEditing;
    
    const handleChangeName = newName => {
        setOrderInfo({...orderInfo, name: newName});
        order.contactInfo.name = newName;
    }
    const handleChangePhone = newPhone => {
        setOrderInfo({...orderInfo, phone: newPhone});
        order.contactInfo.phone = newPhone;
    }
    const handleChangeEmail = newEmail => {
        setOrderInfo({...orderInfo, email: newEmail});
        order.contactInfo.email = newEmail;
    }
    const handleChangeLocation = newLocation => {
        setOrderInfo({...orderInfo, location: newLocation});
        setOrder({...order, location: newLocation});
    }
    const handleChangeDateNeeded = newDate => {
        setOrderInfo({...orderInfo, dateNeeded: newDate});
        setOrder({...order, dateNeeded: newDate});
    }

    const round = num => Math.round((num + Number.EPSILON) * 100) / 100;

    //Returns the nearest integer amount of rush days
    const getNumRushDays = () => {
        let dateDiff = subtractDays(new Date(), new Date(orderInfo.dateNeeded));
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
    //Adds the order to the database and resets the entire app by refreshing
    const submitOrder = () => {
        console.log("ORDER SUBMITTED");
    }
    //Get today's date 
    useEffect(()=>{
        setOrder({...order, dateNeeded: today.current});
    }, []);
    //Update order cost
    useEffect(()=>{
        setOrderCost(getOrderTotal());
    }, [orderInfo.dateNeeded]);

    const { total, subtotal, numRushDays } = orderCost; 
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        {!canSubmit && (
            <div className='w-11/12 m-auto mb-3'>
                <Alert variant="danger">
                    {order.cart.length === 0 ? "Cart is empty. " : ""}
                    {orderInfo.name === "" || orderInfo.phone === "" || orderInfo.email === "" ? "Contact info is incomplete. " : "" }
                    {orderInfo.location === "" ? "Pickup location is not specified." : ""}
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
                            <li className="mb-1">
                                <label className="mr-1">Name:</label>
                                <MyInput 
                                    type="text"
                                    onChange={(e)=>handleChangeName(e.target.value)} 
                                    value={orderInfo.name}
                                    id="name"
                                    color={EH_COLOR_DARK}
                                />
                            </li>
                        ) : <li className="mb-1">Name: {orderInfo.name}</li>}
                        {isEditing ? (
                            <li className="mb-1">
                                <label className="mr-1">Phone:</label>
                                <MyInput 
                                    type="text"
                                    onChange={(e)=>handleChangePhone(e.target.value)} 
                                    value={orderInfo.phone}
                                    id="phone"
                                    color={EH_COLOR_DARK}
                                />
                            </li>
                        ) : <li className="mb-1">Phone: {orderInfo.phone}</li>}
                        {isEditing ? (
                            <li className="mb-1">
                                <label className="mr-1">Email:</label>
                                <MyInput 
                                    type="text"
                                    onChange={(e)=>handleChangeEmail(e.target.value)} 
                                    value={orderInfo.email}
                                    id="email"
                                    color={EH_COLOR_DARK}
                                />
                            </li>
                        ) : <li className="mb-1">Email: {orderInfo.email}</li>}
                    </ul>
                </div>
                <div className='mb-3'>
                    <p className="text-gray-500 dark:text-gray-200 mb-1">Pickup Location</p>
                    {isEditing ? (
                        <Select
                            closeMenuOnSelect={true}
                            components={animatedComponents}
                            options={locations}
                            defaultValue={orderInfo.location !== "" ? [{label: orderInfo.location, value: -1}] : []}
                            onChange={option=>handleChangeLocation(option.label)}
                            className="mb-3"
                    />
                    ) : <p>{orderInfo.location}</p>}
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-200 mb-1">Date Needed</p>
                    {isEditing ? (
                        <input type="date" name="date-needed"
                            className="border px-3 py-2 w-full rounded-sm mb-4"
                            onChange={e=>handleChangeDateNeeded(e.target.value)}
                            value={orderInfo.dateNeeded}
                            min={today.current}
                        />
                    ) : <p>{orderInfo.dateNeeded}</p>}
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
                Place Order
            </button>
        </div>
    </div>
  )
}

export default OrderSummary