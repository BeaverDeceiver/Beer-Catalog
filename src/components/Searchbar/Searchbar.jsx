import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { fetchBeer } from '../../store/actions/actions';

export function SearchBar() {
  const [query, setQuery] = useState('punk');
  const dispatch = useDispatch();
  const textInput = useRef(null);

  function handleSearch(e) {
    if (query !== '') dispatch(fetchBeer({ query }));
    textInput.current.blur();
  }

  function handleKeyboard(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={textInput}
          className="search__input"
          value={query}
          onChange={handleKeyboard}
          placeholder="Search beers..."
        />
        <button
          className="search__button button button_transparent"
          onClick={handleSearch}
        >
          <SearchIcon />
        </button>
      </form>
    </>
  );
}
