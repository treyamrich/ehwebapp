import React, { useState } from 'react';
import { Header, StepProgressForm, WriteMsg, ProductSelector } from '../../../components';
import PlaqueAddon from './PlaqueAddon';

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Plaque = ({ order, setOrder }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="m-2 md:m-10 mt-14 lg:mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Customize" title="Plaques and Plates" />
      <div className="mt-14">
        <StepProgressForm>
          <ProductSelector 
            products={items} 
            orientation="horizontal" 
            selectedIdx={selectedIdx} 
            setSelectedIdx={setSelectedIdx}
            stepName="Choose a Plaque/Plate"
          />
          <WriteMsg stepName="Write your customized message"/>
          <PlaqueAddon stepName="Add-ons"/>
        </StepProgressForm>
      </div>
    </div>
  )
}

export default Plaque