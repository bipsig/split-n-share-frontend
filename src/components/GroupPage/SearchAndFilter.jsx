import React from 'react'
import SearchBar from '../common/SearchBar/SearchBar';
import FilterSelect from '../common/FilterSelect/FilterSelect';

const SearchAndFilter = ({ searchTerm, setSearchTerm, filterType, setFilterType, filterOptions }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search transactions..."/>

      <FilterSelect
        filterType={filterType}
        setFilterType={setFilterType}
        options={filterOptions}
      />
    </div>
  )
}

export default SearchAndFilter;