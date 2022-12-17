import React, { useState } from 'react';
import { Header, StepProgressForm, RTE, CardSelector } from '../../../components';
import PlaqueAddon from './PlaqueAddon';
import { ConfirmPopUp } from '../../../components';
import { EditorState } from 'draft-js';
import { testItems } from '../../../data/dummy';

const initAddOnState = {
  services: [],
  graphics: [],
  cutouts: [],
  plates: []
}
const lineLimit = 5;
const lineLenLimit = 65;

const Plaque = ({ themeColor, managePopUp, order, setOrder }) => {
  const [itemChoices, setItemChoices] = useState(testItems);

  //On first render, instruct the RTE to center the text
  const [autoTxtCenter, setAutoTxtCenter] = useState(true);
  
  //Selected product
  const [selItemIdx, setSelItemIdx] = useState(-1);
  const [addons, setAddons] = useState(initAddOnState);
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

  return (
    <div className="m-2 md:m-10 mt-14 lg:mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Customize" title="Plaques and Plates" />
      <div className="mt-14">
        <StepProgressForm>
          <CardSelector 
            items={itemChoices} 
            setItems={setItemChoices}
            orientation="horizontal" 
            selectedIdx={selItemIdx} 
            setSelectedIdx={setSelItemIdx}
            stepName="Choose an item"
            stepTip="Tip: Dimensions are listed in format: Length x Width (L x W) and in the units of inches"
            isCardDisabled={()=>false}
            skipStepAmt={2}
            confirmStep={confirmSelItem}
            shouldConfStep={selItemIdx === -1}
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
          />
          <PlaqueAddon stepName="Add-ons"
            themeColor={themeColor}
            managePopUp={managePopUp}
            addons={addons}
            setAddons={setAddons}
            stepTip=""
          />
        </StepProgressForm>
      </div>
    </div>
  )
}

export default Plaque