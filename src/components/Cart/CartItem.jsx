import React from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineEdit } from 'react-icons/ai';
import { addonFields, EH_COLOR_DARK } from '../../data/uidata';
import { firstLetterUppercase } from '../../utility/Strings';
import { useStateContext } from '../../contexts/ContextProvider';
import { ConfirmPopUp } from '../../components';

const CartItem = ({ item, getItemPrice, editCartItem }) => {
    
    const { pushPopUp, popPopUp, order, setOrder } = useStateContext();

    const updateCartItem = () => setOrder({...order, cart: [...order.cart]});
    const removeCartItem = () => {
        const newCart = [];
        order.cart.forEach(elm => {
            if(elm !== item) newCart.push(elm)
        });
        setOrder({...order, cart: newCart});
    }
    //Handles the general update item qty event
    const updateItemQty = amt => {
        //Remove item if no quantity
        if(item.quantity + amt === 0) {
            pushPopUp(<ConfirmPopUp
                onCancel={popPopUp}
                onSubmit={()=>{removeCartItem(); popPopUp()}}
                msg="Are you sure you want to remove this item?"
            />);
        } else {
            item.quantity += amt;
            updateCartItem();
        }
    }
    //Gets the first 2 lines or 2 blocks from the draft-js editor state object (item.txtObj)
    const getTxtFromEditorState = editorState => {
        const contentBlkArr = editorState.getCurrentContent().getBlocksAsArray();
        let isEmpty = true;
        const textJsx = contentBlkArr.map((blk, idx) => {
            //Check if the text is empty
            let line = blk.getText();
            if(line.length > 0) isEmpty = false;
            return idx < 2 ? (<p key={idx}>{line}<br/></p>) : null
        });
        return isEmpty ? null : textJsx;
    }
    //Fetches the text from the draft-js editorstate object and puts it in jsx
    const getTxtJsx = () => {
        let previewJsx = getTxtFromEditorState(item.txtObj);
        return previewJsx ? 
            (<div className="text-xs">
                <h4 className="font-semibold">Text Preview</h4>
                {previewJsx}
            </div>) : null;
    }
    const txtJsx = getTxtJsx();
  return (
    <div className="border-b-1 border-color dark:border-gray-600 py-4 relative">
        <div className="flex items-center gap-5 leading-8">
            <img className="rounded-lg h-80 w-24" src={item.image} alt="" />
            <div>
                <p className="font-semibold ">{item.name ? item.name : "No item selected"}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{firstLetterUppercase(item.category)}</p>
                <div className="flex gap-4 mt-2 items-center">
                    <p className="font-semibold text-lg">${getItemPrice(item).toFixed(2)}</p>
                    <div className="flex items-center border-1 border-r-0 border-color rounded">
                        <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600"
                            onClick={()=>updateItemQty(-1)}
                        >
                            <AiOutlineMinus />
                        </p>
                        <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">{item.quantity}</p>
                        <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"
                            onClick={()=>updateItemQty(1)}
                        >
                            <AiOutlinePlus />
                        </p>
                    </div>
                    <button className="rounded-md text-xl p-1 hover:bg-light-gray"
                        onClick={editCartItem}
                    >
                        <AiOutlineEdit size={25} color={EH_COLOR_DARK}/>
                    </button>
                </div>
            </div>
        </div>
        <div className="w-11/12 flex flex-wrap gap-3 mt-2">
            {txtJsx}
            {addonFields.map((field, key) => (
                <div key={key} className="text-xs">
                    {item[field].length > 0 && (<>
                        <h4 className="font-semibold">{firstLetterUppercase(field)}</h4>
                        <ul>
                            {item[field].map((elm, idx) => (<li key={idx}>{elm.name}</li>))}
                        </ul>
                    </>)}
                </div>
            ))}
            {item.subItems.length > 0 && (<div>
                <h4 className="font-semibold text-xs">Subitems</h4>
                {item.subItems.map((subItem, idx)=>(
                    <div key={idx} className="text-xs">
                        {subItem.name}
                    </div>
                ))}
            </div>)}
            {item.notes !== "" && (<div>
                <h4 className="font-semibold text-xs">Additional Notes</h4>
                <div className="text-xs">{item.notes}</div>
            </div>)}
        </div>
    </div>
  )
}

export default CartItem