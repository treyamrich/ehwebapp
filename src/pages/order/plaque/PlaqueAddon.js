import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import GraphicForm from '../GraphicForm';
import PlateForm from './PlateForm';
import { CardManager, Tabs, Tab } from '../../../components';

import { serviceOpts } from '../../../data/uidata';

const animatedComponents = makeAnimated();

const PlaqueAddon = ({themeColor, managePopUp, addons, setAddons}) => {
  const { pushPopUp, popPopUp } = managePopUp;

  const handleAddPlate = pltObj => {
    popPopUp();
    setAddons({...addons, plates: [pltObj, ...addons.plates]});
  }
  const handleEditPlate = (newPltObj, prevPltIdx) => {
    popPopUp();
    let newPlts = [];
    //Create new arr of plates without the edited plate
    for(let i = 0; i < addons.plates.length; i++) {
      if(i == prevPltIdx) continue;
      newPlts.push(addons.plates[i]);
    }
    setAddons({...addons, plates: [newPltObj, ...newPlts]});
  }
  const handleAddGraphic = graphicObj => {
    popPopUp();
    setAddons({...addons, graphics: [graphicObj, ...addons.graphics]})
  }
  const handleAddCutout = cutoutObj => {
    popPopUp();
    setAddons({...addons, graphics: [cutoutObj, ...addons.cutouts]});
  }
  const handleRemovePlate = newArr => setAddons({...addons, plates: [...newArr]});
  const handleRemoveGraphic = newArr => setAddons({...addons, graphics: [...newArr]});
  const handleRemoveCutout = newArr => setAddons({...addons, cutouts: [...newArr]});
  const handleUpdateServices = newArr => setAddons({...addons, services: [...newArr]});
  return (
    <div>
      <Tabs>
        <Tab title="Plate(s)">
          <div className="p-2 text-center mb-1">
            <p className="text-xs text-slate-400">
              <strong>Info:</strong> Plates add a clean metallic look which makes your plaque pop. They are either mounted on the plaque by us, or come with double-sided tape for your liberty.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">Add your plate(s) here</h4>
            <CardManager 
              options={addons.plates} 
              onDeleteCard={handleRemovePlate}
              onEditCard={(idx)=>pushPopUp(
                <PlateForm title="Edit Plate" 
                  btnBgColor={themeColor}
                  submitForm={newPltObj=>handleEditPlate(newPltObj, idx)}
                  managePopUp={managePopUp}
                  editPlate={addons.plates[idx]}
                />
              )}
              onAddCard={()=>pushPopUp(
                <PlateForm title="Add Plate" 
                  btnBgColor={themeColor}
                  submitForm={handleAddPlate}
                  managePopUp={managePopUp}
                />
              )}
            />
          </div>
        </Tab>
        <Tab title="Services">
          <div className="p-2 text-center mb-1">
            <p className="text-xs text-slate-400">
              <strong>Info:</strong> Services are anything that we do for item.
            </p>
          </div>
          <div className="h-36">
            <h4 className="text-lg font-semibold mb-1">Select your service(s) here</h4>
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              isMulti
              options={serviceOpts}
              onChange={handleUpdateServices}
            />
          </div>
        </Tab>
        <Tab title="Graphics">
          <div className="p-2 text-center mb-1">
            <p className="text-xs text-slate-400">
              <strong>Info:</strong> Graphics are engraved directly on the plaque. It's recommended to add graphics when your plaque is feeling empty.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">Add your graphic(s) here</h4>
            <CardManager 
              options={addons.graphics} 
              onDeleteCard={handleRemoveGraphic}
              title="Add Plaque Graphic"
              onAddCard={()=>pushPopUp(
                <GraphicForm title="Add Graphic" 
                  btnBgColor={themeColor}
                  submitForm={handleAddGraphic}
                />
              )}
            />
          </div>
        </Tab>
        <Tab title="Wood Cutouts">
          <div className="p-2 text-center mb-1">
            <p className="text-xs text-slate-400">
              <strong>Info:</strong> Wood Cutouts are mounted on the plaque. We recommend them alongside adding a plate. This will give your plaque a "pop" effect
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-1">Add your cutout(s) here</h4>
            <CardManager 
              options={addons.cutouts} 
              onDeleteCard={handleRemoveCutout}
              title="Add Wood Cutout"
              onAddCard={()=>pushPopUp(
                <GraphicForm title="Add Cutout" 
                  btnBgColor={themeColor}
                  submitForm={handleAddCutout}
                />
              )}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default PlaqueAddon