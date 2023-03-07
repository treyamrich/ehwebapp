/*Interface Invariant

GraphicForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission
*/

import React, { useState, useEffect } from 'react'
import { CardSelector, MyCheckbox } from '../../../components';
import { listGraphics, listItems } from '../../../graphql/queries';
import { fetchItems, fetchS3Images } from '../../../data/APICalls';
import { AUTH_MODE_IAM, woodcutoutSizeOpts } from '../../../data/uidata';
import Select from 'react-select';
import willEmailGraphic from '../../../data/email-img.svg';

import { graphicColOpts, graphicSizeOpts, EH_COLOR_DARK, animatedComponents } from '../../../data/uidata';

const DEFAULT_COLOR = "Default color";

const initialGraphicFormState = {
    size: graphicSizeOpts[0].label,
    color: DEFAULT_COLOR,
    willEmail: false
}
const GraphicForm = ({ submitForm, isWoodcutoutForm }) => {
    const [selGraphic, setSelGraphic] = useState(null); //To get the graphic name from Graphics table

    const [graphicFormState, setGraphicFormState] = useState(initialGraphicFormState);

    const [graphicSelection, setGraphicSelection] = useState([]);
    const [graphicItems, setGraphicItems] = useState([]);

    const { willEmail, color } = graphicFormState;
    const canSubmit = willEmail || selGraphic !== null;
    
    const handleWillEmailGraphic = () => {
        //Reset selection and flip the flag
        setSelGraphic(null);
        setGraphicFormState(prev => { return {...graphicFormState, willEmail: !prev.willEmail }});
    }
    //Postcondition: Calls the onAdd (with the selected index) and submitForm callback funcs
    const handleSubmit = () => {
        //Find the graphic item from the database based on the selected size
        let graphicItem = { name: '', code: '', price: -1000000};
        if(isWoodcutoutForm && graphicItems.length > 0) {
            //Only 1 size available for wood cutouts
            graphicItem = graphicItems[0];
        } else {
            graphicItems.forEach(item => {
                if((item.code.includes('SM') && graphicFormState.size.includes("Small")) ||
                    (item.code.includes('LG') && graphicFormState.size.includes("Large"))
                ) {
                    graphicItem = item;
                }
            });
        }

        //From graphql schema
        const submitGraphic = {...graphicFormState};
        submitGraphic.name = graphicItem.name;
        submitGraphic.code = graphicItem.code;
        submitGraphic.price = graphicItem.price;
    
        //If the customer is not emailing, set the graphic name or custom url
        if(willEmail) {
            submitGraphic.label = `${color} - Sending via email`;
            submitGraphic.image = willEmailGraphic;
            
        } else {
            submitGraphic.graphicName = selGraphic.name;
            submitGraphic.label = `${color} - ${selGraphic.name}`;
            submitGraphic.image = selGraphic.image;
        }

        submitForm(submitGraphic);
    }
    const fetchGraphicItems = async () => {
        const itemCategoryFilter = isWoodcutoutForm ? "CUTOUTADDON" : "GRAPHICADDON";
        setGraphicItems(await fetchItems({ listItems }, 
            AUTH_MODE_IAM, 
            () => {}, 
            { //Get all graphics
                filter: {
                    category: {
                        eq: itemCategoryFilter
                    }
                }
            }
        ));
    }

    const fetchGraphicSelection = async () => {
        //Get the graphics from the database to choose
        const graphics = await fetchItems({listGraphics}, AUTH_MODE_IAM, () => {});
        //Fetch images which adds the .image attribute to each graphic
        await fetchS3Images(graphics, "imageName");
        //Set the label for the card manager
        graphics.forEach(graphic => graphic.label = graphic.name);
        setGraphicSelection(graphics);
    }
    useEffect(()=> {
        fetchGraphicSelection();
        fetchGraphicItems();
    }, []);

    const sizeOptions = isWoodcutoutForm ? woodcutoutSizeOpts : graphicSizeOpts;
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-1">Size</h4>
                <Select
                    isSearchable={false}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    defaultValue={[sizeOptions[0]]}
                    options={sizeOptions}
                    onChange={option => setGraphicFormState({...graphicFormState, size: option.label})}
                    className="mb-3"
                />
            </div>
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-1">Color</h4>
                <Select
                    isSearchable={false}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    defaultValue={[graphicColOpts[0]]}
                    options={graphicColOpts}
                    onChange={option => setGraphicFormState({...graphicFormState, color: option.label})}
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
                    <MyCheckbox checked={willEmail}
                        customFunc={handleWillEmailGraphic}
                    />
                </div>
                <div className="text-center">
                    <p className="text-sm text-slate-400"><strong>Emailed Graphic Tips:</strong> Small graphics with high detail don't engrave well; a small graphic is any image smaller than 1.5x1.5". Make sure it's <strong>black/white clip art</strong> with the highest resolution available. Ask us if you have any questions!</p>
                </div>
            </div>
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-3">Choose a Graphic</h4>
                <CardSelector color={EH_COLOR_DARK}
                    items={graphicSelection}
                    setItems={setGraphicSelection} 
                    selectedCard={selGraphic}
                    setSelectedCard={setSelGraphic}
                    orientation="vertical"
                    disabled={willEmail}
                    isCardDisabled={()=>false}
                    cmpField="name"
                    highlightOnSelect={true}
                    emptyMsg="No graphics"
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