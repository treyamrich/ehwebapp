import React from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { addonFields } from '../../data/uidata';

const CartItem = ({ item }) => {
    const getTxtFromEditorState = () => {
        //item.txtLines is a draft-js editorstate object
        const contentBlkArr = item.txtLines.getCurrentContent().getBlocksAsArray();
        let isEmpty = true;
        const textJsx = contentBlkArr.map((blk, idx) => {
            //Check if the verbage is empty
            let line = blk.getText();
            if(line.length > 0) isEmpty = false;
            if(idx < 2) return <p key={idx}>{line}<br/></p>
        });
        return isEmpty ? null : textJsx;
    }
    const firstLetterUppercase = str => {
        return `${str.substring(0,1).toUpperCase()}${str.substring(1,str.length).toLowerCase()}`;
    }
    const toNameString = arr => {
        let str = "";
        for(let i = 0; i < arr.length; i++) {
            str += arr[i].name;
            if(i !== arr.length - 1) str += ", ";
        }
        return str;
    }
    const getVerbageJsx = () => {
        let previewJsx = getTxtFromEditorState();
        return previewJsx ? 
            (<li className="text-xs">
                <h4 className="font-semibold">Text Preview</h4>
                {getTxtFromEditorState()}
            </li>) : null;
    }
    const getAddonJsx = () => {
        let hasAnAddon = false;
        const addonJsx = addonFields.map((field, key) => {
            if(item[field].length > 0) hasAnAddon = true;
            return (
                <li key={key} className="text-xs">
                    {item[field].length > 0 && (
                    <h4 className="font-semibold">{firstLetterUppercase(field)}</h4>
                    )}
                    {toNameString(item[field])}
                </li>);
        });
        return hasAnAddon ? addonJsx : null;
    }
    const verbageJsx = getVerbageJsx();
    const addonJsx = getAddonJsx();
  return (
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
            {(verbageJsx || addonJsx) && (<>
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold">Item Details</h3>
                <ul>
                    {verbageJsx}
                    {addonJsx}
                </ul>
            </>)}
        </div>
    </div>
  )
}

export default CartItem