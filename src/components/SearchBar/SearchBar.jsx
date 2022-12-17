import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { MyInput } from '..';

const SearchBar = ({color, records, setRecords, searchFields}) => {
  const [query, setQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState([]);

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
    <MyInput
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search"
      color={color}
      componentBtn={
      <button type="button">
        <AiOutlineSearch/> 
      </button>
      }
    />
  )
}

export default SearchBar