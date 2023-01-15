import React from 'react'
import './mytextarea.css';

const MyTextArea = ({ color, placeholder, value, onChange, id, name, style }) => {
  return (
    <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        style={style}
        className="placeholder:text-slate-300 text-xs p-3 w-full h-full"
    />
  )
}

export default MyTextArea