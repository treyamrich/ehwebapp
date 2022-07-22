import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import './searchbar.css';

const SearchBar = ({color, records, setRecords, searchFields}) => {
  const [query, setQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    //If search is empty, simply reset the records
    if(query === '') {
      setRecords([...records, ...filteredRecords]);
      setFilteredRecords([]);
      return;
    }
    //Filter records
    let match;
    let newRecs = [];
    let newFilteredRecs = [...filteredRecords];
    let searchRegEx = new RegExp('^' + query, "i")
    for(let i = 0; i < records.length; i++) {
      match = false;
      for(let j = 0; j < searchFields.length; j++) {
        if(String(records[i][searchFields[j]]).search(searchRegEx) >= 0) {
          match = true;
          break;
        }
      }
      !match ? 
        newFilteredRecs.push(records[i]) :
        newRecs.push(records[i]);
    }
    setRecords(newRecs);
    setFilteredRecords(newFilteredRecs);
  }
  return (
    <div className="relative h-7 leading-6 border-0"
    >
      <form onSubmit={handleSearch} className="flex mt-1">
        <input 
          type="text"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
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