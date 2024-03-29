import React from 'react';
import { Page, StepProgressForm, RTE, ConfirmPopUp } from '../../components';
import PlaqueAddon from './steps/PlaqueAddon';
import ItemLayout from './steps/ItemLayout';
import AdditionalNotes from './popups/AdditionalNotes';
import {  EH_COLOR_DARK } from '../../data/uidata';
import { useStateContext } from '../../contexts/ContextProvider';

const lineLimit = 5;
const lineLenLimit = 65;

const CustomizeCartItem = ({ editItemIdx, cancelEditItem, cartItem, setCartItem, selItem, editorState, setEditorState, autoTxtCenter, setAutoTxtCenter, addToCart }) => {

  const { popPopUp, pushPopUp } = useStateContext();

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
  return (
    <Page category={selItem.name} title="Customize">
      <div className="mt-14">
        <StepProgressForm onSubmit={addNotesToItem} 
          onCancel={editItemIdx === -1 ? undefined : cancelEditItem} 
          cancelMsg="Cancel Edit"
          submitMsg="Add to cart"
          shouldReset={()=>editItemIdx !== -1}
          resetHook={editItemIdx}
        >
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
    </Page>
  )
}

export default CustomizeCartItem