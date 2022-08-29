import React, { useState } from 'react';
import { Header, StepProgressForm, WriteMsg, CardSelector } from '../../../components';
import PlaqueAddon from './PlaqueAddon';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const initAddOnState = {
  services: [],
  graphics: [],
  cutouts: [],
  plates: []
}
const Plaque = ({ themeColor, managePopUp, order, setOrder }) => {
  //Selected product
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [addons, setAddons] = useState(initAddOnState);
  return (
    <div className="m-2 md:m-10 mt-14 lg:mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Customize" title="Plaques and Plates" />
      <div className="mt-14">
        <StepProgressForm>
          <CardSelector 
            items={items} 
            orientation="horizontal" 
            selectedIdx={selectedIdx} 
            setSelectedIdx={setSelectedIdx}
            stepName="Choose a Plaque/Plate"
            stepTip="Tip: Dimensions are listed in format: Length x Width (L x W) and in the units of inches"
            isCardDisabled={()=>false}
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