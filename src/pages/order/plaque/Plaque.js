import React, { useEffect, useState } from 'react';
import { Header, StepProgressForm, RTE, CardSelector } from '../../../components';
import PlaqueAddon from './PlaqueAddon';
import ConfirmSelItem from './ConfirmSelItem';
import { EditorState } from 'draft-js';
import { testItems } from '../../../data/dummy';

const initAddOnState = {
  services: [],
  graphics: [],
  cutouts: [],
  plates: []
}

const Plaque = ({ themeColor, managePopUp, order, setOrder }) => {
  //On first render, instruct the RTE to center the text
  const [autoTxtCenter, setAutoTxtCenter] = useState(true);

  //Selected product
  const [selItemIdx, setSelItemIdx] = useState(-1);
  const [addons, setAddons] = useState(initAddOnState);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

  let lineLimit = 5;
  let lineLenLimit = 65;

  const confirmSelItem = nextStepFunc => {
    managePopUp.pushPopUp(<ConfirmSelItem
      onSubmit={()=>{managePopUp.popPopUp(); nextStepFunc()}}
      onCancel={managePopUp.popPopUp}
      themeColor={themeColor}
    />);
  }
  const confirmLineCount = () => {
    managePopUp.pushPopUp(
    <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
      <p className="text-sm">Your message is too long :(</p>
    </div>);
  }

  return (
    <div className="m-2 md:m-10 mt-14 lg:mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Customize" title="Plaques and Plates" />
      <div className="mt-14">
        <StepProgressForm>
          <CardSelector 
            items={testItems} 
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
            confirmStep={confirmLineCount}
            shouldConfStep={editorState.getCurrentContent().getBlockMap().size > lineLimit}
            autoTxtCenter={autoTxtCenter}
            setAutoTxtCenter={setAutoTxtCenter}
          />
          <PlaqueAddon stepName="Add-ons"
            themeColor={themeColor}
            managePopUp={managePopUp}
            addons={addons}
            setAddons={setAddons}
          />
        </StepProgressForm>
      </div>
    </div>
  )
}

export default Plaque