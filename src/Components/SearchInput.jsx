import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full md:w-1/2">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-10 py-2 rounded w-full focus:outline-none focus:ring-0"
      />
    </div>
  );
}

export default SearchInput;
