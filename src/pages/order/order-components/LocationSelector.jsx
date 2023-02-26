import React from 'react';
import Select from 'react-select';
import { useStateContext } from '../../../contexts/ContextProvider';
import { locationOpts, animatedComponents } from '../../../data/uidata';

const LocationSelector = () => {
    const { order, setOrder } = useStateContext();
    
    const location = order.location;
    return (
        <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={locationOpts}
            defaultValue={locationOpts.filter(opt => opt.value === location)}
            onChange={option=>setOrder({...order, location: option.value})}
            className="mb-3"
        />
    )
}

export default LocationSelector