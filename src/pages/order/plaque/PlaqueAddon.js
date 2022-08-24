import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import GraphicForm from '../GraphicForm';
import { CardManager, Tabs, Tab } from '../../../components';

const animatedComponents = makeAnimated();

const options = [
  { value: 'coin-mount', label: 'Coin Mount' },
  { value: 'item-mount', label: 'Item Mount'},
  { value: 'color-fill', label: 'Color Fill'}
]

const PlaqueAddon = ({themeColor, addonState}) => {
  const { services, setServices, graphics, setGraphics, cutouts, setCutouts } = addonState;
  return (
    <div>
      <Tabs>
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
          <CardManager 
            options={graphics} 
            setOptions={setGraphics}
            title="Add Graphic(s)"
            addForm={<GraphicForm btnBgColor={themeColor}/>}
          />
        </Tab>
        <Tab title="Wood Cutouts">
          <CardManager 
            options={cutouts} 
            setOptions={setCutouts}
            title="Add Cutout(s)"
            addForm={<GraphicForm btnBgColor={themeColor}/>}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default PlaqueAddon