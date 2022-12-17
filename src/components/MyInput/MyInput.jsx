import React, { useState } from 'react';
import './myinput.css';

/*MyInput Props

:color -  string which is the color of the underline as a CSS color value
:componentBtn - a component that will be rendered in the component to the right
:onChange, value, placeholder - props of a normal HTML input
*/

const MyInput = ({color, componentBtn, placeholder, value, onChange, type}) => {
    const [focused, setFocus] = useState(false);
  return (
    <div className="relative h-7 leading-6 border-0 flex">
      <input 
        type={type}
        value={value}
        onChange={onChange}
        className="outline-0 placeholder:text-slate-300 w-max text-xs mr-1 px-2"
        placeholder={placeholder}
        onFocus={()=>setFocus(true)}
        onBlur={()=>setFocus(false)}
      />
      {componentBtn}
      <div 
        className={`${focused ? 'focus' : ''} unfocus`}
        style={{background: color}}
      />
    </div>
  )
}

export default MyInput