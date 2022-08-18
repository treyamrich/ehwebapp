import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


import { CardAdder, Tabs, Tab } from '../../../components';

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
      <Tabs defaultActiveIdx={0}>
        <Tab title="Plate(s)">
          <h1>hi</h1>
        </Tab>
        <Tab title="Services">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            defaultValue={[options[4], options[5]]}
            isMulti
            options={services}
            onChange={(selOps)=>setServices(selOps)}
          />
        </Tab>
        <Tab title="Graphics">
          <CardAdder options={graphics} setOptions={setGraphics}/>
        </Tab>
        <Tab title="Wood Cutouts">
          <CardAdder options={cutouts} setOptions={setCutouts}/>
        </Tab>
      </Tabs>
    </div>
  )
}

export default PlaqueAddon