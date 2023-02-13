import React, {  useState } from 'react';
import { MyInput, Alert, MyTextArea } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { EH_COLOR_DARK } from '../../data/uidata';
import { convertToRaw } from 'draft-js';

/*This component is for the employee to fill in additional information e.g order number
*/
const FinalizeOrder = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [falsePin, setFalsePin] = useState(false);
    const [empPin, setEmpPin] = useState(""); //Get employee pin
    const { order, setOrder } = useStateContext();
    const submitOrder = () => {
        console.log("ORDER SUBMITTED");
        console.log(order);
        //Convert all cart item's draft-js objects to string
        const editorStates = [];
        order.cart.forEach(cartItem => {
            //Save editor state in case of failure
            editorStates.push(cartItem.txtObj);
            
            //Check if verbage is beging sent later

            //Serialize draft-js obj as string
            cartItem.txtObj = JSON.stringify(convertToRaw(cartItem.txtObj.getCurrentContent()));
            console.log(cartItem.txtObj);
        });
    }
    const handleCheckPin = () => {
        if(empPin === "1234") {
            setIsAuthenticated(true);
        } else {
            setFalsePin(true);
        }
    }
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
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: isAuthenticated ? "#4db193" : EH_COLOR_DARK}}
                type="button"
                onClick={isAuthenticated ? submitOrder : handleCheckPin}
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