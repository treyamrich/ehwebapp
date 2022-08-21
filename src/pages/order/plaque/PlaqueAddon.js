import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import GraphicForm from '../GraphicForm';
import { CardAdder, Tabs, Tab } from '../../../components';

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
          <CardAdder 
            options={graphics} 
            setOptions={setGraphics}
            title="Add Graphic(s)"
            addComponent={<GraphicForm btnBgColor={themeColor}/>}
          />
        </Tab>
        <Tab title="Wood Cutouts">
          <CardAdder 
            options={cutouts} 
            setOptions={setCutouts}
            title="Add Cutout(s)"
            addComponent={<GraphicForm btnBgColor={themeColor} />}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default PlaqueAddon