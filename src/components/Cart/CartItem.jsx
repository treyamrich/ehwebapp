import React from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { addonFields } from '../../data/uidata';
import { firstLetterUppercase, toNameString } from '../../utility/Strings';

const CartItem = ({ item }) => {
    
    const updateItemQty = amt => {
        
    }
    //Gets the first 2 lines or 2 blocks from the draft-js editor state object (item.txtLines)
    const getTxtFromEditorState = () => {
        const contentBlkArr = item.txtLines.getCurrentContent().getBlocksAsArray();
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
        let previewJsx = getTxtFromEditorState();
        return previewJsx ? 
            (<li className="text-xs">
                <h4 className="font-semibold">Text Preview</h4>
                {previewJsx}
            </li>) : null;
    }
    const txtJsx = getTxtJsx();
  return (
    <div>
        <div className="border-b-1 border-color dark:border-gray-600 p-4">
            <div className="flex items-center gap-5 leading-8">
                <img className="rounded-lg h-80 w-24" src={item.image} alt="" />
                <div>
                <p className="font-semibold ">{item.name ? item.name : "No item selected"}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{firstLetterUppercase(item.category)}</p>
                <div className="flex gap-4 mt-2 items-center">
                    <p className="font-semibold text-lg">{item.price}</p>
                    <div className="flex items-center border-1 border-r-0 border-color rounded">
                    <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600"
                        onClick={()=>updateItemQty(-1)}
                    >
                        <AiOutlineMinus />
                    </p>
                    <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">{item.quantity}</p>
                    <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600"><AiOutlinePlus /></p>
                    </div>
                </div>
                </div>
            </div>
            <ul>
                {txtJsx}
                {addonFields.map((field, key) => (
                    <li key={key} className="text-xs">
                        {item[field].length > 0 && (
                        <h4 className="font-semibold">{firstLetterUppercase(field)}</h4>
                        )}
                        {toNameString(item[field])}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default CartItem