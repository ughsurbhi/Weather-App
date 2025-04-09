import React from 'react';

const SearchBar = ({ city, setCity, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onSearch(city);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter city name..."
      />
      <button onClick={() => onSearch(city)}>Search</button>

    </div>
  );
};

export default SearchBar;