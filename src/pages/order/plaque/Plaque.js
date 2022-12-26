import React, { useState } from 'react';
import { Header, StepProgressForm, RTE, ConfirmPopUp } from '../../../components';
import PlaqueAddon from './PlaqueAddon';
import ChooseItemStep from '../ChooseItemStep';
import ItemLayout from '../ItemLayout';
import { EditorState } from 'draft-js';
import { InitCartItemState } from '../../../data/uidata';

const lineLimit = 5;
const lineLenLimit = 65;

const Plaque = ({ themeColor, managePopUp, order, setOrder }) => {

  //On first render, instruct the RTE to center the text
  const [autoTxtCenter, setAutoTxtCenter] = useState(true);
  
  const [cartItem, setCartItem] = useState(InitCartItemState);
  const [selItem, setSelItem] = useState(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

  const confirmSelItem = nextStepFunc => {
    managePopUp.pushPopUp(<ConfirmPopUp
      onSubmit={()=>{managePopUp.popPopUp(); nextStepFunc()}}
      onCancel={managePopUp.popPopUp}
      themeColor={themeColor}
      msg="Are you sure you want to proceed without choosing an item?"
      title="No Item Selected"
    />);
  }
  const confirmLineCount = () => {
    managePopUp.pushPopUp(
    <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
      <p className="text-sm">Your message exceeds the line limit. Please shorten your message to proceed.</p>
    </div>);
  }
  const confirmMsg = nextStepFunc => {
    managePopUp.pushPopUp(<ConfirmPopUp
      onSubmit={()=>{managePopUp.popPopUp(); nextStepFunc()}}
      onCancel={managePopUp.popPopUp}
      themeColor={themeColor}
      msg="Before proceeding, please double check your message for any spelling or grammatical errors."
      title="Confirm Verbage"
    />);
  }
  const addItemToCart = () => {
    const item = {};
    //item.itemName = selItem.itemName;
    //item.itemCode = selItem.itemCode;
    //item.itemPrice = selItem.itemPrice;
    //item.services = addons.services;
    //Plate
    //item.subItems = 1;
    //item.graphics = addons.graphics;
    //Must add the editor state from the draft-js object
    setOrder({...order, cart: [...order.cart, item]});
  }
  return (
    <div className="m-2 md:m-10 mt-14 lg:mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Customize" title="Plaques and Plates" />
      <div className="mt-14">
        <StepProgressForm resetOnSubmit={true} onSubmit={addItemToCart}>
          <ChooseItemStep
            themeColor={themeColor}
            selectedItem={selItem}
            setSelectedItem={setSelItem}
            stepName="Choose an item"
            stepTip="Tip: Dimensions are listed in format: Width x Height (W x H) and in the units of inches"
            skipStepAmt={2}
            confirmStep={confirmSelItem}
            shouldConfStep={selItem === null}
          />
          <RTE stepName="Write your customized message"
            editorState={editorState}
            setEditorState={setEditorState}
            lineLimit={lineLimit}
            lineLenLimit={lineLenLimit}
            confirmStep={editorState.getCurrentContent().getBlockMap().size > lineLimit ? confirmLineCount : confirmMsg}
            shouldConfStep={true}
            autoTxtCenter={autoTxtCenter}
            setAutoTxtCenter={setAutoTxtCenter}
            cartItem={cartItem}
            setCartItem={setCartItem}
          />
          <PlaqueAddon stepName="Add-ons"
            themeColor={themeColor}
            managePopUp={managePopUp}
            cartItem={cartItem}
            setCartItem={setCartItem}
            stepTip=""
          />
          <ItemLayout
            stepName="Layout"
            stepTip=""
          />
        </StepProgressForm>
      </div>
    </div>
  )
}

export default Plaque