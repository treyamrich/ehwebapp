import React, { useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const options = [
  { value: 'coin-mount', label: 'Coin Mount' },
  { value: 'item-mount', label: 'Item Mount'},
  { value: 'color-fill', label: 'Color Fill'}
]

const ChooseAddOn = () => {
  const [services, setServices] = useState([]);
  return (
    <div>
      <h4 className="font-semibold">Services</h4>
      <div>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[options[4], options[5]]}
        isMulti
        options={options}
        onChange={(selOps)=>setServices(selOps)}
      />
      </div>
      <h4 className="font-semibold">Graphics</h4>
      <div>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[options[4], options[5]]}
        isMulti
        options={options}
        onChange={(selOps)=>setServices(selOps)}
      />
      </div>
      <h4 className="font-semibold">Wood Cutouts</h4>
      <div>
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          defaultValue={[options[4], options[5]]}
          isMulti
          options={options}
          onChange={(selOps)=>setServices(selOps)}
        />
      </div>
    </div>
  )
}

export default ChooseAddOn