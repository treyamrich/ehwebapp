import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import './searchbar.css';

const SearchBar = ({color, records, setRecords, searchFields}) => {
  const [query, setQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [focused, setFocused] = useState(false);

  const handleSearch = (e) => {
    let newQuery = e.target.value;
    setQuery(newQuery);

    //If search is empty, simply reset the records
    let allRecs = [...records, ...filteredRecords];
    if(newQuery === '') {
      setRecords(allRecs);
      setFilteredRecords([]);
      return;
    }
    //Filter records and page them
    let match;
    let newRecs = [];
    let newFilteredRecs = [];
    for(let i = 0; i < allRecs.length; i++) {
      match = false;
      for(let j = 0; j < searchFields.length; j++) {
        if(String(allRecs[i][searchFields[j]]).toLowerCase().startsWith(newQuery.toLowerCase())) {
          match = true;
          break;
        }
      }
      !match ? 
        newFilteredRecs.push(allRecs[i]) :
        newRecs.push(allRecs[i]);
    }
    setRecords(newRecs);
    setFilteredRecords(newFilteredRecs);
  }
  return (
    <div className="relative h-7 leading-6 border-0 flex"
    >
      <input 
        type="text"
        value={query}
        onChange={handleSearch}
        className="outline-0 placeholder:text-slate-300 w-max text-xs mr-1 px-2"
        placeholder="Search"
        onFocus={()=>setFocused(true)}
        onBlur={()=>setFocused(false)}
      />
      <button type="button">
        <AiOutlineSearch/> 
      </button>
      <div 
        className={`${focused ? 'search-focus' : ''} search-unfocus`}
        style={{background: color}}
      />
    </div>
  )
}

export default SearchBar