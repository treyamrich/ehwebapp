import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { CardAdder } from '../../../components';

const animatedComponents = makeAnimated();

const options = [
  { value: 'coin-mount', label: 'Coin Mount' },
  { value: 'item-mount', label: 'Item Mount'},
  { value: 'color-fill', label: 'Color Fill'}
]

const PlaqueAddon = ({addonState}) => {
  const { services, setServices, graphics, setGraphics, cutouts, setCutouts } = addonState;
  return (
    <div>
      <h4 className="font-bold">Services</h4>
      <div className="mb-3">
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={[options[4], options[5]]}
          isMulti
          options={services}
          onChange={(selOps)=>setServices(selOps)}
        />
      </div>
      <h4 className="font-bold">Graphics</h4>
      <div className="mb-3">
        <CardAdder options={graphics} setOptions={setGraphics}/>
      </div>
      <h4 className="font-bold">Wood Cutouts</h4>
      <div className="mb-3">
        <CardAdder options={cutouts} setOptions={setCutouts}/>
      </div>
    </div>
  )
}

export default PlaqueAddon