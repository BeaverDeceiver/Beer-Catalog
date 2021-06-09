import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';

export function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <section className="search">
      <input
        className="search__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search beers..."
      />
      <button className="search__button">
        <SearchIcon />
      </button>
    </section>
  );
}
