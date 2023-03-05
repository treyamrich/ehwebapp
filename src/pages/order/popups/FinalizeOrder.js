import React, {  useState } from 'react';
import { MyInput, Alert, MyTextArea } from '../../../components';
import { useStateContext } from '../../../contexts/ContextProvider';
import { EH_COLOR_DARK, AUTH_MODE_IAM } from '../../../data/uidata';
import { convertToRaw } from 'draft-js';
import { API } from 'aws-amplify';
import { createOrders } from '../../../graphql/mutations';
import { updateItemQuantities } from '../../../data/APICalls';

//This component is for the employee to fill in additional information e.g order number
const FinalizeOrder = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [falsePin, setFalsePin] = useState(false);
    const [empPin, setEmpPin] = useState(""); //Get employee pin
    const { order, setOrder } = useStateContext();

    //Recursively creates a deep copy of each cart itemm
    const getDeepCopy = items => {
        if(items.length === 0) return [];
        const newItems = items.map(item => {
            const newItem = {...item};
            newItem.subItems = getDeepCopy(item.subItems);
            return newItem;
        });
        return newItems;
    }
    //Recursively turns each draft-js editorState's contentState obj to a string
    const serializeTxtObj = cartItem => {
        cartItem.txtObj = cartItem.postTxt ? "" : 
        JSON.stringify(
            convertToRaw(cartItem.txtObj.getCurrentContent()
        ));
        cartItem.subItems.forEach(subItem => serializeTxtObj(subItem));
    }
    const submitOrder = async () => {
        console.log("ORDER SUBMITTED");
        console.log(order);

        //Convert all cart item's draft-js objects to string
        const deepCopy = getDeepCopy(order.cart);
        order.cart.forEach(cartItem => {
            serializeTxtObj(cartItem);
        });

        try {
            //Update item counts
            await updateItemQuantities(order.cart);

            //Submit order
            await API.graphql({ query: createOrders,
                variables: {
                    input: order
                },
                authMode: AUTH_MODE_IAM
            });
            //Reset order state by refreshing page
            //window.location.reload();
        } catch(e) {
            //This means an item is out of stock
            if(e.name === 'TransactionCanceledException' && e.message.includes('ConditionalCheckFailed')) {
                console.log('hi');
            }
            //Restore the cart
            order.cart = deepCopy;
        }
        order.cart = deepCopy;
    }
    
    const handleCheckPin = () => {
        if(empPin === "1234") {
            setIsAuthenticated(true);
        } else {
            setFalsePin(true);
        }
    }
    const cantSubmitOrder = isAuthenticated && order.orderNum === '';
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        {falsePin && (
            <div className='w-11/12 m-auto mb-3'>
                <Alert variant="danger" dismissible onClose={()=>setFalsePin(false)}>
                    The pin entered was incorrect.
                </Alert>
            </div>
        )}
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto scrollbar-hide">
            {isAuthenticated ? (
            <div className="flex flex-col md:flex-row md:gap-28">
                <div>
                    <p className="text-gray-500 dark:text-gray-200 mb-2">Order Info</p>
                    <div className="text-xs mb-3">
                        <label className="mr-1 font-semibold">Order number:</label>
                        <MyInput 
                            type="text"
                            onChange={(e)=>setOrder({...order, orderNum: e.target.value})} 
                            value={order.orderNum}
                            id="order-num"
                            color={EH_COLOR_DARK}
                        />
                    </div>
                    <div className="text-xs">
                        <label className="mr-1 font-semibold">Notes to engraver:</label>
                        <MyTextArea 
                            onChange={(e)=>setOrder({...order, notes: e.target.value})} 
                            value={order.notes}
                            id="order-notes"
                            style={{height: "150px"}}
                        />
                    </div>
                </div>
            </div>
            ) : (
            <div>
                <p className="text-gray-500 dark:text-gray-200 mb-2">Employee PIN</p>
                <div className="text-xs">
                    <label className="mr-1">Enter your pin:</label>
                    <MyInput 
                        type="password"
                        onChange={(e)=>setEmpPin(e.target.value)} 
                        value={empPin}
                        id="name"
                        color={EH_COLOR_DARK}
                        style={{width: "100px"}}
                    />
                </div>
            </div>
            )}
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
            <button className={`text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3 ${cantSubmitOrder ? 'opacity-50' : ''}`}
                style={{borderRadius: '10px', backgroundColor: isAuthenticated ? "#4db193" : EH_COLOR_DARK}}
                type="button"
                onClick={isAuthenticated ? submitOrder : handleCheckPin}
                disabled={cantSubmitOrder}
            >
                {isAuthenticated ? "Submit Order" : "Continue"}
            </button>
        </div>
    </div>
  )
}

/*This component is for the employee to fill in additional information
*/
export default FinalizeOrder