import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import GraphicForm from '../GraphicForm';
import PlateForm from './PlateForm';
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
          <div className="p-2 text-center mb-1">
            <p className="text-sm text-slate-400">
              Info: Plates add a clean metallic look which makes your plaque pop. They are either mounted on the plaque by us, or come with double-sided tape for your liberty.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">Add your plate(s) here</h4>
            <CardManager 
              options={graphics} 
              setOptions={setGraphics}
              title="Add Plate"
              addForm={<PlateForm btnBgColor={themeColor}/>}
            />
          </div>
        </Tab>
        <Tab title="Services">
          <div className="p-2 text-center mb-1">
            <p className="text-sm text-slate-400">
              Info: Services are anything that we do for item.
            </p>
          </div>
          <div className="h-36">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              defaultValue={[options[4], options[5]]}
              isMulti
              options={options}
              onChange={(selOps)=>setServices(selOps)}
            />
          </div>
        </Tab>
        <Tab title="Graphics">
          <div className="p-2 text-center mb-1">
            <p className="text-sm text-slate-400">
              Info: Graphics are engraved directly on the plaque. It's recommended to add graphics when your plaque is feeling empty.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">Add your graphic(s) here</h4>
            <CardManager 
              options={graphics} 
              setOptions={setGraphics}
              title="Add Plaque Graphic"
              addForm={<GraphicForm btnBgColor={themeColor}/>}
            />
          </div>
        </Tab>
        <Tab title="Wood Cutouts">
          <div className="p-2 text-center mb-1">
            <p className="text-sm text-slate-400">
              Info: Wood Cutouts are mounted on the plaque. We recommend them alongside adding a plate. This will give your plaque a "pop" effect
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">Add your cutout(s) here</h4>
            <CardManager 
              options={graphics} 
              setOptions={setGraphics}
              title="Add Wood Cutout"
              addForm={<GraphicForm btnBgColor={themeColor}/>}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default PlaqueAddon