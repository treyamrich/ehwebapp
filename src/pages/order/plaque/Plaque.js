import React, { useState } from 'react';
import { Header, StepProgressForm, WriteMsg, CardSelector } from '../../../components';
import PlaqueAddon from './PlaqueAddon';
import ConfirmSelItem from './ConfirmSelItem';

import { testItems } from '../../../data/dummy';

const initAddOnState = {
  services: [],
  graphics: [],
  cutouts: [],
  plates: []
}

const Plaque = ({ themeColor, managePopUp, order, setOrder }) => {
  //Selected product
  const [selItemIdx, setSelItemIdx] = useState(-1);
  const [addons, setAddons] = useState(initAddOnState);

  const confirmSelItem = nextStepFunc => {
    managePopUp.pushPopUp(<ConfirmSelItem
      onSubmit={()=>{managePopUp.popPopUp(); nextStepFunc()}}
      onCancel={managePopUp.popPopUp}
      themeColor={themeColor}
    />);
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
          <WriteMsg stepName="Write your customized message"/>
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