/*Interface Invariant

GraphicForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission
*/

import React, { useState } from 'react'
import { CardSelector, MyCheckbox } from '../../../components';
import Select from 'react-select';

import { graphicColOpts, EH_COLOR_DARK, animatedComponents } from '../../../data/uidata';

const DEFAULT_COLOR = "Default - Same as other addons";
const TEST_GRAPHICS = [{name: "LTC", link: 'asdf'}, {name: "ABC", link: 'asdf'}, {name: "gen", link: 'asdf'}, {name: "ki", link: 'asdf'}];//DELETE THIS LATER

const GraphicForm = ({ submitForm }) => {
    const [selGraphic, setSelGraphic] = useState(null);
    const [graphicColor, setGraphicColor ] = useState(DEFAULT_COLOR); 
    const [graphicSelection, setGraphicSelection] = useState(TEST_GRAPHICS);
    const [emailGraphicFlag, setEmailGraphicFlag] = useState(false);

    const canSubmit = emailGraphicFlag || selGraphic !== null;

    const handleWillEmailGraphic = () => {
        //Reset selection and flip the flag
        setSelGraphic(null);
        setEmailGraphicFlag(prev=>!prev);
    }
    //Postcondition: Calls the onAdd (with the selected index) and submitForm callback funcs
    const handleSubmit = () => {
        if(emailGraphicFlag) {
            submitForm({color: graphicColor, name: 'Sent via Email'});
        } else {
            submitForm({color: graphicColor, 
                name: `${graphicColor !== DEFAULT_COLOR ? 
                    graphicColor : 
                    'Default Color'} - ${selGraphic.name}`
            });
        }
    }
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-1">Color</h4>
                <Select
                    isSearchable={false}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    defaultValue={[graphicColOpts[0]]}
                    options={graphicColOpts}
                    onChange={option => setGraphicColor(option.label)}
                    className="mb-3"
                />
                <div className="text-center">
                    <p className="text-sm text-slate-400"><strong>Tip:</strong> The default "color" is the same colorfill chosen for your engraved message. If you would like your graphic to be a different color, please specify here.</p>
                </div>
            </div>
            <div className="py-2 px-1">
                <label className="text-lg font-semibold" htmlFor="item-code">Post Order</label>
                <div className="p-1 rounded-sm">
                    <label className="mr-1">I will send the graphic via email</label>
                    <MyCheckbox checked={emailGraphicFlag}
                        customFunc={handleWillEmailGraphic}
                    />
                </div>
            </div>
            <div className="text-center">
                <p className="text-sm text-slate-400"><strong>Emailed Graphic Tips:</strong> Small graphics with high detail don't engrave well; a small graphic is any image smaller than 1.5x1.5". Make sure it's <strong>black/white clip art</strong> with the highest resolution available. Ask us if you have any questions!</p>
            </div>
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-3">Choose a Graphic</h4>
                <CardSelector color={EH_COLOR_DARK}
                    items={graphicSelection}
                    setItems={setGraphicSelection} 
                    selectedCard={selGraphic}
                    setSelectedCard={setSelGraphic}
                    orientation="vertical"
                    disabled={emailGraphicFlag}
                    isCardDisabled={()=>false}
                    cmpField="name"
                    highlightOnSelect={true}
                />
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 lg:ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: EH_COLOR_DARK, opacity: canSubmit ? 1 : 0.3}}
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default GraphicForm