import React from 'react';
import { Header, StepProgressForm, ChooseItem, WriteMsg, ChooseAddOn } from '../../../components';

const Plaque = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Customize" title="Plaques and Plates" />
      <div>
        <StepProgressForm>
          <ChooseItem stepName="Choose a Plaque/Plate"/>
          <WriteMsg stepName="Write your customized message"/>
          <ChooseAddOn stepName="Add-ons"/>
        </StepProgressForm>
      </div>
    </div>
  )
}

export default Plaque