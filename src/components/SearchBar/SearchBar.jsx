import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import './searchbar.css';

const SearchBar = ({color, records, setRecords}) => {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const handleSearch = (e) => {
    e.preventDefault();
  }
  return (
    <div className="relative h-7 leading-6 border-0"
    >
      <form onSubmit={handleSearch} className="flex mt-1">
        <input 
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="outline-0 placeholder:text-slate-300 w-max text-xs mr-1"
          placeholder="Search"
          onFocus={()=>setFocused(true)}
          onBlur={()=>setFocused(false)}
        />
        <button type="submit">
          <AiOutlineSearch/> 
        </button>
      </form>
      <div 
        className={`${focused ? 'search-focus' : ''} search-unfocus`}
        style={{background: color}}
      />
    </div>
  )
}

export default SearchBar