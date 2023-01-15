import React, { useState } from 'react';
import { Header, StepProgressForm, RTE, ConfirmPopUp } from '../../../components';
import PlaqueAddon from './PlaqueAddon';
import ChooseItemStep from '../ChooseItemStep';
import ItemLayout from '../ItemLayout';
import AdditionalNotes from '../AdditionalNotes';
import { EditorState } from 'draft-js';
import { InitCartItemState, EH_COLOR_DARK } from '../../../data/uidata';
import { useStateContext } from '../../../contexts/ContextProvider';

const lineLimit = 5;
const lineLenLimit = 65;

const Plaque = ({ order, setOrder }) => {

  //On first render, instruct the RTE to center the text
  const [autoTxtCenter, setAutoTxtCenter] = useState(true);
  
  const [cartItem, setCartItem] = useState({...InitCartItemState});
  const [selItem, setSelItem] = useState(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

  const { handleClick, popPopUp, pushPopUp } = useStateContext();

  const confirmSelItem = nextStepFunc => {
    pushPopUp(<ConfirmPopUp
      onSubmit={()=>{popPopUp(); nextStepFunc()}}
      onCancel={popPopUp}
      themeColor={EH_COLOR_DARK}
      msg="Are you sure you want to proceed without choosing an item?"
      title="No Item Selected"
    />);
  }
  const confirmLineCount = () => {
    pushPopUp(
    <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto"
      title="Line Count Limit Exceeded"
    >
      <p className="text-sm">Your message exceeds the line limit. Please shorten your message to proceed.</p>
    </div>);
  }
  const confirmMsg = nextStepFunc => {
    pushPopUp(<ConfirmPopUp
      onSubmit={()=>{popPopUp(); nextStepFunc()}}
      onCancel={popPopUp}
      themeColor={EH_COLOR_DARK}
      msg="Before proceeding, please double check your message for any spelling or grammatical errors."
      title="Confirm Verbage"
    />);
  }
  //Takes a callback function resetStepForm to reset the StepProgressForm
  const addNotesToItem = resetStepForm => {
    pushPopUp(<AdditionalNotes
      cartItem={cartItem}
      onSubmit={()=>{
        popPopUp(); 
        //Official cart item submission
        addToCart(); 
        resetStepForm();
      }}
      themeColor={EH_COLOR_DARK}
      title="Additional Notes"
    />);
  }
  const addToCart = () => {
    //Copy attributes when adding to cart
    if(selItem) { //If an item was selected
      cartItem.name = selItem.name;
      cartItem.code = selItem.code;
      cartItem.category = selItem.category;
      cartItem.price = selItem.price;
    }
    cartItem.txtLines = editorState;
    //!!!!!Must json stringify the draft-js object
    setOrder({...order, cart: [...order.cart, cartItem]});

    //Reset the state whole customization process
    setCartItem({...InitCartItemState});
    setSelItem(null);
    setEditorState(EditorState.createEmpty());
    setAutoTxtCenter(true);

    //Open cart
    handleClick('cart');
  }
  return (
    <div className="m-2 md:m-10 mt-14 lg:mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Customize" title="Plaques and Plates" />
      <div className="mt-14">
        <StepProgressForm onSubmit={addNotesToItem}>
          <ChooseItemStep
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
            cartItem={cartItem}
            setCartItem={setCartItem}
            stepTip=""
          />
          <ItemLayout
            stepName="Layout"
            stepTip="The layout describes 'what' goes 'where' on your item."
            cartItem={cartItem}
            setCartItem={setCartItem}
          />
        </StepProgressForm>
      </div>
    </div>
  )
}

export default Plaque